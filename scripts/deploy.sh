#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting production build..."

# Clean up previous builds
rm -rf dist-prod
mkdir -p dist-prod
mkdir -p dist-prod/dist

# Run webpack build
echo "📦 Building JavaScript bundle..."
npm run build

# Copy files to production directory
echo "📋 Copying files to dist-prod..."
cp index.html dist-prod/
cp styles.css dist-prod/
cp dist/bundle.js dist-prod/dist/bundle.js

echo "✅ Build complete! Production files are in dist-prod/"
echo "Files ready for deployment:"
ls -lh dist-prod/
