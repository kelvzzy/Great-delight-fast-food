import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { MenuManagementClient } from './MenuManagementClient';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getMenu(branchId: string) {
  try {
    const categories = await prisma.menuCategory.findMany({
      where: { branchId },
      orderBy: { sortOrder: 'asc' },
      include: {
        menuItems: {
          orderBy: { sortOrder: 'asc' },
          include: {
            variants: {
              orderBy: { sortOrder: 'asc' },
            },
            options: {
              orderBy: { sortOrder: 'asc' },
              include: {
                values: {
                  orderBy: { sortOrder: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    return { categories };
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
