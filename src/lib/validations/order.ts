import { z } from 'zod';

export const orderItemSchema = z.object({
  menuItemId: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
  variantId: z.string().uuid().optional(),
  optionValueIds: z.array(z.string().uuid()).optional(),
});

export const createOrderSchema = z.object({
  branchId: z.string().uuid(),
  tableId: z.string().uuid(),
  customerName: z.string().min(1).max(100).optional(),
  customerPhone: z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
  specialNote: z.string().max(500).optional(),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED']),
});
