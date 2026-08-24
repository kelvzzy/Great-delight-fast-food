import { NextResponse } from 'next/server';
import { menuService } from '@/services/menu.service';

/**
 * GET /api/menu?restaurant=great-delight&branch=main
 * Public endpoint - Get menu for a restaurant branch
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantSlug = searchParams.get('restaurant');
    const branchSlug = searchParams.get('branch');

    if (!restaurantSlug || !branchSlug) {
      return NextResponse.json(
        { error: 'Restaurant and branch slugs are required' },
        { status: 400 }
      );
    }

    const menu = await menuService.getMenuByBranch(restaurantSlug, branchSlug);

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}
