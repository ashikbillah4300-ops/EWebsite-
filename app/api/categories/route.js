import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ISLAMIC_CATEGORIES } from '@/lib/islamicCatalog';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const PROHIBITED_KEYWORDS = [
  'desk', 'standing desk', 'electronic', 'electronics', 'mobile', 'phone', 'laptop',
  'computer', 'gaming', 'furniture', 'grocery', 'chair', 'table top'
];

export async function GET(request) {
  try {
    let allCategories = [];
    try {
      await dbConnect();
      const { searchParams } = new URL(request.url);
      const nested = searchParams.get('nested');
      const activeOnly = searchParams.get('active');
      const featured = searchParams.get('featured');

      const query = activeOnly === 'false' ? {} : { isActive: true };
      if (featured === 'true') query.isFeatured = true;

      allCategories = await Category.find(query).populate('parentId', 'name slug').sort('orderBy');

      if (nested === 'true' && allCategories.length > 0) {
        const categoryMap = new Map();
        const rootCategories = [];

        allCategories.forEach(cat => {
          categoryMap.set(cat._id.toString(), {
            _id: cat._id,
            name: cat.name,
            nameBn: cat.nameBn,
            slug: cat.slug,
            icon: cat.icon,
            image: cat.image,
            parentId: cat.parentId?._id || null,
            subcategories: []
          });
        });

        allCategories.forEach(cat => {
          const category = categoryMap.get(cat._id.toString());
          if (cat.parentId) {
            const parent = categoryMap.get(cat.parentId._id?.toString());
            if (parent) {
              parent.subcategories.push(category);
            } else {
              rootCategories.push(category);
            }
          } else {
            rootCategories.push(category);
          }
        });

        return NextResponse.json({ categories: rootCategories });
      }
    } catch (dbErr) {
      console.warn('Database query skipped or failed, using Islamic catalog categories:', dbErr.message);
    }

    // If database returned categories, use them; otherwise use authentic Islamic categories
    if (allCategories && allCategories.length > 0) {
      return NextResponse.json({ categories: allCategories });
    }

    return NextResponse.json({ categories: ISLAMIC_CATEGORIES });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json({ categories: ISLAMIC_CATEGORIES });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Enforce business scope: Reject unrelated categories
    const lowerName = (data.name || '').toLowerCase();
    const isProhibited = PROHIBITED_KEYWORDS.some(kw => lowerName.includes(kw));
    if (isProhibited) {
      return NextResponse.json(
        { error: 'অননুমোদিত ক্যাটাগরি। AWBIN শুধুমাত্র ইসলামিক ও মুসলিম লাইফস্টাইল পণ্যের জন্য অনুমোদিত।' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = data.slug || data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'এই নামে ক্যাটাগরি ইতিমধ্যে বিদ্যমান রয়েছে' },
        { status: 400 }
      );
    }

    const category = await Category.create({
      ...data,
      slug,
    });

    return NextResponse.json(
      { message: 'ক্যাটাগরি সফলভাবে তৈরি করা হয়েছে', category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category: ' + error.message },
      { status: 500 }
    );
  }
}
