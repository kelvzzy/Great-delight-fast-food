/**
 * Gift Order API Endpoint
 * POST /api/orders/gift - Create a new gift order
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createGiftOrder } from '@/services/giftOrder.service';
import { formatWhatsAppMessage, generateWhatsAppLink } from '@/lib/whatsapp';

const createGiftOrderSchema = z.object({
  branchId: z.string().uuid(),
  tableId: z.string().uuid(),
  
  // Gift information
  giftSenderName: z.string().min(1).max(100),
  giftSenderPhone: z.string().regex(/^\+?[0-9]{10,15}$/),
  giftRecipientName: z.string().min(1).max(100),
  giftRecipientPhone: z.string().regex(/^\+?[0-9]{10,15}$/),
  giftMessage: z.string().max(500).optional(),
  
  // Order items
  items: z.array(z.object({
    menuItemId: z.string().uuid(),
    quantity: z.number().int().min(1).max(99),
    variantId: z.string().uuid().optional(),
    optionValueIds: z.array(z.string().uuid()).optional(),
  })).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createGiftOrderSchema.parse(body);
    
    // Create gift order
    const order = await createGiftOrder(data);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Failed to create gift order' },
        { status: 500 }
      );
    }
    
    // Format items for WhatsApp message
    const items = (order as any).items.map((item: any) => ({
      name: item.itemName,
      quantity: item.quantity,
    }));
    
    // Generate WhatsApp message and link
    const whatsappMessage = formatWhatsAppMessage({
      giftSenderName: order.giftSenderName!,
      giftRecipientName: order.giftRecipientName!,
      giftMessage: order.giftMessage,
      giftClaimCode: (order as any).giftClaimCode!,
      total: order.total,
      items,
      branch: {
        name: (order as any).branch.name,
        address: (order as any).branch.address,
        phone: (order as any).branch.phone,
      },
      restaurant: {
        name: (order as any).branch.restaurant.name,
      },
    });
    
    const whatsappLink = generateWhatsAppLink(data.giftRecipientPhone, whatsappMessage);
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        giftClaimCode: (order as any).giftClaimCode,
        total: order.total,
        createdAt: order.createdAt.toISOString(),
      },
      whatsappMessage,
      whatsappLink,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Gift order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create gift order' },
      { status: 500 }
    );
  }
}
