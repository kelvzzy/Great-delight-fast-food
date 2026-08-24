import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { menuService } from '@/services/menu.service';

/**
 * PATCH /api/admin/menu/items/:itemId/availability
 * Update menu item availability
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

    const { available } = await request.json();

    if (typeof available !== 'boolean') {
      return NextResponse.json(
        { error: 'Available must be a boolean' },
        { status: 400 }
      );
    }

    const item = await menuService.updateItemAvailability(params.itemId, available);

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error updating item availability:', error);
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    );
  }
}
