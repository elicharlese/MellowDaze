-- Insert sample products
INSERT INTO products (handle, title, description, description_html, price, category, tags, featured, inventory_quantity, images, features) VALUES
  (
    'premium-hammock-1',
    'Premium Relaxation Hammock',
    'Experience ultimate comfort with our premium hammock featuring easy access steps, integrated shade cover, and built-in storage.',
    '<p>Experience ultimate comfort with our premium hammock featuring:</p><ul><li>Easy access steps for safe entry</li><li>Integrated shade cover</li><li>Built-in storage compartments</li><li>Weather-resistant materials</li></ul>',
    299.99,
    'hammocks',
    '{"premium", "comfort", "outdoor"}',
    true,
    25,
    '{"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}',
    '{"steps", "shade", "storage", "weather-resistant"}'
  ),
  (
    'deluxe-hammock-stand',
    'Deluxe Hammock Stand',
    'Heavy-duty steel construction hammock stand that supports up to 450 lbs. No trees required!',
    '<p>Our deluxe hammock stand features:</p><ul><li>Heavy-duty steel construction</li><li>Supports up to 450 lbs</li><li>Weather-resistant coating</li><li>Easy assembly</li><li>Adjustable chain for different hammock sizes</li></ul>',
    149.99,
    'accessories',
    '{"stand", "steel", "heavy-duty"}',
    true,
    15,
    '{"https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800"}',
    '{"heavy-duty", "weather-resistant"}'
  ),
  (
    'portable-shade-cover',
    'Portable Shade Cover',
    'Lightweight and portable shade cover that attaches to any hammock for sun protection.',
    '<p>Stay cool and protected with our portable shade cover:</p><ul><li>UV protection rated 50+</li><li>Lightweight and portable</li><li>Easy attachment system</li><li>Water-resistant fabric</li><li>Available in multiple colors</li></ul>',
    79.99,
    'shade-covers',
    '{"shade", "portable", "UV-protection"}',
    false,
    30,
    '{"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}',
    '{"shade", "portable", "weather-resistant"}'
  ),
  (
    'hammock-storage-bag',
    'Hammock Storage Bag',
    'Organize your hammock setup with our weather-resistant storage bag featuring multiple compartments.',
    '<p>Keep your hammock accessories organized:</p><ul><li>Multiple storage compartments</li><li>Weather-resistant materials</li><li>Attached to hammock frame</li><li>Easy access design</li><li>Holds drinks, books, and personal items</li></ul>',
    39.99,
    'storage-solutions',
    '{"storage", "organization", "accessories"}',
    false,
    50,
    '{"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"}',
    '{"storage", "weather-resistant"}'
  ),
  (
    'family-size-hammock',
    'Family Size Hammock',
    'Extra-wide hammock perfect for families or couples, featuring reinforced construction and premium comfort.',
    '<p>Perfect for sharing relaxation time:</p><ul><li>Extra-wide design fits 2-3 people</li><li>Reinforced construction for safety</li><li>Premium comfort materials</li><li>Integrated cup holders</li><li>Easy access steps on both sides</li></ul>',
    399.99,
    'hammocks',
    '{"family", "extra-wide", "premium"}',
    true,
    12,
    '{"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"}',
    '{"steps", "storage", "extra-wide"}'
  ),
  (
    'cooling-hammock-pad',
    'Cooling Hammock Pad',
    'Revolutionary cooling pad that keeps you comfortable even on hot summer days.',
    '<p>Beat the heat with our innovative cooling technology:</p><ul><li>Advanced cooling gel technology</li><li>Breathable mesh construction</li><li>Machine washable cover</li><li>Fits most standard hammocks</li><li>Provides hours of cooling comfort</li></ul>',
    89.99,
    'accessories',
    '{"cooling", "comfort", "summer"}',
    false,
    20,
    '{"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"}',
    '{"cooling", "comfort"}'
  );

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, author, published, featured_image, tags) VALUES
  (
    'The Ultimate Guide to Hammock Relaxation',
    'ultimate-guide-hammock-relaxation',
    '<p>Discover the art of true relaxation with our comprehensive guide to hammock living. From choosing the perfect spot to maximizing comfort, we''ll help you create your own outdoor oasis.</p><p>Hammocks have been used for centuries as a way to rest and relax. Today''s modern hammocks offer incredible comfort and convenience features that make them perfect for any outdoor space.</p><h2>Choosing the Right Location</h2><p>The key to hammock enjoyment starts with location. Look for a spot that offers:</p><ul><li>Adequate shade during peak sun hours</li><li>Good airflow for natural cooling</li><li>Level ground for stability</li><li>Beautiful views to enhance relaxation</li></ul>',
    'Discover the art of true relaxation with our comprehensive guide to hammock living.',
    'Sarah Johnson',
    true,
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    '{"relaxation", "outdoor", "lifestyle"}'
  ),
  (
    'Setting Up Your Perfect Backyard Oasis',
    'perfect-backyard-oasis',
    '<p>Transform your backyard into a relaxation paradise with these expert tips and tricks. Whether you have a small patio or a large yard, you can create the perfect outdoor retreat.</p><p>Your backyard should be a sanctuary where you can escape the stresses of daily life. With the right planning and equipment, you can create an outdoor space that rivals any expensive resort.</p><h2>Essential Elements</h2><p>Every great backyard oasis includes:</p><ul><li>Comfortable seating or lounging area</li><li>Adequate shade and weather protection</li><li>Convenient storage for outdoor essentials</li><li>Easy access to refreshments</li><li>Beautiful landscaping or decor</li></ul>',
    'Transform your backyard into a relaxation paradise with these expert tips.',
    'Mike Chen',
    true,
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    '{"backyard", "outdoor", "design"}'
  );

-- Create an admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
  (
    'admin@example.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewFE4P8YQFO3H7EG', -- bcrypt hash of 'admin123'
    'Admin',
    'User'
  );
