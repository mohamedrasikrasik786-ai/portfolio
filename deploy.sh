#!/bin/bash

# ============================================
# MASTER DEPLOYMENT SCRIPT
# Digital Flux Portfolio
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo ""
echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                        ║${NC}"
echo -e "${CYAN}║     🚀 DIGITAL FLUX DEPLOYMENT 🚀     ║${NC}"
echo -e "${CYAN}║                                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

# ============================================
# 1. PRE-DEPLOYMENT CHECK
# ============================================
echo -e "${BLUE}📋 Running deployment readiness check...${NC}"
echo ""

# Check for required files
REQUIRED_FILES=("package.json" "src/app/App.tsx" ".env.example" ".gitignore")
ALL_OK=true

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        ALL_OK=false
    fi
done

if [ "$ALL_OK" = false ]; then
    echo ""
    echo -e "${RED}❌ Missing required files. Cannot proceed.${NC}"
    exit 1
fi

# Check node_modules
if [ ! -d "node_modules" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Dependencies not installed.${NC}"
    read -p "Install now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install
        echo -e "${GREEN}✅ Dependencies installed${NC}"
    else
        echo -e "${RED}❌ Cannot proceed without dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Dependencies installed${NC}"
fi

echo ""

# ============================================
# 2. CHOOSE DEPLOYMENT PLATFORM
# ============================================
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${BLUE}Choose your deployment platform:${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo "  1) Vercel (Recommended ⭐)"
echo "  2) Netlify"
echo "  3) Test Build Only (no deploy)"
echo "  4) Run Deployment Readiness Check"
echo "  5) Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
        echo ""
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}Installing Vercel CLI...${NC}"
            npm install -g vercel
        fi
        
        # Build
        echo -e "${BLUE}Building project...${NC}"
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✅ Build successful!${NC}"
            echo ""
            echo -e "${BLUE}Deploying to Vercel...${NC}"
            vercel --prod
            
            echo ""
            echo -e "${GREEN}════════════════════════════════════════${NC}"
            echo -e "${GREEN}✅ DEPLOYED TO VERCEL!${NC}"
            echo -e "${GREEN}════════════════════════════════════════${NC}"
        else
            echo -e "${RED}❌ Build failed${NC}"
            exit 1
        fi
        ;;
        
    2)
        echo ""
        echo -e "${BLUE}🚀 Deploying to Netlify...${NC}"
        echo ""
        
        # Check if netlify is installed
        if ! command -v netlify &> /dev/null; then
            echo -e "${YELLOW}Installing Netlify CLI...${NC}"
            npm install -g netlify-cli
        fi
        
        # Build
        echo -e "${BLUE}Building project...${NC}"
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✅ Build successful!${NC}"
            echo ""
            echo -e "${BLUE}Deploying to Netlify...${NC}"
            netlify deploy --prod
            
            echo ""
            echo -e "${GREEN}════════════════════════════════════════${NC}"
            echo -e "${GREEN}✅ DEPLOYED TO NETLIFY!${NC}"
            echo -e "${GREEN}════════════════════════════════════════${NC}"
        else
            echo -e "${RED}❌ Build failed${NC}"
            exit 1
        fi
        ;;
        
    3)
        echo ""
        echo -e "${BLUE}🔨 Building project...${NC}"
        npm run build
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✅ Build successful!${NC}"
            echo ""
            echo -e "${BLUE}Starting preview server...${NC}"
            echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
            echo ""
            npm run preview
        else
            echo -e "${RED}❌ Build failed${NC}"
            exit 1
        fi
        ;;
        
    4)
        echo ""
        if [ -f "deploy-check.sh" ]; then
            chmod +x deploy-check.sh
            ./deploy-check.sh
        else
            echo -e "${RED}❌ deploy-check.sh not found${NC}"
            exit 1
        fi
        ;;
        
    5)
        echo ""
        echo -e "${BLUE}Goodbye! 👋${NC}"
        echo ""
        exit 0
        ;;
        
    *)
        echo ""
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

# ============================================
# 3. POST-DEPLOYMENT REMINDERS
# ============================================
echo ""
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo -e "${YELLOW}⚠️  IMPORTANT POST-DEPLOYMENT STEPS${NC}"
echo -e "${CYAN}════════════════════════════════════════${NC}"
echo ""
echo "1. ⚙️  Add environment variables to your hosting platform"
echo "   (See .env.example for required variables)"
echo ""
echo "2. 🔒 Configure Firebase Security Rules"
echo "   https://console.firebase.google.com"
echo ""
echo "3. 🔑 Change admin password from default 'admin123'"
echo "   Firebase Console → Authentication → Users"
echo ""
echo "4. ✅ Test your deployed site:"
echo "   - Homepage loads"
echo "   - Case studies work"
echo "   - Admin panel accessible (Shift + A)"
echo "   - Images display correctly"
echo ""
echo -e "${BLUE}📖 Full checklist: DEPLOYMENT_READY.md${NC}"
echo ""
echo -e "${GREEN}🎉 Congratulations on your deployment!${NC}"
echo ""
