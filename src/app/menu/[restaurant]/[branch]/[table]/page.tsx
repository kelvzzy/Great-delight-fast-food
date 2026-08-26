import { MenuPageClient } from './MenuPageClient';
import { notFound } from 'next/navigation';
import { menuService } from '@/services/menu.service';
import { qrService } from '@/services/qr.service';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getMenu(restaurant: string, branch: string) {
  try {
    return await menuService.getMenuByBranch(restaurant, branch);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return null;
  }
}

async function getTable(restaurant: string, branch: string, table: string) {
  try {
    return await qrService.getTableByRoute(restaurant, branch, table);
  } catch (error) {
    console.error('Error fetching table:', error);
    return null;
  }
}

export default async function MenuPage({
  params,
}: {
  params: { restaurant: string; branch: string; table: string };
}) {
  const [menu, table] = await Promise.all([
    getMenu(params.restaurant, params.branch),
    getTable(params.restaurant, params.branch, params.table),
  ]);

  if (!menu || !table) {
    notFound();
  }

  return (
    <MenuPageClient 
      menu={menu} 
      table={table} 
      params={params}
    />
  );
}
