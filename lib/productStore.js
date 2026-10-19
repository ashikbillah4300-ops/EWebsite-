import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DELETED_FILE = path.join(DATA_DIR, 'deleted_products.json');
const CUSTOM_FILE = path.join(DATA_DIR, 'custom_products.json');

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
 * Get all deleted product identifiers (IDs, slugs, SKUs)
 */
export function getDeletedProductIds() {
  ensureDir();
  try {
    if (fs.existsSync(DELETED_FILE)) {
      const raw = fs.readFileSync(DELETED_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Warning reading deleted products file:', e.message);
  }
  return [];
}

/**
 * Mark a product ID or slug as deleted
 */
export function markProductAsDeleted(idOrSlug) {
  if (!idOrSlug) return;
  ensureDir();
  try {
    const list = getDeletedProductIds();
    const strId = String(idOrSlug).trim();
    if (!list.includes(strId)) {
      list.push(strId);
      fs.writeFileSync(DELETED_FILE, JSON.stringify(list, null, 2), 'utf8');
    }

    // Also remove from custom products file if it was created locally
    const customList = getCustomProducts();
    const filtered = customList.filter(p => String(p._id) !== strId && String(p.slug) !== strId);
    if (filtered.length !== customList.length) {
      fs.writeFileSync(CUSTOM_FILE, JSON.stringify(filtered, null, 2), 'utf8');
    }
  } catch (e) {
    console.warn('Warning saving deleted product:', e.message);
  }
}

/**
 * Check if a product has been marked as deleted
 */
export function isProductDeleted(product, deletedIds = null) {
  if (!product) return false;
  const list = deletedIds || getDeletedProductIds();
  if (!list.length) return false;

  const id = product._id ? String(product._id) : '';
  const slug = product.slug ? String(product.slug) : '';
  const sku = product.sku ? String(product.sku) : '';

  return list.includes(id) || list.includes(slug) || (sku && list.includes(sku));
}

/**
 * Get custom/user-created products stored locally
 */
export function getCustomProducts() {
  ensureDir();
  try {
    if (fs.existsSync(CUSTOM_FILE)) {
      const raw = fs.readFileSync(CUSTOM_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // Ignore
  }
  return [];
}

/**
 * Save custom product locally
 */
export function saveCustomProduct(product) {
  if (!product) return;
  ensureDir();
  try {
    const list = getCustomProducts();
    const existingIndex = list.findIndex(
      p => String(p._id) === String(product._id) || String(p.slug) === String(product.slug)
    );
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...product, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    fs.writeFileSync(CUSTOM_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (e) {
    console.warn('Warning saving custom product:', e.message);
  }
}
