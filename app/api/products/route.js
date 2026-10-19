import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { ISLAMIC_PRODUCTS } from '@/lib/islamicCatalog';
import { 
  getDeletedProductIds, 
  isProductDeleted, 
  getCustomProducts, 
  saveCustomProduct 
} from '@/lib/productStore';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const isNewArrival = searchParams.get('isNewArrival');
    const slug = searchParams.get('slug');
    const sort = searchParams.get('sort') || '-createdAt';

    const deletedIds = getDeletedProductIds();
    let dbProducts = [];
    let total = 0;

    try {
      await dbConnect();
      const query = { isActive: true };

      if (slug) {
        query.slug = slug;
      }
      if (category) {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { nameBn: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }
      if (isNewArrival === 'true') {
        query.isNewArrival = true;
      }

      const skip = (page - 1) * limit;
      [dbProducts, total] = await Promise.all([
        Product.find(query)
          .populate('category', 'name nameBn slug')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        Product.countDocuments(query),
      ]);

      if (dbProducts && dbProducts.length > 0) {
        // Exclude products that were deleted locally
        const filteredDb = dbProducts.filter(p => !isProductDeleted(p, deletedIds));
        return NextResponse.json({
          products: filteredDb,
          pagination: {
            page,
            limit,
            total: filteredDb.length,
            pages: Math.ceil(filteredDb.length / limit),
          },
        });
      }
    } catch (dbErr) {
      console.warn('Database query fallback to Islamic catalog & custom store:', dbErr.message);
    }

    // Fallback: Combine custom products and Islamic catalog, filter out deleted products
    const customList = getCustomProducts();
    let availableProducts = [...customList, ...ISLAMIC_PRODUCTS].filter(
      p => !isProductDeleted(p, deletedIds)
    );

    let filtered = [...availableProducts];

    if (slug) {
      filtered = filtered.filter(p => p.slug === slug);
    }
    if (category) {
      filtered = filtered.filter(
        p => p.category?.slug === category || p.category?._id === category || p.category === category
      );
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.nameBn && p.nameBn.includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }
    if (isNewArrival === 'true') {
      filtered = filtered.filter(p => p.isNewArrival);
    }

    if (sort === 'price_asc') {
      filtered.sort((a, b) => (a.sellingPrice || a.price || 0) - (b.sellingPrice || b.price || 0));
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => (b.sellingPrice || b.price || 0) - (a.sellingPrice || a.price || 0));
    }

    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      products: paginated,
      pagination: {
        page,
        limit,
        total: filtered.length,
        pages: Math.ceil(filtered.length / limit),
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const slug = data.slug || (data.name || 'product')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (data.regularPrice && data.sellingPrice) {
      data.discountPercent = Math.round(
        ((data.regularPrice - data.sellingPrice) / data.regularPrice) * 100
      );
    }

    if (data.stockQuantity <= 0) {
      data.stockStatus = 'out_of_stock';
    } else if (data.stockQuantity <= (data.lowStockThreshold || 5)) {
      data.stockStatus = 'low_stock';
    } else {
      data.stockStatus = 'in_stock';
    }

    let product = null;

    // Try DB creation
    try {
      await dbConnect();
      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this name already exists' },
          { status: 400 }
        );
      }

      product = await Product.create({
        ...data,
        slug,
      });
    } catch (dbErr) {
      console.warn('DB create product fallback to local store:', dbErr.message);
    }

    // Local fallback or mirror
    const localProduct = product ? (product.toObject ? product.toObject() : product) : {
      _id: 'custom_' + Date.now(),
      ...data,
      slug,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    saveCustomProduct(localProduct);

    return NextResponse.json(
      { message: 'Product created successfully', product: product || localProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product: ' + error.message },
      { status: 500 }
    );
  }
}
