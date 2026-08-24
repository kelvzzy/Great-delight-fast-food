import { z } from 'zod';

export const menuItemCreateSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  basePrice: z.number().int().min(0).optional(),
  active: z.boolean().default(true),
  available: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const menuItemUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  image: z.string().url().optional().nullable(),
  basePrice: z.number().int().min(0).optional().nullable(),
  active: z.boolean().optional(),
  available: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  categoryId: z.string().uuid().optional(),
});

export const menuCategoryCreateSchema = z.object({
  branchId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  active: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const menuCategoryUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  image: z.string().url().optional().nullable(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const menuVariantCreateSchema = z.object({
  menuItemId: z.string().uuid(),
  name: z.string().min(1).max(100),
  price: z.number().int().min(0),
  active: z.boolean().default(true),
  available: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const menuOptionCreateSchema = z.object({
  menuItemId: z.string().uuid(),
  name: z.string().min(1).max(100),
  required: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  values: z.array(z.object({
    name: z.string().min(1).max(100),
    priceModifier: z.number().int().default(0),
    active: z.boolean().default(true),
    available: z.boolean().default(true),
    sortOrder: z.number().int().min(0).default(0),
  })),
});
