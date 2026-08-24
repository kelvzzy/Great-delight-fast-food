import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export class MenuService {
  /**
   * Get complete menu for a branch with categories and items
   */
  async getMenuByBranch(restaurantSlug: string, branchSlug: string) {
    try {
      const branch = await prisma.branch.findFirst({
        where: {
          slug: branchSlug,
          restaurant: { slug: restaurantSlug },
          active: true,
        },
        include: {
          restaurant: true,
          menuCategories: {
            where: { active: true },
            orderBy: { sortOrder: 'asc' },
            include: {
              menuItems: {
                where: { active: true },
                orderBy: { sortOrder: 'asc' },
                include: {
                  variants: {
                    where: { active: true },
                    orderBy: { sortOrder: 'asc' },
                  },
                  options: {
                    orderBy: { sortOrder: 'asc' },
                    include: {
                      values: {
                        where: { active: true },
                        orderBy: { sortOrder: 'asc' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return branch;
    } catch (error) {
      logger.error('Error fetching menu', { restaurantSlug, branchSlug, error });
      throw error;
    }
  }

  /**
   * Get menu item details with variants and options
   */
  async getMenuItem(itemId: string) {
    try {
      const item = await prisma.menuItem.findUnique({
        where: { id: itemId },
        include: {
          category: true,
          variants: {
            where: { active: true },
            orderBy: { sortOrder: 'asc' },
          },
          options: {
            orderBy: { sortOrder: 'asc' },
            include: {
              values: {
                where: { active: true },
                orderBy: { sortOrder: 'asc' },
              },
            },
          },
        },
      });

      return item;
    } catch (error) {
      logger.error('Error fetching menu item', { itemId, error });
      throw error;
    }
  }

  /**
   * Update menu item availability
   */
  async updateItemAvailability(itemId: string, available: boolean) {
    try {
      const item = await prisma.menuItem.update({
        where: { id: itemId },
        data: { available, updatedAt: new Date() },
      });

      logger.info('Menu item availability updated', {
        itemId,
        itemName: item.name,
        available,
      });

      return item;
    } catch (error) {
      logger.error('Error updating item availability', { itemId, available, error });
      throw error;
    }
  }

  /**
   * Update menu item price
   */
  async updateItemPrice(itemId: string, basePrice: number) {
    try {
      const item = await prisma.menuItem.update({
        where: { id: itemId },
        data: { basePrice, updatedAt: new Date() },
      });

      logger.info('Menu item price updated', {
        itemId,
        itemName: item.name,
        newPrice: basePrice,
      });

      return item;
    } catch (error) {
      logger.error('Error updating item price', { itemId, basePrice, error });
      throw error;
    }
  }

  /**
   * Update variant price
   */
  async updateVariantPrice(variantId: string, price: number) {
    try {
      const variant = await prisma.menuVariant.update({
        where: { id: variantId },
        data: { price, updatedAt: new Date() },
        include: { menuItem: true },
      });

      logger.info('Menu variant price updated', {
        variantId,
        variantName: variant.name,
        itemName: variant.menuItem.name,
        newPrice: price,
      });

      return variant;
    } catch (error) {
      logger.error('Error updating variant price', { variantId, price, error });
      throw error;
    }
  }

  /**
   * Create new menu item
   */
  async createMenuItem(data: any) {
    try {
      const item = await prisma.menuItem.create({
        data,
        include: {
          variants: true,
          options: {
            include: { values: true },
          },
        },
      });

      logger.info('Menu item created', {
        itemId: item.id,
        itemName: item.name,
      });

      return item;
    } catch (error) {
      logger.error('Error creating menu item', { data, error });
      throw error;
    }
  }

  /**
   * Update menu item
   */
  async updateMenuItem(itemId: string, data: any) {
    try {
      const item = await prisma.menuItem.update({
        where: { id: itemId },
        data: { ...data, updatedAt: new Date() },
        include: {
          variants: true,
          options: {
            include: { values: true },
          },
        },
      });

      logger.info('Menu item updated', {
        itemId: item.id,
        itemName: item.name,
      });

      return item;
    } catch (error) {
      logger.error('Error updating menu item', { itemId, data, error });
      throw error;
    }
  }

  /**
   * Get all categories for a branch
   */
  async getCategoriesByBranch(branchId: string) {
    try {
      const categories = await prisma.menuCategory.findMany({
        where: { branchId },
        orderBy: { sortOrder: 'asc' },
        include: {
          _count: {
            select: { menuItems: true },
          },
        },
      });

      return categories;
    } catch (error) {
      logger.error('Error fetching categories', { branchId, error });
      throw error;
    }
  }
}

export const menuService = new MenuService();
