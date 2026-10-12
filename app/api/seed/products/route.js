import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { ISLAMIC_CATEGORIES, ISLAMIC_PRODUCTS } from '@/lib/islamicCatalog';

export async function GET() {
  try {
    await dbConnect();

    // 1. Clean out any old non-Islamic categories & products
    const unrelatedKeywords = ['mobile-phones', 'electronics', 'laptops', 'standing-desks', 'table-tops', 'gaming'];
    await Category.deleteMany({ slug: { $in: unrelatedKeywords } });
    await Product.deleteMany({ slug: { $in: ['iphone-15-pro-max', 'samsung-galaxy-s24-ultra', 'macbook-air-m2'] } });

    // 2. Ensure all approved Islamic Categories exist
    const categoryMap = {};
    for (const cat of ISLAMIC_CATEGORIES) {
      let existingCat = await Category.findOne({ slug: cat.slug });
      if (!existingCat) {
        existingCat = await Category.create({
          name: cat.name,
          nameBn: cat.nameBn,
          slug: cat.slug,
          icon: cat.icon,
          image: cat.image,
          description: cat.description,
          isFeatured: cat.isFeatured,
          orderBy: cat.orderBy,
          isActive: true
        });
      }
      categoryMap[cat.slug] = existingCat._id;

      // Create subcategories
      if (cat.subcategories && cat.subcategories.length > 0) {
        for (const sub of cat.subcategories) {
          const subSlug = `${cat.slug}-${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          const existingSub = await Category.findOne({ slug: subSlug });
          if (!existingSub) {
            await Category.create({
              name: sub.name,
              nameBn: sub.nameBn,
              slug: subSlug,
              parentId: existingCat._id,
              isActive: true
            });
          }
        }
      }
    }

    // 3. Seed Islamic Products
    let seededCount = 0;
    for (const prod of ISLAMIC_PRODUCTS) {
      const existing = await Product.findOne({ slug: prod.slug });
      const catId = categoryMap[prod.category?.slug] || null;

      if (!existing && catId) {
        await Product.create({
          name: prod.name,
          nameBn: prod.nameBn,
          slug: prod.slug,
          category: catId,
          brand: prod.brand,
          regularPrice: prod.regularPrice,
          sellingPrice: prod.sellingPrice,
          stockQuantity: prod.stockQuantity,
          stockStatus: prod.stockStatus,
          featuredImage: prod.featuredImage,
          images: prod.images,
          description: prod.description,
          descriptionBn: prod.descriptionBn,
          specification: prod.specification,
          isFeatured: prod.isFeatured,
          isNewArrival: prod.isNewArrival,
          isBestSeller: prod.isBestSeller,
          isActive: true,
          tags: prod.tags
        });
        seededCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: '✅ AWBIN Islamic product catalog and categories seeded successfully!',
      categoriesCount: ISLAMIC_CATEGORIES.length,
      productsSeeded: seededCount,
      totalCatalogSize: ISLAMIC_PRODUCTS.length
    });
  } catch (error) {
    console.error('Seed products error:', error);
    return NextResponse.json({ error: 'Seeding failed: ' + error.message }, { status: 500 });
  }
}
