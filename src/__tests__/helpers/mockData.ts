import { OrderStatus } from '@prisma/client';

/**
 * Mock data factory for testing
 */

export const mockRestaurant = {
  id: 'rest-1',
  name: 'GREAT DELIGHT',
  slug: 'great-delight',
  email: 'info@greatdelight.com',
  phone: '08012345678',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockBranch = {
  id: 'branch-1',
  restaurantId: 'rest-1',
  name: 'Surulere Branch',
  slug: 'surulere',
  address: '123 Adeniran Ogunsanya Street, Surulere, Lagos',
  phone: '08012345678',
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockTable = {
  id: 'table-1',
  branchId: 'branch-1',
  tableNumber: 'TABLE 01',
  qrRoute: 'great-delight-jollof-01',
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockCategory = {
  id: 'cat-1',
  branchId: 'branch-1',
  name: 'Main Dishes',
  slug: 'main-dishes',
  description: 'Delicious Nigerian main courses',
  displayOrder: 1,
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockMenuItem = {
  id: 'item-1',
  branchId: 'branch-1',
  categoryId: 'cat-1',
  name: 'Jollof Rice',
  slug: 'jollof-rice',
  description: 'Classic Nigerian jollof rice',
  priceInKobo: 50000, // ₦500
  imageUrl: null,
  isAvailable: true,
  displayOrder: 1,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockVariant = {
  id: 'var-1',
  menuItemId: 'item-1',
  name: 'Large',
  priceModifierInKobo: 20000, // +₦200
  isActive: true,
  displayOrder: 1,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockOption = {
  id: 'opt-1',
  menuItemId: 'item-1',
  name: 'Extra Spicy',
  priceModifierInKobo: 5000, // +₦50
  isActive: true,
  displayOrder: 1,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockOrder = {
  id: 'order-1',
  restaurantId: 'rest-1',
  branchId: 'branch-1',
  tableId: 'table-1',
  orderNumber: 'ORD-001',
  customerName: 'John Doe',
  customerPhone: '08012345678',
  totalAmountInKobo: 100000, // ₦1,000
  status: OrderStatus.NEW,
  notes: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockOrderItem = {
  id: 'order-item-1',
  orderId: 'order-1',
  menuItemId: 'item-1',
  quantity: 2,
  priceAtOrderInKobo: 50000,
  menuItemName: 'Jollof Rice',
  notes: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockUser = {
  id: 'user-1',
  email: 'admin@greatdelight.com',
  name: 'Admin User',
  passwordHash: '$2b$10$hashedpassword',
  role: 'ADMIN',
  restaurantId: 'rest-1',
  branchId: 'branch-1',
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

/**
 * Factory functions for creating test data
 */

export const createMockMenuItem = (overrides?: Partial<typeof mockMenuItem>) => ({
  ...mockMenuItem,
  ...overrides,
  id: overrides?.id || `item-${Math.random()}`,
});

export const createMockOrder = (overrides?: Partial<typeof mockOrder>) => ({
  ...mockOrder,
  ...overrides,
  id: overrides?.id || `order-${Math.random()}`,
  orderNumber: overrides?.orderNumber || `ORD-${Math.floor(Math.random() * 1000)}`,
});

export const createMockOrderItem = (overrides?: Partial<typeof mockOrderItem>) => ({
  ...mockOrderItem,
  ...overrides,
  id: overrides?.id || `order-item-${Math.random()}`,
});

export const createMockVariant = (overrides?: Partial<typeof mockVariant>) => ({
  ...mockVariant,
  ...overrides,
  id: overrides?.id || `var-${Math.random()}`,
});

export const createMockOption = (overrides?: Partial<typeof mockOption>) => ({
  ...mockOption,
  ...overrides,
  id: overrides?.id || `opt-${Math.random()}`,
});

/**
 * Common test scenarios
 */

export const createOrderWithItems = () => ({
  ...mockOrder,
  items: [
    {
      ...mockOrderItem,
      menuItem: mockMenuItem,
      selectedVariants: [],
      selectedOptions: [],
    },
  ],
  table: mockTable,
  branch: { ...mockBranch, restaurant: mockRestaurant },
  restaurant: mockRestaurant,
});

export const createMenuItemWithVariantsAndOptions = () => ({
  ...mockMenuItem,
  category: mockCategory,
  variants: [
    { ...mockVariant, id: 'var-1', name: 'Small', priceModifierInKobo: 0 },
    { ...mockVariant, id: 'var-2', name: 'Large', priceModifierInKobo: 20000 },
  ],
  options: [
    { ...mockOption, id: 'opt-1', name: 'Extra Spicy', priceModifierInKobo: 5000 },
    { ...mockOption, id: 'opt-2', name: 'Extra Meat', priceModifierInKobo: 10000 },
  ],
});

export const createCompleteMenu = () => [
  {
    ...mockMenuItem,
    id: 'item-1',
    name: 'Jollof Rice',
    priceInKobo: 50000,
    category: mockCategory,
  },
  {
    ...mockMenuItem,
    id: 'item-2',
    name: 'Fried Rice',
    priceInKobo: 45000,
    category: mockCategory,
  },
  {
    ...mockMenuItem,
    id: 'item-3',
    name: 'White Rice',
    priceInKobo: 40000,
    category: mockCategory,
  },
];
