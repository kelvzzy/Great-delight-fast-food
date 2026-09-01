/**
 * Gift Order View API Endpoint
 * GET /api/orders/gift/[code] - View gift order by claim code
 */

import { NextResponse } from 'next/server';
import { isValidClaimCode } from '@/lib/giftCode';
import { getGiftOrderByClaimCode } from '@/services/giftOrder.service';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    // Validate code format
    if (!isValidClaimCode(code)) {
      return NextResponse.json(
        { error: 'Invalid claim code format' },
        { status: 400 }
      );
    }
    
    // Fetch gift order
    const order = await getGiftOrderByClaimCode(code);
    
    if (!order || !order.isGift) {
      return NextResponse.json(
        { error: 'Gift order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      gift: {
        orderNumber: order.orderNumber,
        senderName: order.giftSenderName!,
        recipientName: order.giftRecipientName!,
        message: order.giftMessage,
        total: order.total,
        items: (order as any).items.map((item: any) => ({
          name: item.itemName,
          quantity: item.quantity,
          price: item.subtotal,
        })),
        claimed: order.giftClaimed,
        claimedAt: order.giftClaimedAt?.toISOString() ?? null,
        branch: {
          name: (order as any).branch.name,
          address: (order as any).branch.address ?? '',
          phone: (order as any).branch.phone ?? '',
        },
        restaurant: {
          name: (order as any).branch.restaurant.name,
        },
        createdAt: order.createdAt.toISOString(),
      },
    });
    
  } catch (error) {
    console.error('Gift order view error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve gift order' },
      { status: 500 }
    );
  }
}
