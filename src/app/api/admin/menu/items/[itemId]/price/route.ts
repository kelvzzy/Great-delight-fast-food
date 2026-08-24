import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

/**
 * PATCH /api/admin/menu/items/:itemId/price
 * Update menu item price
 */
export async function PATCH(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { price } = await request.json();

    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.update({
      where: { id: params.itemId },
      data: { basePrice: price, updatedAt: new Date() },
    });

    logger.info('Menu item price updated', {
      itemId: params.itemId,
      itemName: item.name,
      newPrice: price,
      updatedBy: (session.user as any).email,
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error updating item price:', error);
    logger.error('Error updating item price', { itemId: params.itemId, error });
    return NextResponse.json(
      { error: 'Failed to update price' },
      { status: 500 }
    );
  }
}
