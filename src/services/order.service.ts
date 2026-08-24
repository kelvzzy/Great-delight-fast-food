import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { generateOrderNumber } from '@/lib/utils';
import { OrderStatus, Prisma } from '@prisma/client';

interface OrderItemInput {
  menuItemId: string;
  quantity: number;
  variantId?: string;
  optionValueIds?: string[];
}

interface CreateOrderInput {
  branchId: string;
  tableId: string;
  customerName?: string;
  customerPhone?: string;
  specialNote?: string;
  items: OrderItemInput[];
}

export class OrderService {
  /**
   * Calculate order item price with variants and options
   */
  private async calculateItemPrice(item: OrderItemInput): Promise<number> {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: item.menuItemId },
      include: {
        variants: true,
        options: {
          include: { values: true },
        },
      },
    });

    if (!menuItem) {
      throw new Error('Menu item not found');
    }

    if (!menuItem.available) {
      throw new Error(`${menuItem.name} is currently unavailable`);
    }

    let price = 0;

    // If variant is selected, use variant price
    if (item.variantId) {
      const variant = menuItem.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        throw new Error('Selected variant not found');
      }
      if (!variant.available) {
        throw new Error(`${variant.name} is currently unavailable`);
      }
      price = variant.price;
    } else if (menuItem.basePrice !== null) {
      // Use base price if no variant
      price = menuItem.basePrice;
    } else {
      throw new Error('Item requires variant selection');
    }

    // Add option price modifiers
    if (item.optionValueIds && item.optionValueIds.length > 0) {
      const optionValues = await prisma.menuOptionValue.findMany({
        where: { id: { in: item.optionValueIds } },
      });

      for (const optionValue of optionValues) {
        if (!optionValue.available) {
          throw new Error(`${optionValue.name} is currently unavailable`);
        }
        price += optionValue.priceModifier;
      }
    }

    return price * item.quantity;
  }

  /**
   * Create new order
   */
  async createOrder(input: CreateOrderInput) {
    try {
      // Generate order number
      const lastOrder = await prisma.order.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { orderNumber: true },
      });

      const lastSequence = lastOrder
        ? parseInt(lastOrder.orderNumber.split('-')[1])
        : 0;
      const orderNumber = generateOrderNumber(lastSequence + 1);

      // Calculate prices and build order items
      const orderItemsData: Prisma.OrderItemCreateWithoutOrderInput[] = [];
      let subtotal = 0;

      for (const item of input.items) {
        const itemSubtotal = await this.calculateItemPrice(item);
        subtotal += itemSubtotal;

        const menuItem = await prisma.menuItem.findUnique({
          where: { id: item.menuItemId },
          include: {
            variants: true,
            options: { include: { values: true } },
          },
        });

        if (!menuItem) continue;

        // Base order item
        const orderItemData: any = {
          menuItem: { connect: { id: item.menuItemId } },
          itemName: menuItem.name,
          itemPrice: menuItem.basePrice,
          quantity: item.quantity,
          subtotal: itemSubtotal,
        };

        // Add variant if selected
        if (item.variantId) {
          const variant = menuItem.variants.find((v) => v.id === item.variantId);
          if (variant) {
            orderItemData.variant = {
              create: {
                variant: { connect: { id: variant.id } },
                variantName: variant.name,
                variantPrice: variant.price,
              },
            };
          }
        }

        // Add options if selected
        if (item.optionValueIds && item.optionValueIds.length > 0) {
          const optionValues = await prisma.menuOptionValue.findMany({
            where: { id: { in: item.optionValueIds } },
            include: { option: true },
          });

          orderItemData.options = {
            create: optionValues.map((ov) => ({
              optionValue: { connect: { id: ov.id } },
              optionName: ov.option.name,
              valueName: ov.name,
              priceModifier: ov.priceModifier,
            })),
          };
        }

        orderItemsData.push(orderItemData);
      }

      // Create order with all items
      const order = await prisma.order.create({
        data: {
          orderNumber,
          branch: { connect: { id: input.branchId } },
          table: { connect: { id: input.tableId } },
          status: OrderStatus.NEW,
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          specialNote: input.specialNote,
          subtotal,
          total: subtotal,
          itemCount: input.items.reduce((sum, item) => sum + item.quantity, 0),
          items: {
            create: orderItemsData,
          },
        },
        include: {
          table: true,
          items: {
            include: {
              variant: { include: { variant: true } },
              options: { include: { optionValue: true } },
            },
          },
        },
      });

      logger.info('Order created', {
        orderId: order.id,
        orderNumber: order.orderNumber,
        tableId: input.tableId,
        total: order.total,
        itemCount: order.itemCount,
      });

      return order;
    } catch (error) {
      logger.error('Error creating order', { input, error });
      throw error;
    }
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          table: true,
          branch: { include: { restaurant: true } },
          items: {
            include: {
              menuItem: true,
              variant: { include: { variant: true } },
              options: { include: { optionValue: { include: { option: true } } } },
            },
          },
        },
      });

      return order;
    } catch (error) {
      logger.error('Error fetching order', { orderId, error });
      throw error;
    }
  }

  /**
   * Get orders for a branch with filters
   */
  async getOrders(branchId: string, status?: OrderStatus, limit = 50) {
    try {
      const where: Prisma.OrderWhereInput = { branchId };
      if (status) {
        where.status = status;
      }

      const orders = await prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
          table: true,
          items: {
            include: {
              menuItem: true,
              variant: { include: { variant: true } },
              options: { include: { optionValue: true } },
            },
          },
        },
      });

      return orders;
    } catch (error) {
      logger.error('Error fetching orders', { branchId, status, error });
      throw error;
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      const updateData: Prisma.OrderUpdateInput = {
        status,
        updatedAt: new Date(),
      };

      // Set timestamp fields based on status
      switch (status) {
        case OrderStatus.ACCEPTED:
          updateData.acceptedAt = new Date();
          break;
        case OrderStatus.PREPARING:
          updateData.preparingAt = new Date();
          break;
        case OrderStatus.READY:
          updateData.readyAt = new Date();
          break;
        case OrderStatus.COMPLETED:
          updateData.completedAt = new Date();
          break;
        case OrderStatus.CANCELLED:
          updateData.cancelledAt = new Date();
          break;
      }

      const order = await prisma.order.update({
        where: { id: orderId },
        data: updateData,
        include: {
          table: true,
          items: {
            include: {
              variant: { include: { variant: true } },
              options: { include: { optionValue: true } },
            },
          },
        },
      });

      logger.info('Order status updated', {
        orderId,
        orderNumber: order.orderNumber,
        newStatus: status,
      });

      return order;
    } catch (error) {
      logger.error('Error updating order status', { orderId, status, error });
      throw error;
    }
  }

  /**
   * Get today's order statistics
   */
  async getTodayStats(branchId: string) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const orders = await prisma.order.findMany({
        where: {
          branchId,
          createdAt: { gte: today },
        },
        select: {
          status: true,
          total: true,
        },
      });

      const stats = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        pendingOrders: orders.filter(
          (o) => o.status === OrderStatus.NEW || o.status === OrderStatus.ACCEPTED || o.status === OrderStatus.PREPARING
        ).length,
        completedOrders: orders.filter((o) => o.status === OrderStatus.COMPLETED).length,
        averageOrderValue: orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length) : 0,
      };

      return stats;
    } catch (error) {
      logger.error('Error fetching today stats', { branchId, error });
      throw error;
    }
  }
}

export const orderService = new OrderService();
