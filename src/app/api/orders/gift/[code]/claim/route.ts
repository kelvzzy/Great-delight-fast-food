/**
 * Gift Order Claim API Endpoint
 * PATCH /api/orders/gift/[code]/claim - Mark gift order as claimed
 */

import { NextResponse } from 'next/server';
import { isValidClaimCode } from '@/lib/giftCode';
import { claimGiftOrder } from '@/services/giftOrder.service';

export async function PATCH(
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
    
    // Claim the gift order
    const order = await claimGiftOrder(code);
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        claimed: order.giftClaimed,
        claimedAt: order.giftClaimedAt!.toISOString(),
      },
    });
    
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Gift order not found' },
        { status: 404 }
      );
    }
    
    console.error('Gift order claim error:', error);
    return NextResponse.json(
      { error: 'Failed to claim gift order' },
      { status: 500 }
    );
  }
}
