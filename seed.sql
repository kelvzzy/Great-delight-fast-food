-- GREAT DELIGHT Database Seed
-- Run this in Supabase SQL Editor after running setup.sql

-- Generate UUID function helper
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Restaurant
INSERT INTO restaurants (id, name, slug, description, active, created_at, updated_at)
VALUES (
  'cm0restaurant001',
  'GREAT DELIGHT',
  'great-delight',
  'Premium Nigerian Restaurant - Great Food, Great Experience',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 2. Create Main Branch
INSERT INTO branches (id, restaurant_id, name, slug, address, phone, active, created_at, updated_at)
VALUES (
  'cm0branch001',
  'cm0restaurant001',
  'Main Branch',
  'main',
  'Lagos, Nigeria',
  '+234-XXX-XXX-XXXX',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 3. Create 20 Tables
INSERT INTO tables (id, branch_id, name, slug, active, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0branch001', 'TABLE 01', 'table-01', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 02', 'table-02', true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 03', 'table-03', true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 04', 'table-04', true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 05', 'table-05', true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 06', 'table-06', true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 07', 'table-07', true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 08', 'table-08', true, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 09', 'table-09', true, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 10', 'table-10', true, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 11', 'table-11', true, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 12', 'table-12', true, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 13', 'table-13', true, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 14', 'table-14', true, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 15', 'table-15', true, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 16', 'table-16', true, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 17', 'table-17', true, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 18', 'table-18', true, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 19', 'table-19', true, 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0branch001', 'TABLE 20', 'table-20', true, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4. Create Admin User (password: admin123, hashed with bcrypt)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, restaurant_id, branch_id, active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@greatdelight.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5oeYCJuWqiUZK',
  'Admin',
  'User',
  'RESTAURANT_ADMIN',
  'cm0restaurant001',
  'cm0branch001',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 5. Create Menu Categories
INSERT INTO menu_categories (id, branch_id, name, slug, description, active, sort_order, created_at, updated_at)
VALUES
  ('cm0cat001', 'cm0branch001', 'Soups', 'soups', 'Traditional Nigerian soups with your choice of swallow', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0cat002', 'cm0branch001', 'Rice & Combos', 'rice-and-combos', 'Delicious rice dishes with protein', true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0cat003', 'cm0branch001', 'Quick Meals', 'quick-meals', 'Fast and satisfying meals', true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0cat004', 'cm0branch001', 'Pepper Soup', 'pepper-soup', 'Hot and spicy Nigerian pepper soup', true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0cat005', 'cm0branch001', 'Proteins', 'proteins', 'Extra protein sides', true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 6. Create Menu Items - SOUPS
INSERT INTO menu_items (id, category_id, name, slug, description, base_price, active, available, sort_order, created_at, updated_at)
VALUES
  ('cm0item001', 'cm0cat001', 'White Soup', 'white-soup', 'Traditional white soup with your choice of swallow', NULL, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item002', 'cm0cat001', 'Chicken Breast White Soup', 'chicken-breast-white-soup', 'White soup with chicken breast and your choice of swallow', 1000000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item003', 'cm0cat001', 'Ogbono Soup', 'ogbono-soup', 'Draw soup with protein and swallow options', NULL, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item004', 'cm0cat001', 'Okra Soup', 'okra-soup', 'Fresh okra soup with protein and swallow options', NULL, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item005', 'cm0cat001', 'Afang Soup', 'afang-soup', 'Rich vegetable soup with protein and swallow', NULL, true, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item006', 'cm0cat001', 'Oha Soup / Butter Leaf', 'oha-soup-butter-leaf', 'Traditional Oha soup with protein and swallow', NULL, true, true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item007', 'cm0cat001', 'Vegetable Soup', 'vegetable-soup', 'Fresh vegetable soup with protein and swallow', NULL, true, true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item008', 'cm0cat001', 'Ewedu Soup Mixed With Gbegiri', 'ewedu-soup-mixed-with-gbegiri', 'Yoruba delicacy with Amala', NULL, true, true, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- White Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item001', '2 wraps Semo', 700000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item001', '2 wraps Garri', 700000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item001', '2 wraps Fufu', 700000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item001', '2 wraps Pounded Yam', 800000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Chicken Breast White Soup Options (Swallow choices)
INSERT INTO menu_options (id, menu_item_id, name, required, sort_order, created_at, updated_at)
VALUES ('cm0opt001', 'cm0item002', 'Swallow', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO menu_option_values (id, option_id, name, price_modifier, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0opt001', 'Garri', 0, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0opt001', 'Fufu', 0, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0opt001', 'Semo', 0, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0opt001', 'Pounded Yam', 0, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Ogbono Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item003', 'Beef + Standard Swallow (Fufu/Semo/Garri)', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item003', 'Goat Meat + Standard Swallow (Fufu/Semo/Garri)', 450000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item003', 'Beef + 2 wraps Pounded Yam', 500000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item003', 'Goat Meat + 2 wraps Pounded Yam', 550000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Okra Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item004', 'Beef + Standard Swallow (Fufu/Garri/Semo)', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item004', 'Goat Meat + Standard Swallow (Fufu/Garri/Semo)', 450000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item004', 'Beef + Pounded Yam', 500000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item004', 'Goat Meat + Pounded Yam', 550000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Afang Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item005', 'Beef + Standard Swallow (Fufu/Garri/Semo)', 750000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item005', 'Goat Meat + Standard Swallow (Fufu/Garri/Semo)', 850000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item005', 'Beef + Pounded Yam', 850000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item005', 'Goat Meat + Pounded Yam', 950000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Oha Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item006', 'Beef + Standard Swallow (Semo/Fufu/Garri)', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item006', 'Goat Meat + Standard Swallow (Semo/Fufu/Garri)', 450000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item006', 'Beef + 2 wraps Pounded Yam', 500000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item006', 'Goat Meat + 2 wraps Pounded Yam', 550000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Vegetable Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item007', 'Beef + Standard Swallow (Fufu/Semo/Garri)', 450000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item007', 'Goat Meat + Standard Swallow (Fufu/Semo/Garri)', 500000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item007', 'Beef + Pounded Yam', 550000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item007', 'Goat Meat + Pounded Yam', 600000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Ewedu Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item008', 'Beef + 2 wraps Amala', 300000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item008', 'Goat Meat + 2 wraps Amala', 350000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 7. Create Menu Items - RICE & COMBOS
INSERT INTO menu_items (id, category_id, name, slug, description, base_price, active, available, sort_order, created_at, updated_at)
VALUES
  ('cm0item009', 'cm0cat002', 'Jollof Rice', 'jollof-rice', 'Classic Nigerian jollof rice with protein', NULL, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item010', 'cm0cat002', 'Fried Rice', 'fried-rice', 'Delicious fried rice with protein', NULL, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item011', 'cm0cat002', 'Fried Rice Full Combo', 'fried-rice-full-combo', 'Fried Rice + Chicken + Coleslaw', 700000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item012', 'cm0cat002', 'White Rice & Stew', 'white-rice-and-stew', 'White rice with stew and protein', NULL, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item013', 'cm0cat002', 'White Rice Full Combo', 'white-rice-full-combo', 'White Rice + Chicken Sauce + Coleslaw', 1000000, true, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item014', 'cm0cat002', 'White Rice Mini Combo', 'white-rice-mini-combo', 'White Rice + Chicken Sauce', 850000, true, true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item015', 'cm0cat002', 'Red Oil Rice', 'red-oil-rice', 'Local rice cooked in palm oil with fish', NULL, true, true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Jollof Rice Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item009', 'Beef Full Combo', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item009', 'Beef Mini Combo', 300000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item009', 'Goat Meat Full Combo', 450000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item009', 'Goat Meat Mini Combo', 350000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Fried Rice Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item010', 'Beef', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item010', 'Chicken', 550000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item010', 'Goat Meat', 450000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- White Rice & Stew Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item012', 'White Rice + Stew + Beef', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item012', 'White Rice + Stew + Goat Meat', 450000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Red Oil Rice Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item015', 'Red Oil Rice + 1 Dried Catfish', 800000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item015', 'Red Oil Rice + 1 Full Fresh Titus Fish', 900000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 8. Create Menu Items - QUICK MEALS
INSERT INTO menu_items (id, category_id, name, slug, description, base_price, active, available, sort_order, created_at, updated_at)
VALUES
  ('cm0item016', 'cm0cat003', 'Yam & Egg Sauce', 'yam-and-egg-sauce', 'Boiled yam with egg sauce', 350000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item017', 'cm0cat003', 'Yam Porridge', 'yam-porridge', 'Delicious yam porridge', 300000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item018', 'cm0cat003', 'Porridge Beans', 'porridge-beans', 'Well-cooked beans porridge', 300000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item019', 'cm0cat003', 'Spaghetti', 'spaghetti', 'Spaghetti with sauce', 350000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item020', 'cm0cat003', 'Noodles', 'noodles', 'Prepared noodles', 350000, true, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item021', 'cm0cat003', 'Moi Moi', 'moi-moi', 'Steamed bean pudding', 100000, true, true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 9. Create Menu Items - PEPPER SOUP
INSERT INTO menu_items (id, category_id, name, slug, description, base_price, active, available, sort_order, created_at, updated_at)
VALUES
  ('cm0item022', 'cm0cat004', 'Assorted Pepper Soup', 'assorted-pepper-soup', 'Goat Meat + Beef Intestine', 750000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item023', 'cm0cat004', 'Goat Meat Pepper Soup', 'goat-meat-pepper-soup', 'Hot goat meat pepper soup', 1000000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cm0item024', 'cm0cat004', 'Catfish Pepper Soup', 'catfish-pepper-soup', 'Fresh catfish pepper soup', NULL, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Catfish Pepper Soup Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item024', 'Full', 1000000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item024', 'Middle Part', 400000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item024', 'Head', 500000, true, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item024', 'Tail', 400000, true, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 10. Create Menu Items - PROTEINS
INSERT INTO menu_items (id, category_id, name, slug, description, base_price, active, available, sort_order, created_at, updated_at)
VALUES
  ('cm0item025', 'cm0cat005', 'Peppered Meat', 'peppered-meat', 'Spicy peppered meat', NULL, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Peppered Meat Variants
INSERT INTO menu_variants (id, menu_item_id, name, price, active, available, sort_order, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'cm0item025', 'Beef', 400000, true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'cm0item025', 'Goat Meat', 500000, true, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Success message
SELECT 'Database seeded successfully!' as message,
       (SELECT COUNT(*) FROM restaurants) as restaurants,
       (SELECT COUNT(*) FROM branches) as branches,
       (SELECT COUNT(*) FROM tables) as tables,
       (SELECT COUNT(*) FROM users) as users,
       (SELECT COUNT(*) FROM menu_categories) as categories,
       (SELECT COUNT(*) FROM menu_items) as menu_items,
       (SELECT COUNT(*) FROM menu_variants) as menu_variants;
