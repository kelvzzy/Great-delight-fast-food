-- Add gift_claim_code column and index
ALTER TABLE "orders" ADD COLUMN "gift_claim_code" TEXT;

CREATE UNIQUE INDEX "orders_gift_claim_code_key" ON "orders"("gift_claim_code");

CREATE INDEX "orders_gift_claim_code_idx" ON "orders"("gift_claim_code");
