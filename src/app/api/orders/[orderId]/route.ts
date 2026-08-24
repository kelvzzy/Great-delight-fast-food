import { NextResponse } from 'next/server';
import { orderService } from '@/services/order.service';

/**
 * GET /api/orders/:orderId
 * Public endpoint - Get order details
 */
export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await orderService.getOrder(params.orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
