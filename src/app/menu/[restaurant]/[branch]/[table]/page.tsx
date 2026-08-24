import { MenuPageClient } from './MenuPageClient';
import { notFound } from 'next/navigation';

async function getMenu(restaurant: string, branch: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/menu?restaurant=${restaurant}&branch=${branch}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  return res.json();
}

async function getTable(restaurant: string, branch: string, table: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/table?restaurant=${restaurant}&branch=${branch}&table=${table}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  return res.json();
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
