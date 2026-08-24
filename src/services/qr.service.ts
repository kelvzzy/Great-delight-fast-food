import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export class QRService {
  /**
   * Generate QR code for a table
   */
  async generateTableQR(tableId: string): Promise<string> {
    try {
      const table = await prisma.table.findUnique({
        where: { id: tableId },
        include: {
          branch: {
            include: {
              restaurant: true,
            },
          },
        },
      });

      if (!table) {
        throw new Error('Table not found');
      }

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const menuUrl = `${baseUrl}/menu/${table.branch.restaurant.slug}/${table.branch.slug}/${table.slug}`;

      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(menuUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      // Update table with QR code
      await prisma.table.update({
        where: { id: tableId },
        data: { qrCode: qrDataUrl },
      });

      logger.info('QR code generated for table', {
        tableId,
        tableName: table.name,
        branchId: table.branchId,
      });

      return qrDataUrl;
    } catch (error) {
      logger.error('Error generating QR code', { tableId, error });
      throw error;
    }
  }

  /**
   * Generate QR codes for all tables in a branch
   */
  async generateBranchQRCodes(branchId: string): Promise<number> {
    try {
      const tables = await prisma.table.findMany({
        where: { branchId, active: true },
      });

      let count = 0;
      for (const table of tables) {
        await this.generateTableQR(table.id);
        count++;
      }

      logger.info('Generated QR codes for branch', {
        branchId,
        count,
      });

      return count;
    } catch (error) {
      logger.error('Error generating branch QR codes', { branchId, error });
      throw error;
    }
  }

  /**
   * Get table by route params
   */
  async getTableByRoute(restaurantSlug: string, branchSlug: string, tableSlug: string) {
    try {
      const table = await prisma.table.findFirst({
        where: {
          slug: tableSlug,
          branch: {
            slug: branchSlug,
            restaurant: {
              slug: restaurantSlug,
            },
          },
          active: true,
        },
        include: {
          branch: {
            include: {
              restaurant: true,
            },
          },
        },
      });

      return table;
    } catch (error) {
      logger.error('Error fetching table by route', {
        restaurantSlug,
        branchSlug,
        tableSlug,
        error,
      });
      throw error;
    }
  }
}

export const qrService = new QRService();
