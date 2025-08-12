#!/usr/bin/env python3
"""
Startup script for Algorithm Visualizer API
This ensures proper startup in production environments like Render
"""

import os
import uvicorn
from app.main import app

if __name__ == "__main__":
    # Get port from environment variable (Render sets this)
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    
    print(f"🚀 Starting Algorithm Visualizer API")
    print(f"📍 Host: {host}")
    print(f"🔌 Port: {port}")
    print(f"🌐 Environment: {os.environ.get('RENDER_ENVIRONMENT', 'development')}")
    
    # Start the server
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=False,  # Disable reload in production
        log_level="info"
    )
