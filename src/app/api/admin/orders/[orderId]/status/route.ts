import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { orderService } from '@/services/order.service';
import { updateOrderStatusSchema } from '@/lib/validations/order';
import { z } from 'zod';

/**
 * PATCH /api/admin/orders/:orderId/status
 * Authenticated endpoint - Update order status
 */
export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateOrderStatusSchema.parse(body);

    const order = await orderService.updateOrderStatus(
      params.orderId,
      validatedData.status
    );

    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
