import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItemOption {
  optionId: string;
  optionName: string;
  valueId: string;
  valueName: string;
  priceModifier: number;
}

export interface CartItem {
  id: string; // Unique cart item ID
  menuItemId: string;
  name: string;
  basePrice: number | null;
  quantity: number;
  variantId?: string;
  variantName?: string;
  variantPrice?: number;
  options: CartItemOption[];
  subtotal: number;
}

interface CartStore {
  items: CartItem[];
  tableId: string | null;
  branchId: string | null;
  
  // Actions
  setTable: (tableId: string, branchId: string) => void;
  addItem: (item: Omit<CartItem, 'id' | 'subtotal'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const calculateItemSubtotal = (item: Omit<CartItem, 'id' | 'subtotal'>): number => {
  let price = 0;
  
  // Use variant price if available, otherwise base price
  if (item.variantPrice !== undefined) {
    price = item.variantPrice;
  } else if (item.basePrice !== null) {
    price = item.basePrice;
  }
  
  // Add option modifiers
  item.options.forEach((option) => {
    price += option.priceModifier;
  });
  
  return price * item.quantity;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      tableId: null,
      branchId: null,
      
      setTable: (tableId, branchId) => {
        set({ tableId, branchId });
      },
      
      addItem: (item) => {
        const id = `${item.menuItemId}-${item.variantId || 'no-variant'}-${item.options.map(o => o.valueId).join('-')}-${Date.now()}`;
        const subtotal = calculateItemSubtotal(item);
        
        set((state) => ({
          items: [...state.items, { ...item, id, subtotal }],
        }));
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity, subtotal: calculateItemSubtotal({ ...item, quantity }) }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [], tableId: null, branchId: null });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.subtotal, 0);
      },
    }),
    {
      name: 'great-delight-cart',
    }
  )
);
