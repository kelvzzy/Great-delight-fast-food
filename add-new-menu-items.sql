-- ADD NEW MENU CATEGORIES AND ITEMS

-- Add Grills Category
INSERT INTO menu_categories (id, branch_id, name, slug, description, image, active, sort_order, created_at, updated_at)
VALUES ('cat_007', 'branch_001', 'Grills', 'grills', 'Grilled meats and BBQ specialties', NULL, true, 7, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add Cocktails Category
INSERT INTO menu_categories (id, branch_id, name, slug, description, image, active, sort_order, created_at, updated_at)
VALUES ('cat_008', 'branch_001', 'Cocktails', 'cocktails', 'Signature alcoholic cocktails', NULL, true, 8, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add Mocktails Category
INSERT INTO menu_categories (id, branch_id, name, slug, description, image, active, sort_order, created_at, updated_at)
VALUES ('cat_009', 'branch_001', 'Mocktails', 'mocktails', 'Non-alcoholic refreshing drinks', NULL, true, 9, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add Teas Category
INSERT INTO menu_categories (id, branch_id, name, slug, description, image, active, sort_order, created_at, updated_at)
VALUES ('cat_010', 'branch_001', 'Teas', 'teas', 'Hot and cold tea selections', NULL, true, 10, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- BEERS (Add to existing Drinks category)
-- ============================================
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_027', 'cat_006', 'Star Lager', 'star-lager', 'Premium Nigerian lager beer', NULL, 250000, true, false, 7, NOW(), NOW()),
('item_028', 'cat_006', 'Heineken', 'heineken', 'International premium lager', NULL, 250000, true, false, 8, NOW(), NOW()),
('item_029', 'cat_006', 'Gulder', 'gulder', 'Ultimate lager beer', NULL, 250000, true, false, 9, NOW(), NOW()),
('item_030', 'cat_006', 'Trophy', 'trophy', 'Extra special stout', NULL, 200000, true, false, 10, NOW(), NOW()),
('item_031', 'cat_006', 'Life Continental', 'life-continental', 'Light and refreshing lager', NULL, 200000, true, false, 11, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- WINES (Add to existing Drinks category)
-- ============================================
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_032', 'cat_006', 'Carlo Rossi Red', 'carlo-rossi-red', 'Sweet red wine', NULL, NULL, true, false, 12, NOW(), NOW()),
('item_033', 'cat_006', 'Carlo Rossi White', 'carlo-rossi-white', 'Crisp white wine', NULL, NULL, true, false, 13, NOW(), NOW()),
('item_034', 'cat_006', 'Four Cousins', 'four-cousins', 'Fruity sweet wine', NULL, 350000, true, false, 14, NOW(), NOW()),
('item_035', 'cat_006', 'Baron Romero', 'baron-romero', 'Spanish red wine', NULL, 400000, true, false, 15, NOW(), NOW()),
('item_036', 'cat_006', 'Eva Wine', 'eva-wine', 'Sweet sparkling wine', NULL, 250000, true, false, 16, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Wine Variants (Carlo Rossi)
INSERT INTO menu_variants (id, menu_item_id, name, slug, price, available, sort_order, created_at, updated_at) VALUES
('var_050', 'item_032', 'Small (Glass)', 'small-glass', 150000, true, 1, NOW(), NOW()),
('var_051', 'item_032', 'Large (Bottle)', 'large-bottle', 400000, true, 2, NOW(), NOW()),
('var_052', 'item_033', 'Small (Glass)', 'small-glass', 150000, true, 1, NOW(), NOW()),
('var_053', 'item_033', 'Large (Bottle)', 'large-bottle', 400000, true, 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- GRILLS
-- ============================================
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_037', 'cat_007', 'Grilled Whole Chicken', 'grilled-whole-chicken', 'Perfectly grilled whole chicken', NULL, 800000, true, true, 1, NOW(), NOW()),
('item_038', 'cat_007', 'BBQ Ribs', 'bbq-ribs', 'Tender BBQ pork ribs', NULL, 650000, true, false, 2, NOW(), NOW()),
('item_039', 'cat_007', 'Grilled Fish', 'grilled-fish', 'Fresh grilled tilapia or catfish', NULL, 500000, true, false, 3, NOW(), NOW()),
('item_040', 'cat_007', 'Suya Platter', 'suya-platter', 'Spicy grilled beef suya', NULL, 400000, true, false, 4, NOW(), NOW()),
('item_041', 'cat_007', 'Mixed Grill Platter', 'mixed-grill-platter', 'Chicken, beef, and sausage', NULL, 1200000, true, true, 5, NOW(), NOW()),
('item_042', 'cat_007', 'Grilled Prawns', 'grilled-prawns', 'Jumbo prawns with garlic butter', NULL, 750000, true, false, 6, NOW(), NOW()),
('item_043', 'cat_007', 'Asun (Spicy Goat Meat)', 'asun', 'Spicy grilled goat meat', NULL, 550000, true, false, 7, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- COCKTAILS
-- ============================================
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_044', 'cat_008', 'Chapman', 'chapman-cocktail', 'Classic Nigerian cocktail mix', NULL, 250000, true, true, 1, NOW(), NOW()),
('item_045', 'cat_008', 'Pina Colada', 'pina-colada', 'Rum, coconut cream, and pineapple', NULL, 350000, true, false, 2, NOW(), NOW()),
('item_046', 'cat_008', 'Mojito', 'mojito', 'Rum, mint, lime, and soda', NULL, 300000, true, false, 3, NOW(), NOW()),
('item_047', 'cat_008', 'Sex on the Beach', 'sex-on-the-beach', 'Vodka, peach schnapps, and fruit juices', NULL, 350000, true, false, 4, NOW(), NOW()),
('item_048', 'cat_008', 'Mai Tai', 'mai-tai', 'Rum and tropical fruit blend', NULL, 350000, true, false, 5, NOW(), NOW()),
('item_049', 'cat_008', 'Margarita', 'margarita', 'Tequila, lime, and triple sec', NULL, 350000, true, false, 6, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- MOCKTAILS
-- ============================================
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_050', 'cat_009', 'Virgin Mojito', 'virgin-mojito', 'Refreshing mint and lime mocktail', NULL, 200000, true, true, 1, NOW(), NOW()),
('item_051', 'cat_009', 'Fruit Punch', 'fruit-punch', 'Mixed tropical fruit blend', NULL, 180000, true, false, 2, NOW(), NOW()),
('item_052', 'cat_009', 'Fresh Squeeze', 'fresh-squeeze', 'Fresh orange or pineapple juice', NULL, 250000, true, false, 3, NOW(), NOW()),
('item_053', 'cat_009', 'Berry Blast', 'berry-blast', 'Mixed berries smoothie', NULL, 220000, true, false, 4, NOW(), NOW()),
('item_054', 'cat_009', 'Tropical Paradise', 'tropical-paradise', 'Mango, passion fruit, and coconut', NULL, 250000, true, false, 5, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEAS
-- ============================================
INSERT INTO menu_items (id, category_id, name, slug, description, image, base_price, available, featured, sort_order, created_at, updated_at) VALUES
('item_055', 'cat_010', 'Lipton Hot Tea', 'lipton-hot-tea', 'Classic hot tea', NULL, 50000, true, false, 1, NOW(), NOW()),
('item_056', 'cat_010', 'Green Tea', 'green-tea', 'Antioxidant-rich green tea', NULL, 80000, true, false, 2, NOW(), NOW()),
('item_057', 'cat_010', 'Herbal Tea', 'herbal-tea', 'Soothing herbal infusion', NULL, 100000, true, false, 3, NOW(), NOW()),
('item_058', 'cat_010', 'Iced Tea', 'iced-tea', 'Refreshing cold brewed tea', NULL, 120000, true, false, 4, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify new items
SELECT 'New menu items added successfully!' as status;
SELECT name, COUNT(*) as item_count FROM menu_categories 
GROUP BY name 
ORDER BY name;
