#!/bin/bash

echo "========================================"
echo "  The Barn - GitHub Deployment Script"
echo "========================================"
echo

echo "Step 1: Cloning repository..."
git clone https://github.com/Mohamedben-miled/TheBarn.git temp-repo
cd temp-repo

echo
echo "Step 2: Clearing existing files (keeping .git)..."
find . -maxdepth 1 ! -name '.' ! -name '..' ! -name '.git' -exec rm -rf {} +

echo
echo "Step 3: Copying new files..."
cp ../index.html .
cp ../DEPLOYMENT.md .
cp -r ../css .
cp -r ../js .
cp -r ../admin .
cp -r ../aa .
cp -r ../images .

echo
echo "Step 4: Adding files to git..."
git add .

echo
echo "Step 5: Committing changes..."
git commit -m "Complete eco-friendly coworking website

- SEO optimized with 160 Mbps 5G WiFi specifications
- Mobile responsive design with hamburger navigation
- PHP admin dashboard for managing offers
- Clean gallery using aa folder images
- Accurate working hours (Mon-Sat 8:30am-1:00am)
- Modern eco-friendly design with plant animations
- Contact form and pricing sections
- Performance optimized and production ready"

echo
echo "Step 6: Pushing to GitHub..."
git push origin main

echo
echo "Step 7: Cleaning up..."
cd ..
rm -rf temp-repo

echo
echo "========================================"
echo "  Deployment Complete!"
echo "  Check: https://github.com/Mohamedben-miled/TheBarn"
echo "========================================"
