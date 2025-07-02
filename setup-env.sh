#!/bin/bash

# MellowDaze Backend Environment Setup Helper
# This script helps set up the required environment variables

echo "🚀 MellowDaze Backend Environment Setup"
echo "======================================="
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists!"
    echo "Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Aborting setup."
        exit 1
    fi
fi

# Copy from example
echo "📝 Creating .env.local from .env.example..."
cp .env.example .env.local

echo ""
echo "✅ Environment file created!"
echo ""
echo "🔧 NEXT STEPS - You need to configure these variables:"
echo ""
echo "1. 🗄️  SUPABASE SETUP:"
echo "   - Go to https://supabase.com"
echo "   - Create a new project"
echo "   - Get your project URL and API keys"
echo "   - Update these in .env.local:"
echo "     * NEXT_PUBLIC_SUPABASE_URL"
echo "     * NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "     * SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. 🔐 JWT SECRET:"
echo "   - Generate a secure random string"
echo "   - Update JWT_SECRET in .env.local"
echo "   - You can use: openssl rand -base64 32"
echo ""
echo "3. 💳 STRIPE (Optional for payments):"
echo "   - Get Stripe keys from https://stripe.com"
echo "   - Update STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo ""
echo "4. 🔗 SOLANA (Optional for blockchain):"
echo "   - Update SOLANA_RPC_URL and SOLANA_PRIVATE_KEY"
echo ""
echo "📖 For detailed setup instructions, see:"
echo "   - BACKEND_COMPLETE.md"
echo "   - PRODUCTION_READINESS_ASSESSMENT.md"
echo ""
echo "🧪 After configuration, test with:"
echo "   npm run dev"
echo "   curl http://localhost:3000/api/health"
echo ""

# Generate JWT secret suggestion
echo "💡 Suggested JWT_SECRET (copy this):"
if command -v openssl &> /dev/null; then
    openssl rand -base64 32
else
    echo "   Install openssl to generate, or use any 32+ character random string"
fi

echo ""
echo "🎯 Your backend will be fully operational once these are configured!"
