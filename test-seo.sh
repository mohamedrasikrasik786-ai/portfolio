#!/bin/bash

# SEO Automation Quick Test Script
# Tests if your automated SEO system is working correctly

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Testing SEO Automation System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Generate Sitemap
echo "1️⃣  Testing sitemap generation..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run generate-sitemap
GENERATE_EXIT=$?
echo ""

if [ $GENERATE_EXIT -eq 0 ]; then
    echo "✅ Sitemap generation: PASSED"
else
    echo "❌ Sitemap generation: FAILED"
    exit 1
fi
echo ""

# Test 2: Check File Exists
echo "2️⃣  Checking if sitemap.xml exists..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "public/sitemap.xml" ]; then
    echo "✅ File exists: public/sitemap.xml"
    
    # Count URLs
    URL_COUNT=$(grep -c "<url>" public/sitemap.xml)
    echo "📊 Total URLs in sitemap: $URL_COUNT"
    
    # Count case studies (total - 4 static pages)
    CASE_STUDY_COUNT=$((URL_COUNT - 4))
    if [ $CASE_STUDY_COUNT -lt 0 ]; then
        CASE_STUDY_COUNT=0
    fi
    echo "📁 Case studies found: $CASE_STUDY_COUNT"
    
else
    echo "❌ File not found: public/sitemap.xml"
    exit 1
fi
echo ""

# Test 3: Check robots.txt
echo "3️⃣  Checking robots.txt..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "public/robots.txt" ]; then
    echo "✅ File exists: public/robots.txt"
    
    # Check if it contains sitemap reference
    if grep -q "Sitemap:" public/robots.txt; then
        SITEMAP_URL=$(grep "Sitemap:" public/robots.txt | awk '{print $2}')
        echo "🔗 Sitemap URL: $SITEMAP_URL"
        
        if [[ $SITEMAP_URL == *"yourdomain.com"* ]]; then
            echo "⚠️  WARNING: Update 'yourdomain.com' to your actual domain!"
        else
            echo "✅ Domain configured"
        fi
    else
        echo "❌ No sitemap reference found in robots.txt"
    fi
else
    echo "❌ File not found: public/robots.txt"
fi
echo ""

# Test 4: Validate XML (if xmllint available)
echo "4️⃣  Validating XML syntax..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v xmllint &> /dev/null; then
    if xmllint --noout public/sitemap.xml 2>&1; then
        echo "✅ XML syntax: VALID"
    else
        echo "❌ XML syntax: INVALID"
        exit 1
    fi
else
    echo "⚠️  xmllint not installed (skipping XML validation)"
    echo "   Install with: brew install libxml2 (Mac) or apt-get install libxml2-utils (Linux)"
fi
echo ""

# Test 5: Check Sitemap Content
echo "5️⃣  Analyzing sitemap content..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for static pages
STATIC_PAGES=("/" "/#work" "/#about" "/#contact")
STATIC_FOUND=0

for page in "${STATIC_PAGES[@]}"; do
    if grep -q "<loc>.*${page}</loc>" public/sitemap.xml; then
        STATIC_FOUND=$((STATIC_FOUND + 1))
    fi
done

echo "📄 Static pages found: $STATIC_FOUND / 4"

if [ $STATIC_FOUND -eq 4 ]; then
    echo "✅ All static pages present"
else
    echo "⚠️  Some static pages missing"
fi

# Check for case study pages
if grep -q "/case-study/" public/sitemap.xml; then
    echo "✅ Case study URLs present"
else
    if [ $CASE_STUDY_COUNT -eq 0 ]; then
        echo "⚠️  No case studies in sitemap (you may not have published any yet)"
    else
        echo "❌ Case study URLs missing"
    fi
fi
echo ""

# Test 6: Test Build Process
echo "6️⃣  Testing build process..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Running: npm run build"

if npm run build > /tmp/build.log 2>&1; then
    echo "✅ Build: SUCCESSFUL"
    
    # Check if sitemap in dist
    if [ -f "dist/sitemap.xml" ]; then
        echo "✅ Sitemap included in build output"
        
        DIST_URL_COUNT=$(grep -c "<url>" dist/sitemap.xml)
        echo "📊 URLs in dist/sitemap.xml: $DIST_URL_COUNT"
        
        if [ $DIST_URL_COUNT -eq $URL_COUNT ]; then
            echo "✅ Sitemap correctly copied to dist"
        else
            echo "⚠️  URL count mismatch between public and dist"
        fi
    else
        echo "❌ Sitemap NOT found in dist folder"
    fi
else
    echo "❌ Build: FAILED"
    echo "Check build log: /tmp/build.log"
    exit 1
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 TEST SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Sitemap generation: Working"
echo "✅ XML file created: public/sitemap.xml"
echo "✅ Build process: Automated"
echo "📊 Total URLs: $URL_COUNT"
echo "📁 Case studies: $CASE_STUDY_COUNT"
echo ""

# Final recommendation
if [[ $(grep "yourdomain.com" public/robots.txt 2>/dev/null) ]]; then
    echo "⚠️  ACTION REQUIRED:"
    echo "   Update 'yourdomain.com' in /public/robots.txt to your actual domain"
    echo ""
fi

if [ $CASE_STUDY_COUNT -eq 0 ]; then
    echo "💡 TIP:"
    echo "   No case studies found. Publish some in /admin to see them in sitemap!"
    echo ""
fi

echo "🎉 SEO Automation Test Complete!"
echo ""
echo "Next steps:"
echo "1. Deploy your site"
echo "2. Visit: https://yourdomain.com/sitemap.xml"
echo "3. Submit to Google Search Console"
echo ""
