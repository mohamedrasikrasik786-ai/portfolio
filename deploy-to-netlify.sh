#!/bin/bash

# ============================================
# AUTO-DEPLOY TO NETLIFY
# Digital Flux Portfolio
# ============================================

set -e

echo ""
echo "🚀 =========================================="
echo "   DEPLOYING TO NETLIFY"
echo "   Digital Flux Portfolio"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# ============================================
# 1. PRE-FLIGHT CHECKS
# ============================================
echo -e "${BLUE}📋 Running pre-flight checks...${NC}"
echo ""

# Check if netlify is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}⚠️  Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
    echo -e "${GREEN}✅ Netlify CLI installed${NC}"
else
    echo -e "${GREEN}✅ Netlify CLI found${NC}"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencies not installed. Installing...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies OK${NC}"
fi

# Check for .env.example
if [ ! -f ".env.example" ]; then
    echo -e "${RED}❌ .env.example not found${NC}"
    exit 1
else
    echo -e "${GREEN}✅ .env.example found${NC}"
fi

echo ""

# ============================================
# 2. BUILD PROJECT
# ============================================
echo -e "${BLUE}🔨 Building project...${NC}"
echo ""

npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo ""
    echo -e "${RED}❌ Build failed. Please fix errors and try again.${NC}"
    exit 1
fi

echo ""

# ============================================
# 3. DEPLOY TO NETLIFY
# ============================================
echo -e "${BLUE}🚀 Deploying to Netlify...${NC}"
echo ""

netlify deploy --prod

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo -e "✅ DEPLOYMENT SUCCESSFUL!"
    echo -e "==========================================${NC}"
    echo ""
    echo "🎉 Your site is now live!"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Don't forget to:${NC}"
    echo ""
    echo "1. Add environment variables in Netlify:"
    echo "   https://app.netlify.com"
    echo "   Site Settings > Environment Variables"
    echo ""
    echo "2. Configure Firebase Security Rules:"
    echo "   https://console.firebase.google.com"
    echo ""
    echo "3. Change admin password from default 'admin123'"
    echo ""
    echo "4. Test your live site:"
    echo "   - Homepage loads"
    echo "   - Case studies work"
    echo "   - Admin panel accessible (Shift + A)"
    echo "   - Images display"
    echo ""
    echo -e "${GREEN}📖 Read DEPLOYMENT_READY.md for complete checklist${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}=========================================="
    echo -e "❌ DEPLOYMENT FAILED"
    echo -e "==========================================${NC}"
    echo ""
    echo "Please check the error messages above."
    echo ""
    exit 1
fi
