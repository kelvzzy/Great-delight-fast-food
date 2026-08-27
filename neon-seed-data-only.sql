-- SEED DATA ONLY - For Neon (tables already exist with correct lowercase names)

-- Insert Restaurant
INSERT INTO restaurants (id, name, slug, description, primary_color, active, created_at, updated_at)
VALUES ('rest_001', 'Great Delight', 'great-delight', 'Authentic Nigerian Cuisine', '#FF6B35', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Branch
INSERT INTO branches (id, restaurant_id, name, slug, address, phone, active, created_at, updated_at)
VALUES ('branch_001', 'rest_001', 'Great Delight Main Branch', 'main', '123 Lagos Street, Nigeria', '+234 123 456 7890', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Admin User (password: admin123)
INSERT INTO users (id, email, name, password, role, branch_id, active, created_at, updated_at)
VALUES ('user_001', 'admin@greatdelight.com', 'Admin User', '$2a$12$JAc7RLe3dvrMBgulcQKBbOFPqUBsJHIE.Pu5zf8VuEQ/y3NA2wXj2', 'ADMIN', 'branch_001', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert Tables (20 tables)
INSERT INTO tables (id, branch_id, name, slug, qr_code, active, sort_order, created_at, updated_at) VALUES
('table_001', 'branch_001', 'Table 01', 'table-01', NULL, true, 1, NOW(), NOW()),
('table_002', 'branch_001', 'Table 02', 'table-02', NULL, true, 2, NOW(), NOW()),
('table_003', 'branch_001', 'Table 03', 'table-03', NULL, true, 3, NOW(), NOW()),
('table_004', 'branch_001', 'Table 04', 'table-04', NULL, true, 4, NOW(), NOW()),
('table_005', 'branch_001', 'Table 05', 'table-05', NULL, true, 5, NOW(), NOW()),
('table_006', 'branch_001', 'Table 06', 'table-06', NULL, true, 6, NOW(), NOW()),
('table_007', 'branch_001', 'Table 07', 'table-07', NULL, true, 7, NOW(), NOW()),
('table_008', 'branch_001', 'Table 08', 'table-08', NULL, true, 8, NOW(), NOW()),
('table_009', 'branch_001', 'Table 09', 'table-09', NULL, true, 9, NOW(), NOW()),
('table_010', 'branch_001', 'Table 10', 'table-10', NULL, true, 10, NOW(), NOW()),
('table_011', 'branch_001', 'Table 11', 'table-11', NULL, true, 11, NOW(), NOW()),
('table_012', 'branch_001', 'Table 12', 'table-12', NULL, true, 12, NOW(), NOW()),
('table_013', 'branch_001', 'Table 13', 'table-13', NULL, true, 13, NOW(), NOW()),
('table_014', 'branch_001', 'Table 14', 'table-14', NULL, true, 14, NOW(), NOW()),
('table_015', 'branch_001', 'Table 15', 'table-15', NULL, true, 15, NOW(), NOW()),
('table_016', 'branch_001', 'Table 16', 'table-16', NULL, true, 16, NOW(), NOW()),
('table_017', 'branch_001', 'Table 17', 'table-17', NULL, true, 17, NOW(), NOW()),
('table_018', 'branch_001', 'Table 18', 'table-18', NULL, true, 18, NOW(), NOW()),
('table_019', 'branch_001', 'Table 19', 'table-19', NULL, true, 19, NOW(), NOW()),
('table_020', 'branch_001', 'Table 20', 'table-20', NULL, true, 20, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Categories
INSERT INTO menu_categories (id, branch_id, name, slug, description, image, active, sort_order, created_at, updated_at) VALUES
('cat_001', 'branch_001', 'Swallow', 'swallow', 'Traditional Nigerian swallow dishes', NULL, true, 1, NOW(), NOW()),
('cat_002', 'branch_001', 'Proteins', 'proteins', 'Meat and fish dishes', NULL, true, 2, NOW(), NOW()),
('cat_003', 'branch_001', 'Soups', 'soups', 'Nigerian soups', NULL, true, 3, NOW(), NOW()),
('cat_004', 'branch_001', 'Rice Dishes', 'rice-dishes', 'Rice-based meals', NULL, true, 4, NOW(), NOW()),
('cat_005', 'branch_001', 'Sides', 'sides', 'Side dishes', NULL, true, 5, NOW(), NOW()),
('cat_006', 'branch_001', 'Drinks', 'drinks', 'Beverages', NULL, true, 6, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items (Swallow)
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_001', 'cat_001', 'Eba', 'eba', 'Cassava flour swallow', NULL, NULL, true, false, 1, NOW(), NOW()),
('item_002', 'cat_001', 'Pounded Yam', 'pounded-yam', 'Smooth pounded yam', NULL, NULL, true, false, 2, NOW(), NOW()),
('item_003', 'cat_001', 'Amala', 'amala', 'Yam flour swallow', NULL, NULL, true, false, 3, NOW(), NOW()),
('item_004', 'cat_001', 'Fufu', 'fufu', 'Fermented cassava', NULL, NULL, true, false, 4, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Swallow Variants
INSERT INTO menu_variants (id, menu_item_id, name, slug, price, available, sort_order, created_at, updated_at) VALUES
('var_001', 'item_001', 'Small', 'small', 50000, true, 1, NOW(), NOW()),
('var_002', 'item_001', 'Medium', 'medium', 80000, true, 2, NOW(), NOW()),
('var_003', 'item_001', 'Large', 'large', 100000, true, 3, NOW(), NOW()),
('var_004', 'item_002', 'Small', 'small', 100000, true, 1, NOW(), NOW()),
('var_005', 'item_002', 'Medium', 'medium', 150000, true, 2, NOW(), NOW()),
('var_006', 'item_002', 'Large', 'large', 200000, true, 3, NOW(), NOW()),
('var_007', 'item_003', 'Small', 'small', 60000, true, 1, NOW(), NOW()),
('var_008', 'item_003', 'Medium', 'medium', 90000, true, 2, NOW(), NOW()),
('var_009', 'item_003', 'Large', 'large', 120000, true, 3, NOW(), NOW()),
('var_010', 'item_004', 'Small', 'small', 50000, true, 1, NOW(), NOW()),
('var_011', 'item_004', 'Medium', 'medium', 80000, true, 2, NOW(), NOW()),
('var_012', 'item_004', 'Large', 'large', 100000, true, 3, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items (Proteins)
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_005', 'cat_002', 'Goat Meat', 'goat-meat', 'Tender goat meat', NULL, NULL, true, false, 1, NOW(), NOW()),
('item_006', 'cat_002', 'Beef', 'beef', 'Grilled beef', NULL, NULL, true, false, 2, NOW(), NOW()),
('item_007', 'cat_002', 'Chicken', 'chicken', 'Chicken pieces', NULL, NULL, true, false, 3, NOW(), NOW()),
('item_008', 'cat_002', 'Fish', 'fish', 'Fresh fish', NULL, NULL, true, false, 4, NOW(), NOW()),
('item_009', 'cat_002', 'Snail', 'snail', 'Congo meat snail', NULL, NULL, true, false, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Protein Variants
INSERT INTO menu_variants (id, menu_item_id, name, slug, price, available, sort_order, created_at, updated_at) VALUES
('var_013', 'item_005', 'Small', 'small', 150000, true, 1, NOW(), NOW()),
('var_014', 'item_005', 'Medium', 'medium', 200000, true, 2, NOW(), NOW()),
('var_015', 'item_005', 'Large', 'large', 300000, true, 3, NOW(), NOW()),
('var_016', 'item_006', 'Small', 'small', 120000, true, 1, NOW(), NOW()),
('var_017', 'item_006', 'Medium', 'medium', 180000, true, 2, NOW(), NOW()),
('var_018', 'item_006', 'Large', 'large', 250000, true, 3, NOW(), NOW()),
('var_019', 'item_007', 'Small', 'small', 120000, true, 1, NOW(), NOW()),
('var_020', 'item_007', 'Medium', 'medium', 180000, true, 2, NOW(), NOW()),
('var_021', 'item_007', 'Large', 'large', 250000, true, 3, NOW(), NOW()),
('var_022', 'item_008', 'Small', 'small', 180000, true, 1, NOW(), NOW()),
('var_023', 'item_008', 'Medium', 'medium', 250000, true, 2, NOW(), NOW()),
('var_024', 'item_008', 'Large', 'large', 350000, true, 3, NOW(), NOW()),
('var_025', 'item_009', 'Small', 'small', 300000, true, 1, NOW(), NOW()),
('var_026', 'item_009', 'Medium', 'medium', 450000, true, 2, NOW(), NOW()),
('var_027', 'item_009', 'Large', 'large', 600000, true, 3, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items (Soups)
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_010', 'cat_003', 'Egusi Soup', 'egusi-soup', 'Melon seed soup', NULL, 200000, true, false, 1, NOW(), NOW()),
('item_011', 'cat_003', 'Ogbono Soup', 'ogbono-soup', 'Draw soup', NULL, 180000, true, false, 2, NOW(), NOW()),
('item_012', 'cat_003', 'Efo Riro', 'efo-riro', 'Vegetable soup', NULL, 200000, true, false, 3, NOW(), NOW()),
('item_013', 'cat_003', 'Banga Soup', 'banga-soup', 'Palm nut soup', NULL, 220000, true, false, 4, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items (Rice)
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_014', 'cat_004', 'Jollof Rice', 'jollof-rice', 'Party jollof rice', NULL, NULL, true, false, 1, NOW(), NOW()),
('item_015', 'cat_004', 'Fried Rice', 'fried-rice', 'Mixed fried rice', NULL, NULL, true, false, 2, NOW(), NOW()),
('item_016', 'cat_004', 'White Rice & Stew', 'white-rice-stew', 'Plain rice with stew', NULL, NULL, true, false, 3, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Rice Variants
INSERT INTO menu_variants (id, menu_item_id, name, slug, price, available, sort_order, created_at, updated_at) VALUES
('var_028', 'item_014', 'Small', 'small', 120000, true, 1, NOW(), NOW()),
('var_029', 'item_014', 'Medium', 'medium', 180000, true, 2, NOW(), NOW()),
('var_030', 'item_014', 'Large', 'large', 250000, true, 3, NOW(), NOW()),
('var_031', 'item_015', 'Small', 'small', 120000, true, 1, NOW(), NOW()),
('var_032', 'item_015', 'Medium', 'medium', 180000, true, 2, NOW(), NOW()),
('var_033', 'item_015', 'Large', 'large', 250000, true, 3, NOW(), NOW()),
('var_034', 'item_016', 'Small', 'small', 100000, true, 1, NOW(), NOW()),
('var_035', 'item_016', 'Medium', 'medium', 150000, true, 2, NOW(), NOW()),
('var_036', 'item_016', 'Large', 'large', 200000, true, 3, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items (Sides)
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_017', 'cat_005', 'Plantain', 'plantain', 'Fried ripe plantain', NULL, 50000, true, false, 1, NOW(), NOW()),
('item_018', 'cat_005', 'Moi Moi', 'moi-moi', 'Bean pudding', NULL, 80000, true, false, 2, NOW(), NOW()),
('item_019', 'cat_005', 'Salad', 'salad', 'Fresh vegetable salad', NULL, 100000, true, false, 3, NOW(), NOW()),
('item_020', 'cat_005', 'Coleslaw', 'coleslaw', 'Creamy coleslaw', NULL, 80000, true, false, 4, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Menu Items (Drinks)
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_021', 'cat_006', 'Soft Drink', 'soft-drink', 'Coca-Cola, Fanta, Sprite', NULL, NULL, true, false, 1, NOW(), NOW()),
('item_022', 'cat_006', 'Malt', 'malt', 'Malta Guinness', NULL, NULL, true, false, 2, NOW(), NOW()),
('item_023', 'cat_006', 'Water', 'water', 'Bottled water', NULL, NULL, true, false, 3, NOW(), NOW()),
('item_024', 'cat_006', 'Chapman', 'chapman', 'Mixed fruit cocktail', NULL, NULL, true, false, 4, NOW(), NOW()),
('item_025', 'cat_006', 'Zobo', 'zobo', 'Hibiscus drink', NULL, NULL, true, false, 5, NOW(), NOW()),
('item_026', 'cat_006', 'Palm Wine', 'palm-wine', 'Fresh palm wine', NULL, NULL, true, false, 6, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Drink Variants
INSERT INTO menu_variants (id, menu_item_id, name, slug, price, available, sort_order, created_at, updated_at) VALUES
('var_037', 'item_021', 'Can', 'can', 30000, true, 1, NOW(), NOW()),
('var_038', 'item_021', 'Bottle (50cl)', 'bottle-50cl', 25000, true, 2, NOW(), NOW()),
('var_039', 'item_021', 'Bottle (1.5L)', 'bottle-1-5l', 60000, true, 3, NOW(), NOW()),
('var_040', 'item_022', 'Can', 'can', 40000, true, 1, NOW(), NOW()),
('var_041', 'item_022', 'Bottle', 'bottle', 35000, true, 2, NOW(), NOW()),
('var_042', 'item_023', 'Small', 'small', 10000, true, 1, NOW(), NOW()),
('var_043', 'item_023', 'Large', 'large', 15000, true, 2, NOW(), NOW()),
('var_044', 'item_024', 'Small', 'small', 80000, true, 1, NOW(), NOW()),
('var_045', 'item_024', 'Large', 'large', 120000, true, 2, NOW(), NOW()),
('var_046', 'item_025', 'Small', 'small', 50000, true, 1, NOW(), NOW()),
('var_047', 'item_025', 'Large', 'large', 80000, true, 2, NOW(), NOW()),
('var_048', 'item_026', 'Small', 'small', 100000, true, 1, NOW(), NOW()),
('var_049', 'item_026', 'Large', 'large', 150000, true, 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify counts
SELECT 'Data inserted successfully!' as status;
SELECT 'restaurants' as table_name, COUNT(*) as count FROM restaurants
UNION ALL SELECT 'branches', COUNT(*) FROM branches
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'tables', COUNT(*) FROM tables
UNION ALL SELECT 'menu_categories', COUNT(*) FROM menu_categories
UNION ALL SELECT 'menu_items', COUNT(*) FROM menu_items
UNION ALL SELECT 'menu_variants', COUNT(*) FROM menu_variants;
