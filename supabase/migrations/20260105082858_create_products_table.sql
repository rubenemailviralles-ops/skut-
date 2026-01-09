/*
  # Create Products Table for SKUT E-commerce

  ## Overview
  This migration creates the core database schema for the SKUT e-commerce platform,
  which specializes in rave and techno-culture apparel.

  ## New Tables
  
  ### products
  Main product catalog table storing all apparel items
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, required) - Product name
  - `description` (text) - Detailed product description
  - `category` (text, required) - Product category (hats, shades, shirts, tops, pants, bags, socks)
  - `gender` (text, required) - Target gender (male, female, unisex)
  - `price` (decimal, required) - Product price in USD
  - `image_url` (text) - URL to product image
  - `theme` (text) - Associated theme (industrial, psytrance, detroit, all)
  - `stock_quantity` (integer, default 0) - Available inventory
  - `featured` (boolean, default false) - Whether product is featured
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable Row Level Security (RLS) on products table
  - Public read access for all users to browse products
  - Authenticated admin access for product management (future implementation)

  ## Indexes
  - Index on category for efficient filtering
  - Index on gender for efficient filtering
  - Index on theme for efficient filtering
  - Index on featured products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('hats', 'shades', 'shirts', 'tops', 'pants', 'bags', 'socks')),
  gender text NOT NULL CHECK (gender IN ('male', 'female', 'unisex')),
  price decimal(10, 2) NOT NULL CHECK (price >= 0),
  image_url text,
  theme text CHECK (theme IN ('industrial', 'psytrance', 'detroit', 'all')),
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender ON products(gender);
CREATE INDEX IF NOT EXISTS idx_products_theme ON products(theme);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
