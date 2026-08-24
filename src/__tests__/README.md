# Test Helpers

This directory contains shared testing utilities and mock data for the GREAT DELIGHT project.

## Structure

```
__tests__/
└── helpers/
    └── mockData.ts    # Mock data factory for tests
```

## Usage

### Importing Mock Data

```typescript
import { 
  mockMenuItem, 
  mockOrder, 
  createMockOrder,
  createMenuItemWithVariantsAndOptions 
} from '@/__tests__/helpers/mockData';
```

### Available Mocks

#### Static Mocks
- `mockRestaurant` - GREAT DELIGHT restaurant data
- `mockBranch` - Surulere branch data
- `mockTable` - Table 01 data
- `mockCategory` - Main Dishes category
- `mockMenuItem` - Jollof Rice menu item
- `mockVariant` - Large size variant
- `mockOption` - Extra Spicy option
- `mockOrder` - Sample order
- `mockOrderItem` - Sample order item
- `mockUser` - Admin user

#### Factory Functions
- `createMockMenuItem(overrides?)` - Create custom menu item
- `createMockOrder(overrides?)` - Create custom order
- `createMockOrderItem(overrides?)` - Create custom order item
- `createMockVariant(overrides?)` - Create custom variant
- `createMockOption(overrides?)` - Create custom option

#### Scenario Builders
- `createOrderWithItems()` - Complete order with items and relations
- `createMenuItemWithVariantsAndOptions()` - Menu item with size and add-ons
- `createCompleteMenu()` - Full menu with multiple items

## Examples

### Basic Mock Usage

```typescript
describe('MenuService', () => {
  it('should return menu item', () => {
    const item = mockMenuItem;
    expect(item.name).toBe('Jollof Rice');
  });
});
```

### Factory Functions

```typescript
describe('OrderService', () => {
  it('should calculate order total', () => {
    const order = createMockOrder({
      totalAmountInKobo: 150000,
      customerName: 'John Doe'
    });
    expect(order.totalAmountInKobo).toBe(150000);
  });
});
```

### Complex Scenarios

```typescript
describe('Order Flow', () => {
  it('should process order with variants', () => {
    const menuItem = createMenuItemWithVariantsAndOptions();
    expect(menuItem.variants).toHaveLength(2);
    expect(menuItem.options).toHaveLength(2);
  });
});
```

## Guidelines

1. **Use Factories for Custom Data** - When you need specific values
2. **Use Static Mocks for Standard Cases** - When defaults are sufficient
3. **Keep Mocks Simple** - Only include data relevant to your test
4. **Update When Schema Changes** - Keep mocks in sync with Prisma schema

## See Also

- [Testing Guide](../../../TESTING_GUIDE.md) - Comprehensive testing documentation
- [Testing Status](../../../TESTING_STATUS.md) - Current testing progress
