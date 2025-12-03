#!/bin/bash

# Duesly Demo Showcase Deployment Script

echo "🚀 Starting Duesly Demo Showcase deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📁 Built files are in the 'dist' directory"
echo ""
echo "🌐 To preview the build locally:"
echo "   npm run preview"
echo ""
echo "🚀 To deploy to Vercel:"
echo "   npm install -g vercel"
echo "   vercel"
echo ""
echo "📋 To deploy to Netlify:"
echo "   Drag and drop the 'dist' folder to Netlify"
echo ""
echo "🎉 Deployment script completed!" 