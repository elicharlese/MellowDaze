# MellowDaze Backend Documentation

This document provides comprehensive setup and usage instructions for the MellowDaze backend system.

## Architecture Overview

The MellowDaze backend is built using:
- **Next.js 15** with App Router for API routes
- **TypeScript** for type safety
- **Supabase** (PostgreSQL) for database and authentication
- **Zod** for validation
- **Vercel** for deployment
- **Rust Solana SDK** for blockchain integration (future implementation)

## Quick Start

### 1. Environment Setup

Copy the environment variables:
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials and other environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
# ... other variables
```

### 2. Database Setup

Run the Supabase migrations:
```bash
# Apply the initial schema
npx supabase migration apply

# Or manually run the SQL files in supabase/migrations/
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - Get products with filtering/pagination
- `GET /api/products/[handle]` - Get single product
- `GET /api/products/[handle]/related` - Get related products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item
- `DELETE /api/cart/[id]` - Remove cart item

### Wishlist
- `GET /api/wishlist` - Get user's wishlist (auth required)
- `POST /api/wishlist` - Add to wishlist (auth required)
- `DELETE /api/wishlist/[productId]` - Remove from wishlist (auth required)

### Orders
- `GET /api/orders` - Get user's orders (auth required)
- `POST /api/orders` - Create new order (auth required)
- `GET /api/orders/[id]` - Get specific order (auth required)

### Blog
- `GET /api/blog` - Get blog posts with filtering
- `GET /api/blog/[slug]` - Get single blog post

### Contact
- `POST /api/contact` - Submit contact form

## Frontend Integration

### Using the API Client

```typescript
import { apiClient } from '@/lib/api-client'

// Products
const products = await apiClient.getProducts({ category: 'hammocks' })
const product = await apiClient.getProduct('premium-hammock-1')

// Authentication
const loginResult = await apiClient.login({ email, password })
const profile = await apiClient.getProfile()

// Cart
await apiClient.addToCart({ product_id: 'xxx', quantity: 1 })
const cart = await apiClient.getCart()

// Wishlist
await apiClient.addToWishlist({ product_id: 'xxx' })
const wishlist = await apiClient.getWishlist()
```

### Using React Hooks

```typescript
import { useAuth, useCart, useWishlist, useProducts } from '@/hooks'

function MyComponent() {
  const { user, login, logout } = useAuth()
  const { cart, addToCart } = useCart()
  const { wishlist, addToWishlist } = useWishlist()
  const { products, updateFilters } = useProducts()
  
  // Use the data and functions...
}
```

## Database Schema

### Core Tables

#### users
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `created_at`, `updated_at` (Timestamps)

#### products
- `id` (UUID, Primary Key)
- `handle` (VARCHAR, Unique)
- `title` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `category` (VARCHAR)
- `tags` (TEXT[])
- `featured` (BOOLEAN)
- `available` (BOOLEAN)
- `inventory_quantity` (INTEGER)
- `images` (TEXT[])
- `variants` (JSONB)
- `features` (TEXT[])
- `created_at`, `updated_at` (Timestamps)

#### orders
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `status` (ENUM: pending, processing, shipped, delivered, cancelled)
- `total_amount` (DECIMAL)
- `shipping_address` (JSONB)
- `billing_address` (JSONB)
- `payment_status` (ENUM: pending, paid, failed, refunded)
- `payment_method` (VARCHAR)
- `items` (JSONB)
- `created_at`, `updated_at` (Timestamps)

#### cart
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key, Optional)
- `session_id` (VARCHAR, Optional)
- `product_id` (UUID, Foreign Key)
- `variant_id` (VARCHAR, Optional)
- `quantity` (INTEGER)
- `created_at`, `updated_at` (Timestamps)

#### wishlist
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `product_id` (UUID, Foreign Key)
- `created_at` (Timestamp)

#### blog_posts
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `content` (TEXT)
- `excerpt` (TEXT)
- `author` (VARCHAR)
- `published` (BOOLEAN)
- `featured_image` (TEXT)
- `tags` (TEXT[])
- `created_at`, `updated_at` (Timestamps)

## Security Features

### Authentication
- JWT tokens for session management
- Bcrypt password hashing
- Row-level security policies in Supabase

### API Protection
- Request validation with Zod schemas
- Rate limiting middleware
- CORS configuration
- Input sanitization

### Database Security
- Row-level security (RLS) policies
- Foreign key constraints
- Input validation at database level

## Testing

### Backend API Tests

Run the comprehensive test suite:

```typescript
// In browser console or test environment
import { runAllTests } from '@/lib/backend-tests'

// Run all tests
await runAllTests()

// Run individual tests
await testAuth()
await testProducts()
await testCart()
// ... etc
```

### Manual Testing

Use tools like:
- **Postman** or **Insomnia** for API testing
- **Supabase Dashboard** for database inspection
- **Browser DevTools** for frontend integration testing

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Ensure these are set in your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`

### Database Migration

Run migrations in production:
```bash
npx supabase db push
```

## Development Workflow

### Adding New Features

1. **Database Changes**: Create migration files in `supabase/migrations/`
2. **API Routes**: Add new route files in `app/api/`
3. **Validation**: Add schemas to `lib/validations.ts`
4. **Client Integration**: Update `lib/api-client.ts`
5. **React Hooks**: Create hooks in `hooks/` for state management
6. **Testing**: Add tests to `lib/backend-tests.ts`

### Best Practices

- Use TypeScript for all code
- Validate all inputs with Zod
- Handle errors gracefully
- Use React hooks for state management
- Follow REST API conventions
- Write comprehensive tests

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check Next.js API route configuration
2. **Database Connection**: Verify Supabase credentials
3. **Authentication Issues**: Check JWT secret and token handling
4. **Type Errors**: Ensure proper TypeScript types are imported

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

### Monitoring

In production, monitor:
- API response times
- Database query performance
- Error rates
- User authentication flows

## Future Enhancements

### Planned Features

- [ ] Rust Solana integration for blockchain features
- [ ] Real-time subscriptions with Supabase
- [ ] Advanced caching with Redis
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] File upload support
- [ ] Multi-language support

### Scaling Considerations

- Database indexing optimization
- API rate limiting improvements
- CDN integration for static assets
- Database connection pooling
- Background job processing

## Support

For questions or issues:
1. Check this documentation
2. Review the test suite
3. Check the API endpoint responses
4. Verify environment variables
5. Test with the provided test utilities

---

*This documentation is updated as the backend evolves. Keep it current with any changes to the API or database schema.*
