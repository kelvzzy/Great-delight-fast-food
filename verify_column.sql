SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders' 
AND column_name LIKE 'gift%'
ORDER BY column_name;
