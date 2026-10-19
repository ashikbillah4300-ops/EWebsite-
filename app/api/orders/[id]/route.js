import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import { Order } from '@/models';
import { getStoredOrders, updateStoredOrderStatus, deleteStoredOrder } from '@/lib/orderStore';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const id = params.id;

    // 1. Try DB first
    try {
      await dbConnect();
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjectId ? { _id: id } : { orderNumber: id };
      const order = await Order.findOne(query).lean();
      if (order) {
        return NextResponse.json({ order });
      }
    } catch (dbErr) {
      console.warn('DB get order fallback:', dbErr.message);
    }

    // 2. Check local store
    const localOrders = getStoredOrders();
    const localOrder = localOrders.find(
      o => String(o._id) === String(id) || String(o.orderNumber) === String(id)
    );

    if (localOrder) {
      return NextResponse.json({ order: localOrder });
    }

    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();
    const status = body.status || body.orderStatus;

    let updatedDbOrder = null;

    // Try DB update
    try {
      await dbConnect();
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjectId ? { _id: id } : { orderNumber: id };
      
      const updateData = {};
      if (status) {
        updateData.orderStatus = status;
      }
      if (body.paymentStatus) {
        updateData.paymentStatus = body.paymentStatus;
      }

      updatedDbOrder = await Order.findOneAndUpdate(
        query,
        { $set: updateData },
        { new: true }
      );
    } catch (dbErr) {
      console.warn('DB update order fallback:', dbErr.message);
    }

    // Also update local store
    if (status) {
      updateStoredOrderStatus(id, status);
    }

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedDbOrder || { _id: id, status }
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;

    // Try DB delete
    try {
      await dbConnect();
      const isObjectId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjectId ? { _id: id } : { orderNumber: id };
      await Order.findOneAndDelete(query);
    } catch (dbErr) {
      console.warn('DB delete order fallback:', dbErr.message);
    }

    // Delete local
    deleteStoredOrder(id);

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    return NextResponse.json({ error: 'Failed to delete order: ' + error.message }, { status: 500 });
  }
}
