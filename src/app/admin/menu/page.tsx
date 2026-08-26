import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { MenuManagementClient } from './MenuManagementClient';
import { menuService } from '@/services/menu.service';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getMenu(branchId: string) {
  try {
    // Get branch with full menu structure
    const branch = await menuService.getMenuByBranch('', ''); // Will be modified to use branchId directly
    
    // For now, get via direct API call
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/admin/menu?branchId=${branchId}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!res.ok) return { categories: [] };
    return res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    return { categories: [] };
  }
}

export default async function MenuManagementPage() {
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

  const menuData = await getMenu(branchId);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav userName={user.name} userEmail={user.email} />
      <main className="flex-1 md:ml-0">
        <MenuManagementClient 
          initialCategories={menuData.categories || []} 
          branchId={branchId}
        />
      </main>
    </div>
  );
}
