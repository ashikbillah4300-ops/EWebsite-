import fs from 'fs';
import path from 'path';
import { DEFAULT_WHATSAPP_SETTINGS } from './whatsapp.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'site_settings.json');

export const DEFAULT_SITE_SETTINGS = {
  // General
  siteName: 'AWBIN',
  siteDescription: 'প্রিমিয়াম ইসলামিক লাইফস্টাইল ও মুসলিম ফ্যাশন অনলাইন স্টোর',
  siteUrl: 'https://awbin.com',
  logo: '/logo-wordmark.png',
  favicon: '/logo.png',
  timezone: 'Asia/Dhaka',
  language: 'bn',

  // Store
  currency: 'BDT',
  currencySymbol: '৳',
  taxRate: 0,
  shippingCost: 60,
  freeShippingThreshold: 3000,
  minOrderAmount: 100,

  // Contact
  contactEmail: 'support@awbin.com',
  contactPhone: '+880 1700 000000',
  contactAddress: 'ঢাকা, বাংলাদেশ',
  workingHours: '10:00 AM - 8:00 PM',

  // WhatsApp
  whatsappNumber: DEFAULT_WHATSAPP_SETTINGS.whatsappNumber,
  whatsappMessage: DEFAULT_WHATSAPP_SETTINGS.whatsappMessage,
  isEnabled: DEFAULT_WHATSAPP_SETTINGS.isEnabled,
  tooltipText: DEFAULT_WHATSAPP_SETTINGS.tooltipText,
  position: DEFAULT_WHATSAPP_SETTINGS.position || 'bottom-right',

  // Email
  smtpHost: 'smtp.example.com',
  smtpPort: '587',
  smtpUser: 'noreply@awbin.com',
  smtpPassword: '',
  emailFromName: 'AWBIN',
  emailFromEmail: 'noreply@awbin.com',

  // Payment
  bkashNumber: '01700000000',
  nagadNumber: '01700000000',
  bankName: 'Islami Bank Bangladesh',
  accountNumber: '1234567890',
  accountName: 'AWBIN Lifestyle',

  // Social
  facebookUrl: 'https://facebook.com/awbin',
  twitterUrl: 'https://twitter.com/awbin',
  instagramUrl: 'https://instagram.com/awbin',
  youtubeUrl: 'https://youtube.com/awbin',

  // Maintenance
  maintenanceMode: false,
  comingSoon: false,
};

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
 * Get all settings from local disk file
 */
export function getLocalSettings() {
  ensureDir();
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const raw = fs.readFileSync(SETTINGS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_SITE_SETTINGS, ...parsed };
      }
    }
  } catch (err) {
    console.warn('Could not read site_settings.json:', err.message);
  }
  return { ...DEFAULT_SITE_SETTINGS };
}

/**
 * Save settings to local disk file
 */
export function saveLocalSettings(newSettings) {
  ensureDir();
  try {
    const current = getLocalSettings();
    const updated = {
      ...current,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  } catch (err) {
    console.error('Failed to write site_settings.json:', err.message);
    return null;
  }
}
