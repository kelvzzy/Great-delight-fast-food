'use client';

import { MenuItemCard } from '@/components/customer/MenuItemCard';
import { CartSummary } from '@/components/customer/CartSummary';
import { useCartStore } from '@/stores/cart.store';

interface MenuPageClientProps {
  menu: any;
  table: any;
  params: { restaurant: string; branch: string; table: string };
}

export function MenuPageClient({ menu, table, params }: MenuPageClientProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (item: any) => {
    addItem(item);
    // Optional: Show toast notification
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white sticky top-0 z-20 shadow-lg">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold">{menu.restaurant.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {table.name}
            </div>
            <div className="text-sm opacity-90">{menu.name}</div>
          </div>
        </div>
      </header>

      {/* Welcome Message */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h2 className="text-xl font-semibold text-gray-900">Welcome!</h2>
        <p className="text-gray-600 mt-1">
          Browse our menu and add items to your cart. We&apos;ll send your order directly to the kitchen.
        </p>
      </div>

      {/* Categories & Menu Items */}
      <main className="px-4 py-6 space-y-8">
        {menu.menuCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No menu items available at the moment.</p>
          </div>
        ) : (
          menu.menuCategories.map((category: any) => (
            <section key={category.id} id={category.slug}>
              {/* Category Header */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                {category.description && (
                  <p className="text-gray-600 mt-1">{category.description}</p>
                )}
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {category.menuItems.length === 0 ? (
                  <p className="text-gray-500 text-sm">No items in this category.</p>
                ) : (
                  category.menuItems.map((item: any) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                )}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Cart Summary - Fixed Bottom */}
      <CartSummary 
        tableId={table.id} 
        branchId={table.branchId}
        restaurantSlug={params.restaurant}
        branchSlug={params.branch}
        tableSlug={params.table}
      />
    </div>
  );
}
