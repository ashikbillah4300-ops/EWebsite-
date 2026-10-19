import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }
  }
}

/**
 * Get all stored orders
 */
export function getStoredOrders() {
  ensureDir();
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Warning reading orders file:', e.message);
  }
  return [];
}

/**
 * Save or update an order locally
 */
export function saveStoredOrder(order) {
  if (!order) return;
  ensureDir();
  try {
    const list = getStoredOrders();
    const id = String(order._id || order.id || order.orderNumber);
    const existingIndex = list.findIndex(
      o => String(o._id || o.id || o.orderNumber) === id
    );

    const formattedOrder = {
      _id: id,
      orderNumber: order.orderNumber || id,
      createdAt: order.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: order.status || order.orderStatus || 'pending',
      total: order.total || order.totalAmount || 0,
      paymentStatus: order.paymentStatus || 'pending',
      paymentMethod: order.paymentMethod || 'cod',
      user: order.user || {
        name: order.shippingName || order.name || 'Guest',
        email: order.shippingEmail || order.email || 'guest@awbin.com',
        phone: order.shippingPhone || order.phone || ''
      },
      shippingAddress: {
        name: order.shippingName || order.name || '',
        street: order.shippingAddress || order.address || '',
        address: order.shippingAddress || order.address || '',
        city: order.shippingCity || order.district || '',
        phone: order.shippingPhone || order.phone || ''
      },
      items: (order.items || []).map(item => ({
        name: item.name || item.productName || 'Product',
        quantity: item.quantity || 1,
        price: item.price || item.unitPrice || 0,
        image: item.image || item.productImage || ''
      }))
    };

    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...formattedOrder };
    } else {
      list.unshift(formattedOrder);
    }

    fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2), 'utf8');
    return formattedOrder;
  } catch (e) {
    console.warn('Warning saving order:', e.message);
  }
}

/**
 * Update order status
 */
export function updateStoredOrderStatus(orderId, status) {
  if (!orderId || !status) return false;
  ensureDir();
  try {
    const list = getStoredOrders();
    const id = String(orderId);
    const order = list.find(o => String(o._id || o.id || o.orderNumber) === id);
    if (order) {
      order.status = status;
      order.orderStatus = status;
      order.updatedAt = new Date().toISOString();
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2), 'utf8');
      return true;
    }
  } catch (e) {
    console.warn('Warning updating order status:', e.message);
  }
  return false;
}

/**
 * Delete an order locally
 */
export function deleteStoredOrder(orderId) {
  if (!orderId) return false;
  ensureDir();
  try {
    const list = getStoredOrders();
    const id = String(orderId);
    const filtered = list.filter(o => String(o._id || o.id || o.orderNumber) !== id);
    if (filtered.length !== list.length) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
      return true;
    }
  } catch (e) {
    console.warn('Warning deleting order:', e.message);
  }
  return false;
}
