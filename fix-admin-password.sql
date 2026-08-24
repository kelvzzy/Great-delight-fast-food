-- Fix Admin Password
-- Run this in Supabase SQL Editor

UPDATE users 
SET password_hash = '$2a$12$JAc7RLe3dvrMBgulcQKBbOFPqUBsJHIE.Pu5zf8VuEQ/y3NA2wXj2'
WHERE email = 'admin@greatdelight.com';

-- Verify
SELECT email, first_name, last_name, role 
FROM users 
WHERE email = 'admin@greatdelight.com';
