import { NextResponse } from 'next/server';
import { menuService } from '@/services/menu.service';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

/**
 * GET /api/menu/:itemId
 * Public endpoint - Get menu item details
 */
export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const item = await menuService.getMenuItem(params.itemId);

    if (!item) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu item' },
      { status: 500 }
    );
  }
}
