/**
 * Gift Order Service
 * Handles CRUD operations for gift orders
 */

import { prisma } from '@/lib/prisma';
import { generateClaimCode } from '@/lib/giftCode';

interface CreateGiftOrderData {
  branchId: string;
  tableId: string;
  giftSenderName: string;
  giftSenderPhone: string;
  giftRecipientName: string;
  giftRecipientPhone: string;
  giftMessage?: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
    variantId?: string;
    optionValueIds?: string[];
  }>;
}

/**
 * Create a new gift order with claim code
 */
export async function createGiftOrder(data: CreateGiftOrderData) {
  // Generate unique claim code
  const claimCode = await generateClaimCode();
  
  // Calculate pricing (fetch menu items with prices)
  const menuItemsData = await prisma.menuItem.findMany({
    where: {
      id: { in: data.items.map(item => item.menuItemId) },
    },
    include: {
      variants: true,
      options: {
        include: {
          values: true,
        },
      },
    },
  });
  
  let subtotal = 0;
  const orderItemsData: Array<{
    menuItemId: string;
    itemName: string;
    itemPrice: number | null;
    quantity: number;
    subtotal: number;
    variant: {
      variantId: string;
      variantName: string;
      variantPrice: number;
    } | null;
    options: Array<{
      optionValueId: string;
      optionName: string;
      valueName: string;
      priceModifier: number;
    }>;
  }> = [];
  
  for (const item of data.items) {
    const menuItem = menuItemsData.find(mi => mi.id === item.menuItemId);
    if (!menuItem) {
      throw new Error(`Menu item not found: ${item.menuItemId}`);
    }
    
    // Calculate item price
    let itemPrice = menuItem.basePrice || 0;
    let variantData = null;
    
    // Handle variant
    if (item.variantId) {
      const variant = menuItem.variants.find(v => v.id === item.variantId);
      if (!variant) {
        throw new Error(`Variant not found: ${item.variantId}`);
      }
      itemPrice = variant.price;
      variantData = {
        variantId: variant.id,
        variantName: variant.name,
        variantPrice: variant.price,
      };
    }
    
    // Handle options
    const optionsData = [];
    if (item.optionValueIds && item.optionValueIds.length > 0) {
      for (const option of menuItem.options) {
        const selectedValue = option.values.find(v => item.optionValueIds!.includes(v.id));
        if (selectedValue) {
          itemPrice += selectedValue.priceModifier;
          optionsData.push({
            optionValueId: selectedValue.id,
            optionName: option.name,
            valueName: selectedValue.name,
            priceModifier: selectedValue.priceModifier,
          });
        }
      }
    }
    
    const lineSubtotal = itemPrice * item.quantity;
    subtotal += lineSubtotal;
    
    orderItemsData.push({
      menuItemId: menuItem.id,
      itemName: menuItem.name,
      itemPrice: menuItem.basePrice,
      quantity: item.quantity,
      subtotal: lineSubtotal,
      variant: variantData,
      options: optionsData,
    });
  }
  
  // Generate order number
  const orderCount = await prisma.order.count();
  const orderNumber = `GD-${String(orderCount + 1).padStart(5, '0')}`;
  
  // Create order with all items in transaction
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        branchId: data.branchId,
        tableId: data.tableId,
        status: 'NEW',
        subtotal,
        total: subtotal,
        itemCount: data.items.reduce((sum, item) => sum + item.quantity, 0),
        isGift: true,
        giftSenderName: data.giftSenderName,
        giftSenderPhone: data.giftSenderPhone,
        giftRecipientName: data.giftRecipientName,
        giftRecipientPhone: data.giftRecipientPhone,
        giftMessage: data.giftMessage || null,
        giftClaimCode: claimCode,
        giftClaimed: false,
      },
      include: {
        branch: {
          include: {
            restaurant: true,
          },
        },
        table: true,
      },
    });
    
    // Create order items
    for (const itemData of orderItemsData) {
      const orderItem = await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          menuItemId: itemData.menuItemId,
          itemName: itemData.itemName,
          itemPrice: itemData.itemPrice,
          quantity: itemData.quantity,
          subtotal: itemData.subtotal,
        },
      });
      
      // Create variant if exists
      if (itemData.variant) {
        await tx.orderItemVariant.create({
          data: {
            orderItemId: orderItem.id,
            variantId: itemData.variant.variantId,
            variantName: itemData.variant.variantName,
            variantPrice: itemData.variant.variantPrice,
          },
        });
      }
      
      // Create options if exist
      for (const option of itemData.options) {
        await tx.orderItemOption.create({
          data: {
            orderItemId: orderItem.id,
            optionValueId: option.optionValueId,
            optionName: option.optionName,
            valueName: option.valueName,
            priceModifier: option.priceModifier,
          },
        });
      }
    }
    
    return newOrder;
  });
  
  // Fetch complete order with items
  const completeOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: {
      items: {
        include: {
          menuItem: true,
          variant: {
            include: {
              variant: true,
            },
          },
          options: true,
        },
      },
      branch: {
        include: {
          restaurant: true,
        },
      },
      table: true,
    },
  });
  
  return completeOrder;
}

/**
 * Get gift order by claim code
 */
export async function getGiftOrderByClaimCode(claimCode: string) {
  const order = await prisma.order.findUnique({
    where: { giftClaimCode: claimCode },
    include: {
      items: {
        include: {
          menuItem: true,
          variant: {
            include: {
              variant: true,
            },
          },
          options: true,
        },
      },
      branch: {
        include: {
          restaurant: true,
        },
      },
    },
  });
  
  if (!order || !order.isGift) {
    return null;
  }
  
  return order;
}

/**
 * Claim a gift order
 */
export async function claimGiftOrder(claimCode: string) {
  const order = await prisma.order.update({
    where: { giftClaimCode: claimCode },
    data: {
      giftClaimed: true,
      giftClaimedAt: new Date(),
      status: 'ACCEPTED', // Move to accepted when claimed
    },
    select: {
      id: true,
      orderNumber: true,
      giftClaimed: true,
      giftClaimedAt: true,
    },
  });
  
  return order;
}
