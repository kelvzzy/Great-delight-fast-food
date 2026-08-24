import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { orderService } from '@/services/order.service';

/**
 * GET /api/admin/stats
 * Authenticated endpoint - Get today's statistics
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.branchId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await orderService.getTodayStats(session.user.branchId);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
