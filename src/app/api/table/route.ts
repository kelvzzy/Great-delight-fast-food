import { NextResponse } from 'next/server';
import { qrService } from '@/services/qr.service';

/**
 * GET /api/table?restaurant=great-delight&branch=main&table=table-01
 * Public endpoint - Get table details by route params
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantSlug = searchParams.get('restaurant');
    const branchSlug = searchParams.get('branch');
    const tableSlug = searchParams.get('table');

    if (!restaurantSlug || !branchSlug || !tableSlug) {
      return NextResponse.json(
        { error: 'Restaurant, branch, and table slugs are required' },
        { status: 400 }
      );
    }

    const table = await qrService.getTableByRoute(
      restaurantSlug,
      branchSlug,
      tableSlug
    );

    if (!table) {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(table);
  } catch (error) {
    console.error('Error fetching table:', error);
    return NextResponse.json(
      { error: 'Failed to fetch table' },
      { status: 500 }
    );
  }
}
