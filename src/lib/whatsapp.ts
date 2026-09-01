/**
 * WhatsApp Integration Utilities
 * Generates deep links and formats messages for gift order sharing
 */

interface GiftOrderItem {
  name: string;
  quantity: number;
}

interface GiftOrderDetails {
  giftSenderName: string;
  giftRecipientName: string;
  giftMessage: string | null;
  giftClaimCode: string;
  total: number;
  items: GiftOrderItem[];
  branch: {
    name: string;
    address: string | null;
    phone: string | null;
  };
  restaurant: {
    name: string;
  };
}

/**
 * Generate WhatsApp deep link with pre-filled message
 * @param {string} phone - Recipient's phone number
 * @param {string} message - Pre-formatted message text
 * @returns {string} WhatsApp deep link URL
 */
export function generateWhatsAppLink(phone: string, message: string): string {
  // Remove non-digits from phone
  const cleanPhone = phone.replace(/\D/g, '');
  
  // URL encode message
  const encodedMessage = encodeURIComponent(message);
  
  // Use wa.me for universal compatibility (mobile & desktop)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Format WhatsApp message for gift order sharing
 * @param {GiftOrderDetails} order - Gift order details
 * @returns {string} Formatted message ready for WhatsApp
 */
export function formatWhatsAppMessage(order: GiftOrderDetails): string {
  const lines = [
    `🎁 *You've Received a Food Gift!*`,
    ``,
    `From: *${order.giftSenderName}*`,
    `To: *${order.giftRecipientName}*`,
    ``,
  ];
  
  if (order.giftMessage) {
    lines.push(`💌 Message: "${order.giftMessage}"`);
    lines.push(``);
  }
  
  lines.push(`📦 *Your Order:*`);
  order.items.forEach(item => {
    lines.push(`  • ${item.quantity}x ${item.name}`);
  });
  
  lines.push(``);
  lines.push(`💰 Total Value: ₦${(order.total / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  lines.push(``);
  lines.push(`🔑 *Claim Code:* ${order.giftClaimCode}`);
  lines.push(``);
  lines.push(`📍 *Pickup Location:*`);
  lines.push(`${order.restaurant.name} - ${order.branch.name}`);
  if (order.branch.address) {
    lines.push(`${order.branch.address}`);
  }
  if (order.branch.phone) {
    lines.push(`📞 ${order.branch.phone}`);
  }
  lines.push(``);
  lines.push(`To claim your gift, visit the restaurant and provide the claim code above!`);
  lines.push(``);
  lines.push(`View your gift: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://great-delight-fastfood.vercel.app'}/gift/${order.giftClaimCode}`);
  
  return lines.join('\n');
}
