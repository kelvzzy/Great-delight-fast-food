'use client';

import { useState } from 'react';
import { MenuItemCard } from '@/components/customer/MenuItemCard';
import { CartSummary } from '@/components/customer/CartSummary';
import { useCartStore } from '@/stores/cart.store';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface MenuPageClientProps {
  menu: any;
  table: any;
  params: { restaurant: string; branch: string; table: string };
}

export function MenuPageClient({ menu, table, params }: MenuPageClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    menu.menuCategories[0]?.id || null
  );

  const handleAddToCart = (item: any) => {
    addItem(item);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Category color schemes for visual variety
  const categoryColors = [
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-600',
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-yellow-500 to-orange-500',
    'from-teal-500 to-cyan-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-yellow-600',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 pb-32">
      {/* Header with Stunning Gradient */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white sticky top-0 z-20 shadow-2xl">
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <h1 className="text-3xl font-bold tracking-tight">{menu.restaurant.name}</h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-white/40">
              {table.name}
            </div>
            <div className="text-sm opacity-90 font-medium">{menu.name}</div>
          </div>
        </div>
      </header>

      {/* Welcome Banner with Gradient */}
      <div className="bg-gradient-to-r from-white via-orange-50 to-white border-b-4 border-orange-200 px-6 py-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-3xl">👋</span> Welcome!
        </h2>
        <p className="text-gray-700 mt-2 text-lg">
          Tap any category below to explore our delicious menu 🍽️
        </p>
      </div>

      {/* Accordion Categories */}
      <main className="px-4 py-6 space-y-4 max-w-4xl mx-auto">
        {menu.menuCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500 text-lg">No menu items available at the moment.</p>
          </div>
        ) : (
          menu.menuCategories.map((category: any, index: number) => {
            const isExpanded = expandedCategory === category.id;
            const gradientColor = categoryColors[index % categoryColors.length];
            
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-orange-300"
              >
                {/* Category Header - Clickable */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full"
                >
                  <div
                    className={`bg-gradient-to-r ${gradientColor} text-white px-6 py-5 flex items-center justify-between cursor-pointer hover:opacity-90 transition-all duration-200 active:scale-98`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/30 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <span className="text-3xl">
                          {index === 0 && '🍲'}
                          {index === 1 && '🍚'}
                          {index === 2 && '⚡'}
                          {index === 3 && '🌶️'}
                          {index === 4 && '🥩'}
                          {index === 5 && '🍹'}
                          {index > 5 && '🍽️'}
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold tracking-tight">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-white/90 text-sm mt-1 font-medium">
                            {category.description}
                          </p>
                        )}
                        <p className="text-white/80 text-xs mt-1">
                          {category.menuItems.length} item{category.menuItems.length !== 1 && 's'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      {isExpanded ? (
                        <ChevronUp className="w-7 h-7" />
                      ) : (
                        <ChevronDown className="w-7 h-7" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Category Items - Expandable */}
                {isExpanded && (
                  <div className="p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white animate-accordion-down">
                    {category.menuItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No items in this category.
                      </p>
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
                )}
              </div>
            );
          })
        )}
      </main>

      {/* Cart Summary - Fixed Bottom with Glow Effect */}
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
