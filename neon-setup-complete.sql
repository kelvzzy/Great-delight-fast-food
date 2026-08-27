-- NEON DATABASE SETUP - Run this in Neon SQL Editor
-- This combines setup and seed in one script

-- ============================================
-- PART 1: CREATE TABLES
-- ============================================

-- Create Restaurant table
CREATE TABLE IF NOT EXISTS "Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "logo" TEXT,
    "primaryColor" TEXT DEFAULT '#FF6B35',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Branch table
CREATE TABLE IF NOT EXISTS "Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Branch_restaurantId_slug_key" UNIQUE ("restaurantId", "slug"),
    CONSTRAINT "Branch_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',
    "branchId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL
);

-- Create Table table
CREATE TABLE IF NOT EXISTS "Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "branchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "qrCode" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Table_branchId_slug_key" UNIQUE ("branchId", "slug"),
    CONSTRAINT "Table_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE
);

-- Create MenuCategory table
CREATE TABLE IF NOT EXISTS "MenuCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "branchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenuCategory_branchId_slug_key" UNIQUE ("branchId", "slug"),
    CONSTRAINT "MenuCategory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE
);

-- Create MenuItem table
CREATE TABLE IF NOT EXISTS "MenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "basePrice" INTEGER,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenuItem_categoryId_slug_key" UNIQUE ("categoryId", "slug"),
    CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MenuCategory"("id") ON DELETE CASCADE
);

-- Create MenuItemVariant table
CREATE TABLE IF NOT EXISTS "MenuItemVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenuItemVariant_menuItemId_slug_key" UNIQUE ("menuItemId", "slug"),
    CONSTRAINT "MenuItemVariant_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE
);

-- Create MenuItemOption table
CREATE TABLE IF NOT EXISTS "MenuItemOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "multiSelect" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenuItemOption_menuItemId_slug_key" UNIQUE ("menuItemId", "slug"),
    CONSTRAINT "MenuItemOption_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE
);

-- Create MenuOptionValue table
CREATE TABLE IF NOT EXISTS "MenuOptionValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "optionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priceModifier" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenuOptionValue_optionId_slug_key" UNIQUE ("optionId", "slug"),
    CONSTRAINT "MenuOptionValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "MenuItemOption"("id") ON DELETE CASCADE
);

-- Create Order table
CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "branchId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL UNIQUE,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "total" INTEGER NOT NULL,
    "specialNote" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "preparingAt" TIMESTAMP(3),
    "readyAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT,
    CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT
);

-- Create OrderItem table
CREATE TABLE IF NOT EXISTS "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "variantId" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "specialNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE,
    CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT,
    CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MenuItemVariant"("id") ON DELETE SET NULL
);

-- Create OrderItemOption table
CREATE TABLE IF NOT EXISTS "OrderItemOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderItemId" TEXT NOT NULL,
    "optionValueId" TEXT NOT NULL,
    "priceModifier" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItemOption_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE,
    CONSTRAINT "OrderItemOption_optionValueId_fkey" FOREIGN KEY ("optionValueId") REFERENCES "MenuOptionValue"("id") ON DELETE RESTRICT
);

-- Create OrderItemVariant table
CREATE TABLE IF NOT EXISTS "OrderItemVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderItemId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItemVariant_orderItemId_key" UNIQUE ("orderItemId"),
    CONSTRAINT "OrderItemVariant_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE,
    CONSTRAINT "OrderItemVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "MenuItemVariant"("id") ON DELETE RESTRICT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Branch_restaurantId_idx" ON "Branch"("restaurantId");
CREATE INDEX IF NOT EXISTS "User_branchId_idx" ON "User"("branchId");
CREATE INDEX IF NOT EXISTS "Table_branchId_idx" ON "Table"("branchId");
CREATE INDEX IF NOT EXISTS "MenuCategory_branchId_idx" ON "MenuCategory"("branchId");
CREATE INDEX IF NOT EXISTS "MenuItem_categoryId_idx" ON "MenuItem"("categoryId");
CREATE INDEX IF NOT EXISTS "MenuItemVariant_menuItemId_idx" ON "MenuItemVariant"("menuItemId");
CREATE INDEX IF NOT EXISTS "MenuItemOption_menuItemId_idx" ON "MenuItemOption"("menuItemId");
CREATE INDEX IF NOT EXISTS "MenuOptionValue_optionId_idx" ON "MenuOptionValue"("optionId");
CREATE INDEX IF NOT EXISTS "Order_branchId_idx" ON "Order"("branchId");
CREATE INDEX IF NOT EXISTS "Order_tableId_idx" ON "Order"("tableId");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");
CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- ============================================
-- PART 2: SEED DATA
-- ============================================

-- Insert Restaurant
INSERT INTO "Restaurant" ("id", "name", "slug", "description", "primaryColor")
VALUES ('rest_001', 'Great Delight', 'great-delight', 'Authentic Nigerian Cuisine', '#FF6B35')
ON CONFLICT ("id") DO NOTHING;

-- Insert Branch
INSERT INTO "Branch" ("id", "restaurantId", "name", "slug", "address", "phone")
VALUES ('branch_001', 'rest_001', 'Great Delight Main Branch', 'main', '123 Lagos Street, Nigeria', '+234 123 456 7890')
ON CONFLICT ("id") DO NOTHING;

-- Insert Admin User (password: admin123)
INSERT INTO "User" ("id", "email", "name", "password", "role", "branchId")
VALUES ('user_001', 'admin@greatdelight.com', 'Admin User', '$2a$12$JAc7RLe3dvrMBgulcQKBbOFPqUBsJHIE.Pu5zf8VuEQ/y3NA2wXj2', 'ADMIN', 'branch_001')
ON CONFLICT ("email") DO NOTHING;

-- Insert Tables (20 tables)
INSERT INTO "Table" ("id", "branchId", "name", "slug", "sortOrder") VALUES
('table_001', 'branch_001', 'Table 01', 'table-01', 1),
('table_002', 'branch_001', 'Table 02', 'table-02', 2),
('table_003', 'branch_001', 'Table 03', 'table-03', 3),
('table_004', 'branch_001', 'Table 04', 'table-04', 4),
('table_005', 'branch_001', 'Table 05', 'table-05', 5),
('table_006', 'branch_001', 'Table 06', 'table-06', 6),
('table_007', 'branch_001', 'Table 07', 'table-07', 7),
('table_008', 'branch_001', 'Table 08', 'table-08', 8),
('table_009', 'branch_001', 'Table 09', 'table-09', 9),
('table_010', 'branch_001', 'Table 10', 'table-10', 10),
('table_011', 'branch_001', 'Table 11', 'table-11', 11),
('table_012', 'branch_001', 'Table 12', 'table-12', 12),
('table_013', 'branch_001', 'Table 13', 'table-13', 13),
('table_014', 'branch_001', 'Table 14', 'table-14', 14),
('table_015', 'branch_001', 'Table 15', 'table-15', 15),
('table_016', 'branch_001', 'Table 16', 'table-16', 16),
('table_017', 'branch_001', 'Table 17', 'table-17', 17),
('table_018', 'branch_001', 'Table 18', 'table-18', 18),
('table_019', 'branch_001', 'Table 19', 'table-19', 19),
('table_020', 'branch_001', 'Table 20', 'table-20', 20)
ON CONFLICT ("id") DO NOTHING;

-- Insert Menu Categories
INSERT INTO "MenuCategory" ("id", "branchId", "name", "slug", "description", "sortOrder") VALUES
('cat_001', 'branch_001', 'Swallow', 'swallow', 'Traditional Nigerian swallow dishes', 1),
('cat_002', 'branch_001', 'Proteins', 'proteins', 'Meat and fish dishes', 2),
('cat_003', 'branch_001', 'Soups', 'soups', 'Nigerian soups', 3),
('cat_004', 'branch_001', 'Rice Dishes', 'rice-dishes', 'Rice-based meals', 4),
('cat_005', 'branch_001', 'Sides', 'sides', 'Side dishes', 5),
('cat_006', 'branch_001', 'Drinks', 'drinks', 'Beverages', 6)
ON CONFLICT ("id") DO NOTHING;

-- Insert Menu Items with Variants
-- Swallow Items
INSERT INTO "MenuItem" ("id", "categoryId", "name", "slug", "description", "sortOrder", "available") VALUES
('item_001', 'cat_001', 'Eba', 'eba', 'Cassava flour swallow', 1, true),
('item_002', 'cat_001', 'Pounded Yam', 'pounded-yam', 'Smooth pounded yam', 2, true),
('item_003', 'cat_001', 'Amala', 'amala', 'Yam flour swallow', 3, true),
('item_004', 'cat_001', 'Fufu', 'fufu', 'Fermented cassava', 4, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "MenuItemVariant" ("id", "menuItemId", "name", "slug", "price", "sortOrder", "available") VALUES
('var_001', 'item_001', 'Small', 'small', 50000, 1, true),
('var_002', 'item_001', 'Medium', 'medium', 80000, 2, true),
('var_003', 'item_001', 'Large', 'large', 100000, 3, true),
('var_004', 'item_002', 'Small', 'small', 100000, 1, true),
('var_005', 'item_002', 'Medium', 'medium', 150000, 2, true),
('var_006', 'item_002', 'Large', 'large', 200000, 3, true),
('var_007', 'item_003', 'Small', 'small', 60000, 1, true),
('var_008', 'item_003', 'Medium', 'medium', 90000, 2, true),
('var_009', 'item_003', 'Large', 'large', 120000, 3, true),
('var_010', 'item_004', 'Small', 'small', 50000, 1, true),
('var_011', 'item_004', 'Medium', 'medium', 80000, 2, true),
('var_012', 'item_004', 'Large', 'large', 100000, 3, true)
ON CONFLICT ("id") DO NOTHING;

-- Protein Items
INSERT INTO "MenuItem" ("id", "categoryId", "name", "slug", "description", "sortOrder", "available") VALUES
('item_005', 'cat_002', 'Goat Meat', 'goat-meat', 'Tender goat meat', 1, true),
('item_006', 'cat_002', 'Beef', 'beef', 'Grilled beef', 2, true),
('item_007', 'cat_002', 'Chicken', 'chicken', 'Chicken pieces', 3, true),
('item_008', 'cat_002', 'Fish', 'fish', 'Fresh fish', 4, true),
('item_009', 'cat_002', 'Snail', 'snail', 'Congo meat snail', 5, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "MenuItemVariant" ("id", "menuItemId", "name", "slug", "price", "sortOrder", "available") VALUES
('var_013', 'item_005', 'Small', 'small', 150000, 1, true),
('var_014', 'item_005', 'Medium', 'medium', 200000, 2, true),
('var_015', 'item_005', 'Large', 'large', 300000, 3, true),
('var_016', 'item_006', 'Small', 'small', 120000, 1, true),
('var_017', 'item_006', 'Medium', 'medium', 180000, 2, true),
('var_018', 'item_006', 'Large', 'large', 250000, 3, true),
('var_019', 'item_007', 'Small', 'small', 120000, 1, true),
('var_020', 'item_007', 'Medium', 'medium', 180000, 2, true),
('var_021', 'item_007', 'Large', 'large', 250000, 3, true),
('var_022', 'item_008', 'Small', 'small', 180000, 1, true),
('var_023', 'item_008', 'Medium', 'medium', 250000, 2, true),
('var_024', 'item_008', 'Large', 'large', 350000, 3, true),
('var_025', 'item_009', 'Small', 'small', 300000, 1, true),
('var_026', 'item_009', 'Medium', 'medium', 450000, 2, true),
('var_027', 'item_009', 'Large', 'large', 600000, 3, true)
ON CONFLICT ("id") DO NOTHING;

-- Soup Items
INSERT INTO "MenuItem" ("id", "categoryId", "name", "slug", "description", "basePrice", "sortOrder", "available") VALUES
('item_010', 'cat_003', 'Egusi Soup', 'egusi-soup', 'Melon seed soup', 200000, 1, true),
('item_011', 'cat_003', 'Ogbono Soup', 'ogbono-soup', 'Draw soup', 180000, 2, true),
('item_012', 'cat_003', 'Efo Riro', 'efo-riro', 'Vegetable soup', 200000, 3, true),
('item_013', 'cat_003', 'Banga Soup', 'banga-soup', 'Palm nut soup', 220000, 4, true)
ON CONFLICT ("id") DO NOTHING;

-- Rice Items
INSERT INTO "MenuItem" ("id", "categoryId", "name", "slug", "description", "sortOrder", "available") VALUES
('item_014', 'cat_004', 'Jollof Rice', 'jollof-rice', 'Party jollof rice', 1, true),
('item_015', 'cat_004', 'Fried Rice', 'fried-rice', 'Mixed fried rice', 2, true),
('item_016', 'cat_004', 'White Rice & Stew', 'white-rice-stew', 'Plain rice with stew', 3, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "MenuItemVariant" ("id", "menuItemId", "name", "slug", "price", "sortOrder", "available") VALUES
('var_028', 'item_014', 'Small', 'small', 120000, 1, true),
('var_029', 'item_014', 'Medium', 'medium', 180000, 2, true),
('var_030', 'item_014', 'Large', 'large', 250000, 3, true),
('var_031', 'item_015', 'Small', 'small', 120000, 1, true),
('var_032', 'item_015', 'Medium', 'medium', 180000, 2, true),
('var_033', 'item_015', 'Large', 'large', 250000, 3, true),
('var_034', 'item_016', 'Small', 'small', 100000, 1, true),
('var_035', 'item_016', 'Medium', 'medium', 150000, 2, true),
('var_036', 'item_016', 'Large', 'large', 200000, 3, true)
ON CONFLICT ("id") DO NOTHING;

-- Side Items
INSERT INTO "MenuItem" ("id", "categoryId", "name", "slug", "description", "basePrice", "sortOrder", "available") VALUES
('item_017', 'cat_005', 'Plantain', 'plantain', 'Fried ripe plantain', 50000, 1, true),
('item_018', 'cat_005', 'Moi Moi', 'moi-moi', 'Bean pudding', 80000, 2, true),
('item_019', 'cat_005', 'Salad', 'salad', 'Fresh vegetable salad', 100000, 3, true),
('item_020', 'cat_005', 'Coleslaw', 'coleslaw', 'Creamy coleslaw', 80000, 4, true)
ON CONFLICT ("id") DO NOTHING;

-- Drink Items
INSERT INTO "MenuItem" ("id", "categoryId", "name", "slug", "description", "sortOrder", "available") VALUES
('item_021', 'cat_006', 'Soft Drink', 'soft-drink', 'Coca-Cola, Fanta, Sprite', 1, true),
('item_022', 'cat_006', 'Malt', 'malt', 'Malta Guinness', 2, true),
('item_023', 'cat_006', 'Water', 'water', 'Bottled water', 3, true),
('item_024', 'cat_006', 'Chapman', 'chapman', 'Mixed fruit cocktail', 4, true),
('item_025', 'cat_006', 'Zobo', 'zobo', 'Hibiscus drink', 5, true),
('item_026', 'cat_006', 'Palm Wine', 'palm-wine', 'Fresh palm wine', 6, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "MenuItemVariant" ("id", "menuItemId", "name", "slug", "price", "sortOrder", "available") VALUES
('var_037', 'item_021', 'Can', 'can', 30000, 1, true),
('var_038', 'item_021', 'Bottle (50cl)', 'bottle-50cl', 25000, 2, true),
('var_039', 'item_021', 'Bottle (1.5L)', 'bottle-1-5l', 60000, 3, true),
('var_040', 'item_022', 'Can', 'can', 40000, 1, true),
('var_041', 'item_022', 'Bottle', 'bottle', 35000, 2, true),
('var_042', 'item_023', 'Small', 'small', 10000, 1, true),
('var_043', 'item_023', 'Large', 'large', 15000, 2, true),
('var_044', 'item_024', 'Small', 'small', 80000, 1, true),
('var_045', 'item_024', 'Large', 'large', 120000, 2, true),
('var_046', 'item_025', 'Small', 'small', 50000, 1, true),
('var_047', 'item_025', 'Large', 'large', 80000, 2, true),
('var_048', 'item_026', 'Small', 'small', 100000, 1, true),
('var_049', 'item_026', 'Large', 'large', 150000, 2, true)
ON CONFLICT ("id") DO NOTHING;

-- Success message
SELECT 'Database setup complete! All tables created and seeded.' as status;
