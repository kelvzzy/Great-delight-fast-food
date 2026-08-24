import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { qrService } from '@/services/qr.service';

/**
 * POST /api/admin/tables/:tableId/qr
 * Generate QR code for a table
 */
export async function POST(
  request: Request,
  { params }: { params: { tableId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const qrDataUrl = await qrService.generateTableQR(params.tableId);

    return NextResponse.json({ qrCode: qrDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    
    if (error instanceof Error && error.message === 'Table not found') {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
