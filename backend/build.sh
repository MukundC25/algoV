#!/bin/bash

# Build script for Render deployment
echo "🚀 Building Algorithm Visualizer for production..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Build frontend
echo "⚛️  Building React frontend..."
cd ../frontend
npm install
npm run build

# Move built frontend to backend
echo "📁 Moving built frontend to backend..."
cd ..
mv frontend/dist backend/

echo "✅ Build completed successfully!"
echo "📁 Backend directory now contains:"
ls -la backend/
