import { NextResponse } from 'next/server';
import { orderService } from '@/services/order.service';
import { createOrderSchema } from '@/lib/validations/order';
import { z } from 'zod';

// In-memory duplicate order protection (resets on server restart)
// For production, use Redis or database-based solution
const recentOrders = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 5000; // 5 seconds

/**
 * POST /api/orders
 * Public endpoint - Create new order
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createOrderSchema.parse(body);

    // Duplicate order protection
    const orderKey = JSON.stringify({
      tableId: validatedData.tableId,
      items: validatedData.items,
      total: validatedData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
    });

    const now = Date.now();
    const lastOrderTime = recentOrders.get(orderKey);

    if (lastOrderTime && (now - lastOrderTime) < DUPLICATE_WINDOW_MS) {
      return NextResponse.json(
        { error: 'Duplicate order detected. Please wait a few seconds before trying again.' },
        { status: 429 }
      );
    }

    // Record this order attempt
    recentOrders.set(orderKey, now);

    // Clean up old entries (older than 1 minute)
    for (const [key, timestamp] of recentOrders.entries()) {
      if (now - timestamp > 60000) {
        recentOrders.delete(key);
      }
    }

    // Create order
    const order = await orderService.createOrder(validatedData);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating order:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
