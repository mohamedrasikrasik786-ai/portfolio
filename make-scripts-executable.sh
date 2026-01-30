#!/bin/bash

# ============================================
# MAKE DEPLOYMENT SCRIPTS EXECUTABLE
# Run this once after cloning the project
# ============================================

echo ""
echo "🔧 Making deployment scripts executable..."
echo ""

chmod +x deploy.sh
chmod +x deploy-check.sh
chmod +x deploy-to-vercel.sh
chmod +x deploy-to-netlify.sh
chmod +x make-scripts-executable.sh

echo "✅ All scripts are now executable!"
echo ""
echo "You can now run:"
echo "  ./deploy.sh              - Interactive deployment"
echo "  ./deploy-check.sh        - Check deployment readiness"
echo "  ./deploy-to-vercel.sh    - Deploy to Vercel"
echo "  ./deploy-to-netlify.sh   - Deploy to Netlify"
echo ""
