# 🗄️ Supabase Setup Guide for MellowDaze

## Quick Setup Steps

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `mellowdaze-backend` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for project initialization (2-3 minutes)

### 2. Get Your Credentials
Once your project is ready:

1. **Go to Settings → API**
2. Copy these values:

   ```bash
   # From "Project URL"
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   
   # From "Project API keys" → "anon public"
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # From "Project API keys" → "service_role" (⚠️ Keep secret!)
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. Update Your .env.local
Replace the placeholder values in `/project/workspace/.env.local`:

```bash
# Replace these three lines with your actual values:
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Set Up Database Schema
After updating your environment variables, run the database migrations:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref YOUR_PROJECT_ID

# Run migrations to set up your database schema
supabase db push
```

**Alternative method** (if CLI setup is complex):
1. Go to your Supabase dashboard
2. Navigate to "SQL Editor"
3. Copy and paste the contents of each file in order:
   - `/project/workspace/supabase/migrations/001_initial_schema.sql`
   - `/project/workspace/supabase/migrations/002_rls_policies.sql`
   - `/project/workspace/supabase/migrations/003_sample_data.sql`
4. Run each query

## 🔐 Security Notes

- **Never commit** your `service_role` key to git
- The `anon` key is safe for frontend use
- The `service_role` key has admin privileges - keep it secret
- Consider using environment variables in production (Vercel secrets)

## 🧪 Testing Your Setup

After configuration, test your backend:

```bash
# Start your development server
npm run dev

# Test the health endpoint (should return JSON, not HTML error)
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","timestamp":"2025-07-02T...","database":"connected"}
```

## 🚀 Next Steps After Supabase Setup

1. **Test API endpoints** to ensure they're working
2. **Create a test user** via the registration endpoint
3. **Add some sample products** via the admin endpoints
4. **Test the complete flow** (auth → products → cart → orders)

## 📊 Verifying Database Setup

Check your Supabase dashboard:
- **Table Editor**: Should show tables: users, products, orders, cart, wishlist, blog_posts
- **Authentication**: Should be enabled with email/password
- **API**: Should show your project URL and keys

## 🆘 Troubleshooting

**Common Issues:**
1. **"supabaseUrl is required"** → Check environment variable names match exactly
2. **"Invalid API key"** → Verify you copied the correct anon/service keys
3. **Database connection errors** → Ensure migrations were run successfully
4. **CORS errors** → Check your project URL is correct (include https://)

**Need Help?**
- Check the Supabase docs: https://supabase.com/docs
- Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
- Check Supabase dashboard logs for database errors

---

**Once Supabase is configured, your MellowDaze backend will be fully operational!** 🎉
