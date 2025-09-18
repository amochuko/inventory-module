CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE inventory.suppliers
ADD COLUMN public_id UUID DEFAULT gen_random_uuid();

UPDATE inventory.suppliers
SET public_id = gen_random_uuid()
WHERE public_id IS NULL; 
