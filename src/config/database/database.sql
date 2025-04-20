-- Enable UUID 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schema
CREATE SCHEMA IF NOT EXISTS inventory;

-- User Table
DROP TABLE IF EXISTS inventory.users CASCADE;
CREATE TABLE inventory.users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(10) CHECK (role IN ('admin', 'staff')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 
DROP TABLE IF EXISTS inventory.categories CASCADE;
CREATE TABLE inventory.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT
);

-- Suppliers
DROP TABLE IF EXISTS inventory.suppliers CASCADE;
CREATE TABLE inventory.suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(25) NOT NULL
);

-- 
DROP TABLE IF EXISTS inventory.products CASCADE;
CREATE TABLE inventory.products (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    barcode_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES inventory.categories(id) ON DELETE SET NULL,
    supplier_id INTEGER REFERENCES inventory.suppliers(id) ON DELETE SET NULL,
    cost_price NUMERIC(10, 2) NOT NULL,
    selling_price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    stock_keeping_unit VARCHAR(50) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    CONSTRAINT pk_products_id PRIMARY KEY (id)
);

-- Stock levels
DROP TABLE IF EXISTS inventory.stock_levels CASCADE;
CREATE TABLE inventory.stock_levels (
    id SERIAL PRIMARY KEY,
    product_id UUID UNIQUE REFERENCES inventory.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS inventory.locations CASCADE;
CREATE TABLE inventory.locations (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    manager UUID REFERENCES inventory.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions
DROP TABLE IF EXISTS inventory.transactions CASCADE;
CREATE TABLE inventory.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES inventory.products(id),
    transaction_type VARCHAR(20) CHECK (transaction_type IN (
        'IN', -- Restock, purchase 
        'OUT', -- Sale, consumption
        'RETURN_IN', -- Customer return
        'RETURN_OUT', -- Return to supplier
        'ADJUSTMENT' -- Manula correction
        )) NOT NULL,
    quantity INTEGER NOT NULL,
    cost_price DECIMAL(10, 2), -- IN transactions
    selling_price DECIMAL(10, 2), -- OUT transactions
    profit DECIMAL(10, 2), -- Optionally calculated on OUT

    occurred_at TIMESTAMPTZ DEFAULT NOW(),
    reference TEXT, -- e.g., invoice no., sale ID, etc
    notes TEXT, -- optional remarks
    user_id UUID REFERENCES inventory.users(id),
    location_id INTEGER REFERENCES inventory.locations(id) -- Optional: multi-store setup
);

-- CREATE TABLE inventory.sales (
--     id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     product_id UUID UNIQUE REFERENCES inventory.products(id),
--     total_amount NUMERIC(10, 2),
--     user_id user_id UUID REFERENCES inventory.users(id)
--     occurred_at TIMESTAMPTZ DEFAULT NOW(),
-- );

-- CREATE TABLE inventory.sales_items (
--     sale_id UUID REFERENCES inventory.sales(id),
--     product_id UUID UNIQUE REFERENCES inventory.products(id),
--     quantity INTEGER NOT NULL,
--     cost_price NUMERIC(10, 2) NOT NULL,
--     sell_price NUMERIC(10, 2) NOT NULL,
--     profit NUMERIC(10, 2) NOT NULL,
--     occurred_at TIMESTAMPTZ DEFAULT NOW(),
-- );

-- Stock Audit Log
DROP TABLE IF EXISTS inventory.stock_audit_log CASCADE;
CREATE TABLE inventory.stock_audit_log(
    id SERIAL PRIMARY KEY,
    product_id UUID REFERENCES inventory.products(id),
    change_type VARCHAR(10) CHECK (change_type IN ('IN', 'OUT')),
    reason VARCHAR(255) NOT NULL,
    quantity_change INTEGER,
    resulting_quantity INTEGER,
    change_by UUID REFERENCES inventory.users(id),
    change_at TIMESTAMPTZ DEFAULT NOW(),
    transaction_id UUID REFERENCES inventory.transactions(id)
);

-- Trigger Function
DROP FUNCTION IF EXISTS inventory.update_stock_level CASCADE;
CREATE OR REPLACE FUNCTION inventory.update_stock_level()
RETURNS TRIGGER AS $$
DECLARE
    new_quantity INTEGER;
BEGIN
    IF NEW.transaction_type = 'IN' THEN
        UPDATE inventory.stock_levels
        SET quantity = quantity + NEW.quantity,
            updated_at = NOW()
        WHERE product_id = NEW.product_id;
    ELSIF NEW.transaction_type = 'OUT' THEN
        UPDATE inventory.stock_levels
        SET quantity = quantity - NEW.quantity,
            updated_at = NOW()
        WHERE product_id = NEW.product_id;
    END IF;

    -- Fetch the new stock level
    SELECT quantity INTO new_quantity
    FROM inventory.stock_levels
    WHERE product_id = NEW.product_id;

    -- Insert into audit log
    INSERT INTO inventory.stock_audit_log (
        product_id, change_type, quantity_changed,
        resulting_quantity, change_by, transaction_id
    )
    VALUES (
        NEW.product_id, NEW.transaction_type, NEW.quantity, 
        new_quantity, NEW.user_id, NEW.id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bind trigger to transactions
CREATE TRIGGER trg_update_stock
AFTER INSERT ON inventory.transactions
FOR EACH ROW
EXECUTE FUNCTION inventory.update_stock_level();

-- Optional: Seed some categories
INSERT INTO inventory.categories (name, code, description)
VALUES
    ('Electronics', 'ELE-DEV-GAD', 'Devices and gadgets'),
    ('Stationary', 'STA-OFF-OSS', 'Office and school supplies');

-- Options: Seed a user
INSERT INTO inventory.users (username, first_name, last_name, email, role)
VALUES ('janedoe', 'jane', 'doe', 'admin@example.com', 'admin');
