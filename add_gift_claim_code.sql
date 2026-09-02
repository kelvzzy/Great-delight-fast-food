-- Add missing gift_claim_code column
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "gift_claim_code" TEXT;

-- Add unique constraint
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'orders_gift_claim_code_key'
    ) THEN
        ALTER TABLE "orders" ADD CONSTRAINT "orders_gift_claim_code_key" UNIQUE ("gift_claim_code");
    END IF;
END $$;

-- Add index
CREATE INDEX IF NOT EXISTS "orders_gift_claim_code_idx" ON "orders"("gift_claim_code");

-- Add composite index for gift queries
CREATE INDEX IF NOT EXISTS "orders_is_gift_gift_claimed_idx" ON "orders"("is_gift", "gift_claimed");
