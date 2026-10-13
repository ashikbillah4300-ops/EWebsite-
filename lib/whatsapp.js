/**
 * WhatsApp utilities and default configuration
 */

export const DEFAULT_WHATSAPP_SETTINGS = {
  whatsappNumber: '01700000000',
  whatsappMessage: 'আসসালামু আলাইকুম! আমি আপনাদের পণ্য ও অর্ডার সম্পর্কে তথ্য জানতে চাচ্ছি।',
  isEnabled: true,
  tooltipText: 'WhatsApp এ চ্যাট করুন',
  position: 'bottom-right', // 'bottom-right' | 'bottom-left'
};

/**
 * Clean and format phone number for WhatsApp wa.me links
 * Handles:
 * - Local Bangladesh mobile numbers: 01XXXXXXXXX -> 8801XXXXXXXXX
 * - International numbers: +8801XXXXXXXXX -> 8801XXXXXXXXX
 * - Numbers with dashes/spaces: 01700-000000 -> 8801700000000
 */
export function cleanWhatsAppNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';

  // Remove non-digit characters
  let digits = phone.replace(/\D/g, '');

  if (!digits) return '';

  // Bangladesh specific handling:
  // If starts with 01 and is 11 digits (e.g. 01712345678)
  if (digits.length === 11 && digits.startsWith('01')) {
    digits = '88' + digits;
  }
  // If starts with 8801 and is 13 digits, keep as is
  // Any other international number without leading '+' (already removed) is valid

  return digits;
}

/**
 * Generate full wa.me chat link
 */
export function buildWhatsAppChatUrl(phone, message = '') {
  const cleaned = cleanWhatsAppNumber(phone);
  if (!cleaned) return '#';

  const textParam = message && message.trim() 
    ? `?text=${encodeURIComponent(message.trim())}` 
    : '';

  return `https://wa.me/${cleaned}${textParam}`;
}
