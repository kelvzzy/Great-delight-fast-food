'use client';

import { useState } from 'react';
import { formatNaira } from '@/lib/utils';
import { 
  Edit, 
  Power, 
  PowerOff, 
  ChevronDown, 
  ChevronRight,
  RefreshCw,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react';

interface MenuItemVariant {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

interface MenuItemOption {
  id: string;
  name: string;
  required: boolean;
  values: Array<{
    id: string;
    name: string;
    priceModifier: number;
    available: boolean;
  }>;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  basePrice: number | null;
  available: boolean;
  variants: MenuItemVariant[];
  options: MenuItemOption[];
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  menuItems: MenuItem[];
}

interface MenuManagementClientProps {
  initialCategories: Category[];
  branchId: string;
}

export function MenuManagementClient({ initialCategories, branchId }: MenuManagementClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const refreshMenu = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/admin/menu?branchId=${branchId}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to refresh menu:', error);
      alert('Failed to refresh menu');
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleAvailability = async (itemId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/menu/items/${itemId}/availability`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !currentStatus }),
      });

      if (res.ok) {
        await refreshMenu();
      } else {
        alert('Failed to update availability');
      }
    } catch (error) {
      console.error('Failed to update availability:', error);
      alert('Failed to update availability');
    }
  };

  const startEditingPrice = (itemId: string, currentPrice: number | null) => {
    setEditingItem(itemId);
    setEditPrice(currentPrice || 0);
  };

  const savePrice = async (itemId: string) => {
    try {
      const res = await fetch(`/api/admin/menu/items/${itemId}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: editPrice }),
      });

      if (res.ok) {
        setEditingItem(null);
        await refreshMenu();
      } else {
        alert('Failed to update price');
      }
    } catch (error) {
      console.error('Failed to update price:', error);
      alert('Failed to update price');
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditPrice(0);
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.menuItems.length, 0);
  const availableItems = categories.reduce(
    (sum, cat) => sum + cat.menuItems.filter(item => item.available).length,
    0
  );

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-1">
            {totalItems} items ({availableItems} available)
          </p>
        </div>
        <button
          onClick={refreshMenu}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Quick Actions:</strong> Toggle availability with the power icon, or click the price to edit it inline.
        </p>
      </div>

      {/* Categories & Items */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No menu items found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            
            return (
              <div key={category.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {category.menuItems.length} items
                  </div>
                </button>

                {/* Category Items */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {category.menuItems.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        No items in this category
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {category.menuItems.map((item) => (
                          <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              {/* Item Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {item.name}
                                  </h3>
                                  <span
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                      item.available
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {item.available ? 'Available' : 'Unavailable'}
                                  </span>
                                </div>
                                
                                {item.description && (
                                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                )}

                                {/* Variants */}
                                {item.variants.length > 0 && (
                                  <div className="mb-2">
                                    <p className="text-xs font-medium text-gray-700 mb-1">Variants:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {item.variants.map((variant) => (
                                        <span
                                          key={variant.id}
                                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                        >
                                          {variant.name} - {formatNaira(variant.price)}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Options */}
                                {item.options.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-gray-700 mb-1">Options:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {item.options.map((option) => (
                                        <span
                                          key={option.id}
                                          className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                                        >
                                          {option.name} ({option.values.length} choices)
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col gap-3 items-end min-w-[120px]">
                                {/* Price */}
                                {editingItem === item.id ? (
                                  <div className="flex flex-col gap-2">
                                    <input
                                      type="number"
                                      value={editPrice}
                                      onChange={(e) => setEditPrice(Number(e.target.value))}
                                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                      placeholder="Price in kobo"
                                      autoFocus
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => savePrice(item.id)}
                                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={cancelEdit}
                                        className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => startEditingPrice(item.id, item.basePrice)}
                                    className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors group"
                                  >
                                    {item.basePrice !== null ? formatNaira(item.basePrice) : 'Set Price'}
                                    <DollarSign className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </button>
                                )}

                                {/* Availability Toggle */}
                                <button
                                  onClick={() => toggleAvailability(item.id, item.available)}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                    item.available
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                                  }`}
                                >
                                  {item.available ? (
                                    <>
                                      <Power className="w-4 h-4" />
                                      <span className="text-sm">Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <PowerOff className="w-4 h-4" />
                                      <span className="text-sm">Inactive</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
