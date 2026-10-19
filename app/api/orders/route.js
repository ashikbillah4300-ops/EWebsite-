import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Order, User } from '@/models';
import jwt from 'jsonwebtoken';

import { getStoredOrders, saveStoredOrder } from '@/lib/orderStore';

export const dynamic = 'force-dynamic';

const verifyToken = (request) => {
  const secret = process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024';
  
  // 1. Check admin token
  const adminToken = request.cookies.get('adminToken')?.value;
  if (adminToken) {
    try {
      const decoded = jwt.verify(adminToken, secret);
      return { ...decoded, isAdmin: true };
    } catch (error) {
      // ignore
    }
  }

  // 2. Check regular user token
  const token = request.cookies.get('token')?.value;
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      return { ...decoded, isAdmin: decoded.role === 'admin' };
    } catch (error) {
      // ignore
    }
  }

  return null;
};

// GET - Get user's orders or all orders for admin
export async function GET(request) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    let transformedOrders = [];

    try {
      await dbConnect();
      const query = decoded.isAdmin ? {} : { user: decoded.id };
      const orders = await Order.find(query)
        .populate('user', 'name email phone')
        .sort({ createdAt: -1 })
        .lean();

      transformedOrders = orders.map(order => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        status: order.orderStatus,
        total: order.totalAmount,
        user: order.user || {
          name: order.shippingName || 'Guest Customer',
          email: 'guest@awbin.com',
          phone: order.shippingPhone || ''
        },
        items: (order.items || []).map(item => ({
          name: item.productName,
          quantity: item.quantity,
          price: item.unitPrice,
          image: item.productImage
        })),
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        shippingAddress: {
          name: order.shippingName,
          address: order.shippingAddress,
          street: order.shippingAddress,
          city: order.shippingCity,
          phone: order.shippingPhone
        }
      }));
    } catch (dbErr) {
      console.warn('Orders DB query fallback:', dbErr.message);
    }

    // Merge or fallback to locally stored orders
    const localOrders = getStoredOrders();
    if (decoded.isAdmin) {
      if (transformedOrders.length === 0) {
        return NextResponse.json({ orders: localOrders });
      }
      // Combine avoiding duplicate IDs
      const existingIds = new Set(transformedOrders.map(o => String(o._id)));
      const extras = localOrders.filter(o => !existingIds.has(String(o._id)));
      return NextResponse.json({ orders: [...transformedOrders, ...extras] });
    }

    // For regular user
    if (transformedOrders.length === 0) {
      const userOrders = localOrders.filter(o => o.user?.id === decoded.id || o.user?.email === decoded.email);
      return NextResponse.json({ orders: userOrders });
    }

    return NextResponse.json({ orders: transformedOrders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ orders: getStoredOrders() });
  }
}

// POST - Create a new order
export async function POST(request) {
  try {
    const data = await request.json();
    const orderNumber = `AWB-${Math.floor(100000 + Math.random() * 900000)}`;

    let orderDoc = null;
    try {
      await dbConnect();
      const decoded = verifyToken(request);
      let userId = decoded?.id;

      if (!userId) {
        // Find or create default customer for guest orders
        let guestUser = await User.findOne({ email: 'guest@awbin.com' });
        if (!guestUser) {
          guestUser = await User.create({
            name: data.name || 'Guest Customer',
            email: 'guest@awbin.com',
            phone: data.phone || '01700000000',
            password: 'guest_protected_password_hash',
            role: 'user',
            status: 'active'
          });
        }
        userId = guestUser._id;
      }

      orderDoc = await Order.create({
        orderNumber,
        user: userId,
        shippingName: data.name,
        shippingPhone: data.phone,
        shippingAddress: data.address,
        shippingCity: data.district,
        customerNotes: data.notes,
        items: (data.items || []).map(i => ({
          product: i.product || userId,
          productName: i.productName || 'Islamic Product',
          quantity: i.quantity || 1,
          unitPrice: i.unitPrice || 0,
          totalPrice: (i.unitPrice || 0) * (i.quantity || 1),
          productImage: i.productImage
        })),
        subtotal: data.subtotal || 0,
        shippingCost: data.shippingCost || 60,
        discountAmount: data.discountAmount || 0,
        totalAmount: data.totalAmount || 0,
        paymentMethod: data.paymentMethod || 'cod',
        paymentStatus: 'pending',
        orderStatus: 'confirmed'
      });
    } catch (dbErr) {
      console.warn('Database order save fallback:', dbErr.message);
    }

    // Always persist locally as well so no order is lost
    const savedLocalOrder = saveStoredOrder({
      _id: orderDoc?._id || `AWB-ORD-${Date.now()}`,
      orderNumber,
      total: data.totalAmount || 0,
      totalAmount: data.totalAmount || 0,
      status: 'pending',
      shippingName: data.name,
      shippingPhone: data.phone,
      shippingAddress: data.address,
      shippingCity: data.district,
      items: (data.items || []).map(i => ({
        name: i.name || i.productName || 'Islamic Product',
        quantity: i.quantity || 1,
        price: i.price || i.unitPrice || 0,
        image: i.image || i.productImage
      })),
      paymentMethod: data.paymentMethod || 'cod',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'অর্ডার সফলভাবে নিশ্চিত করা হয়েছে!',
      order: {
        orderNumber,
        totalAmount: data.totalAmount,
        id: orderDoc?._id || savedLocalOrder?._id || orderNumber
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'অর্ডার প্রক্রিয়া করতে সমস্যা হয়েছে: ' + error.message },
      { status: 500 }
    );
  }
}
