-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Products policies (public read access)
CREATE POLICY "Anyone can view available products" ON products
  FOR SELECT USING (available = true);

-- Admin users can manage products (you'll need to implement admin role checking)
CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND email = 'admin@example.com' -- Replace with your admin email
    )
  );

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Admins can view all orders
CREATE POLICY "Admin can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND email = 'admin@example.com' -- Replace with your admin email
    )
  );

-- Wishlist policies
CREATE POLICY "Users can manage their own wishlist" ON wishlist
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Cart policies
CREATE POLICY "Users can manage their own cart" ON cart
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Anonymous users can manage cart by session_id
CREATE POLICY "Anonymous users can manage cart by session" ON cart
  FOR ALL USING (user_id IS NULL);

-- Blog posts policies (public read access for published posts)
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Admin can manage blog posts
CREATE POLICY "Admin can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND email = 'admin@example.com' -- Replace with your admin email
    )
  );
