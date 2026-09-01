/**
 * Gift Order Claim Code Generator
 * Generates cryptographically secure unique claim codes for gift orders
 */

import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const CLAIM_CODE_LENGTH = 10;
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded ambiguous: I,O,0,1
const MAX_ATTEMPTS = 10;

/**
 * Generate a cryptographically secure unique claim code
 * @returns {Promise<string>} A unique 10-character alphanumeric claim code
 * @throws {Error} If unable to generate unique code after MAX_ATTEMPTS
 */
export async function generateClaimCode(): Promise<string> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // Generate random bytes
    const bytes = crypto.randomBytes(CLAIM_CODE_LENGTH);
    
    // Convert to alphanumeric string
    let code = '';
    for (let i = 0; i < CLAIM_CODE_LENGTH; i++) {
      code += CHARSET[bytes[i] % CHARSET.length];
    }
    
    // Verify uniqueness in database
    const existing = await prisma.order.findUnique({
      where: { giftClaimCode: code },
      select: { id: true },
    });
    
    if (!existing) {
      return code;
    }
  }
  
  throw new Error('Failed to generate unique claim code after maximum attempts');
}

/**
 * Validate claim code format
 * @param {string} code - The claim code to validate
 * @returns {boolean} True if code matches expected format
 */
export function isValidClaimCode(code: string): boolean {
  return /^[A-Z0-9]{8,12}$/.test(code);
}
