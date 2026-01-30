#!/bin/bash

# ============================================
# DEPLOYMENT READINESS CHECK SCRIPT
# Digital Flux Portfolio
# ============================================

set -e

echo ""
echo "🚀 =========================================="
echo "   DEPLOYMENT READINESS CHECK"
echo "   Digital Flux Portfolio"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0
WARNINGS=0

# ============================================
# 1. CHECK ENVIRONMENT FILES
# ============================================
echo -e "${BLUE}📋 Checking Environment Configuration...${NC}"

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example found${NC}"
else
    echo -e "${RED}❌ .env.example missing${NC}"
    ISSUES=$((ISSUES+1))
fi

if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file found (ensure it's in .gitignore)${NC}"
    WARNINGS=$((WARNINGS+1))
else
    echo -e "${YELLOW}⚠️  .env file not found (required for deployment)${NC}"
    echo "   Run: cp .env.example .env"
    WARNINGS=$((WARNINGS+1))
fi

if [ -f ".gitignore" ]; then
    if grep -q ".env" .gitignore; then
        echo -e "${GREEN}✅ .gitignore includes .env${NC}"
    else
        echo -e "${RED}❌ .env not in .gitignore${NC}"
        ISSUES=$((ISSUES+1))
    fi
else
    echo -e "${RED}❌ .gitignore missing${NC}"
    ISSUES=$((ISSUES+1))
fi

echo ""

# ============================================
# 2. CHECK REQUIRED FILES
# ============================================
echo -e "${BLUE}📁 Checking Required Files...${NC}"

REQUIRED_FILES=(
    "package.json"
    "src/app/App.tsx"
    "src/config/firebase.ts"
    "src/config/cloudinary.ts"
    "public/sitemap.xml"
    "public/robots.txt"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        ISSUES=$((ISSUES+1))
    fi
done

echo ""

# ============================================
# 3. CHECK DEPENDENCIES
# ============================================
echo -e "${BLUE}📦 Checking Dependencies...${NC}"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules installed${NC}"
else
    echo -e "${RED}❌ node_modules missing - run: npm install${NC}"
    ISSUES=$((ISSUES+1))
fi

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not installed${NC}"
    ISSUES=$((ISSUES+1))
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not installed${NC}"
    ISSUES=$((ISSUES+1))
fi

echo ""

# ============================================
# 4. CHECK BUILD CAPABILITY
# ============================================
echo -e "${BLUE}🔨 Checking Build Configuration...${NC}"

if grep -q "\"build\"" package.json; then
    echo -e "${GREEN}✅ Build script configured${NC}"
else
    echo -e "${RED}❌ Build script missing in package.json${NC}"
    ISSUES=$((ISSUES+1))
fi

if grep -q "\"preview\"" package.json; then
    echo -e "${GREEN}✅ Preview script configured${NC}"
else
    echo -e "${YELLOW}⚠️  Preview script recommended${NC}"
    WARNINGS=$((WARNINGS+1))
fi

echo ""

# ============================================
# 5. CHECK KEY COMPONENTS
# ============================================
echo -e "${BLUE}🧩 Checking Key Components...${NC}"

KEY_COMPONENTS=(
    "src/app/components/NotFoundPage.tsx"
    "src/app/components/FirebaseErrorBoundary.tsx"
    "src/app/components/SEO.tsx"
    "src/contexts/ThemeContext.tsx"
    "src/contexts/NotificationContext.tsx"
)

for component in "${KEY_COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo -e "${GREEN}✅ $(basename $component)${NC}"
    else
        echo -e "${RED}❌ $(basename $component) missing${NC}"
        ISSUES=$((ISSUES+1))
    fi
done

echo ""

# ============================================
# 6. SECURITY CHECKS
# ============================================
echo -e "${BLUE}🔒 Security Checks...${NC}"

# Check if API secrets are in the code
if grep -r "CLOUDINARY_API_SECRET" src/config/cloudinary.ts &> /dev/null; then
    echo -e "${YELLOW}⚠️  Cloudinary API Secret in client code${NC}"
    echo "   Recommendation: Move to backend function"
    WARNINGS=$((WARNINGS+1))
fi

# Check for hardcoded credentials (basic check)
if grep -r "password.*=.*\"" src/ --include="*.tsx" --include="*.ts" | grep -v "password:" | grep -v "Password" | grep -v "// " &> /dev/null; then
    echo -e "${YELLOW}⚠️  Possible hardcoded credentials found${NC}"
    WARNINGS=$((WARNINGS+1))
else
    echo -e "${GREEN}✅ No obvious hardcoded credentials${NC}"
fi

echo ""

# ============================================
# 7. DOCUMENTATION CHECK
# ============================================
echo -e "${BLUE}📚 Documentation Check...${NC}"

DOCS=(
    "README.md"
    "DEPLOYMENT_READY.md"
    "PRODUCTION_CHECKLIST.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅ $doc${NC}"
    else
        echo -e "${YELLOW}⚠️  $doc missing${NC}"
        WARNINGS=$((WARNINGS+1))
    fi
done

echo ""

# ============================================
# 8. SUMMARY
# ============================================
echo "=========================================="
echo -e "${BLUE}📊 SUMMARY${NC}"
echo "=========================================="
echo ""

if [ $ISSUES -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED!${NC}"
    echo ""
    echo "🚀 Your project is READY FOR DEPLOYMENT!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm run build"
    echo "  2. Test: npm run preview"
    echo "  3. Deploy to your chosen platform"
    echo ""
    exit 0
elif [ $ISSUES -eq 0 ]; then
    echo -e "${YELLOW}⚠️  ${WARNINGS} WARNING(S) FOUND${NC}"
    echo ""
    echo "Your project can be deployed, but consider addressing warnings."
    echo ""
    exit 0
else
    echo -e "${RED}❌ ${ISSUES} CRITICAL ISSUE(S) FOUND${NC}"
    echo -e "${YELLOW}⚠️  ${WARNINGS} WARNING(S) FOUND${NC}"
    echo ""
    echo "Please fix critical issues before deploying."
    echo ""
    exit 1
fi
