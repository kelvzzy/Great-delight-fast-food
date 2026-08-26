import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { DashboardClient } from './DashboardClient';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getStats(branchId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/stats?branchId=${branchId}`,
    { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );

  if (!res.ok) return null;
  return res.json();
}

async function getRecentOrders(branchId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/orders?branchId=${branchId}&limit=5`,
    { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.orders || [];
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
          recentOrders={recentOrders} 
          branchId={branchId}
        />
      </main>
    </div>
  );
}
