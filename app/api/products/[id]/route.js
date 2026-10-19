import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ISLAMIC_PRODUCTS } from '@/lib/islamicCatalog';
import { 
  markProductAsDeleted, 
  isProductDeleted, 
  getCustomProducts, 
  saveCustomProduct 
} from '@/lib/productStore';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const idOrSlug = params.id;

    // Check if deleted
    if (isProductDeleted({ _id: idOrSlug, slug: idOrSlug })) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // 1. Try DB first
    try {
      await dbConnect();
      const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
      const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };
      const product = await Product.findOne(query).populate('category', 'name nameBn slug');
      if (product) {
        return NextResponse.json({ product });
      }
    } catch (dbErr) {
      console.warn('DB get product fallback:', dbErr.message);
    }

    // 2. Check custom products
    const customList = getCustomProducts();
    const customProduct = customList.find(p => p._id === idOrSlug || p.slug === idOrSlug);
    if (customProduct) {
      return NextResponse.json({ product: customProduct });
    }

    // 3. Fallback to Islamic catalog
    const catalogProduct = ISLAMIC_PRODUCTS.find(p => p._id === idOrSlug || p.slug === idOrSlug);
    if (catalogProduct) {
      return NextResponse.json({ product: catalogProduct });
    }

    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const idOrSlug = params.id;

    // Calculate discount percentage
    if (data.regularPrice && data.sellingPrice) {
      data.discountPercent = Math.round(
        ((data.regularPrice - data.sellingPrice) / data.regularPrice) * 100
      );
    }

    // Set stock status
    if (data.stockQuantity <= 0) {
      data.stockStatus = 'out_of_stock';
    } else if (data.stockQuantity <= (data.lowStockThreshold || 5)) {
      data.stockStatus = 'low_stock';
    } else {
      data.stockStatus = 'in_stock';
    }

    let updatedProduct = null;

    // Try DB update
    try {
      await dbConnect();
      const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
      const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };
      updatedProduct = await Product.findOneAndUpdate(
        query,
        { ...data, isActive: true },
        { new: true, runValidators: true }
      );
    } catch (dbErr) {
      console.warn('DB update product fallback:', dbErr.message);
    }

    // Also update locally in case DB is offline or product was custom
    const localProduct = {
      _id: idOrSlug,
      ...data,
      isActive: true,
    };
    saveCustomProduct(localProduct);

    return NextResponse.json(
      { 
        message: 'Product updated successfully', 
        product: updatedProduct || localProduct 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const idOrSlug = params.id;

    // 1. Try DB deletion
    try {
      await dbConnect();
      const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
      const query = isObjectId ? { _id: idOrSlug } : { $or: [{ slug: idOrSlug }, { sku: idOrSlug }] };
      await Product.findOneAndDelete(query);
    } catch (dbErr) {
      console.warn('DB delete warning (persisting locally):', dbErr.message);
    }

    // 2. Persistently mark as deleted in productStore
    markProductAsDeleted(idOrSlug);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Product deleted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product: ' + error.message },
      { status: 500 }
    );
  }
}
