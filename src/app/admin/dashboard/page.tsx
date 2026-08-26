import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { DashboardClient } from './DashboardClient';
import { orderService } from '@/services/order.service';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getStats(branchId: string) {
  try {
    return await orderService.getTodayStats(branchId);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

async function getRecentOrders(branchId: string) {
  try {
    const orders = await orderService.getOrders(branchId, undefined, 5);
    return orders || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const user = session.user as any;
  const branchId = user.branchId;

  if (!branchId) {
    return (
      <div className="flex min-h-screen">
        <AdminNav userName={user.name} userEmail={user.email} />
        <main className="flex-1 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">No Branch Assigned</h2>
            <p className="text-gray-600 mt-2">Please contact your administrator.</p>
          </div>
        </main>
      </div>
    );
  }

  const [stats, recentOrders] = await Promise.all([
    getStats(branchId),
    getRecentOrders(branchId),
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav userName={user.name} userEmail={user.email} />
      <main className="flex-1 md:ml-0">
        <DashboardClient 
          stats={stats} 
          recentOrders={recentOrders as any}
          branchId={branchId}
        />
      </main>
    </div>
  );
}
