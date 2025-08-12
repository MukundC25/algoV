# 🚀 Render Deployment Guide

## Overview
This guide will deploy your Algorithm Visualizer (FastAPI + React) to Render as a single web service, eliminating localhost issues.

## 📋 Prerequisites
- GitHub repository with your code
- Render account (free tier available)

## 🔧 Pre-Deployment Setup

### 1. Repository Structure
Your repository should now have this structure:
```
algoV/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   └── algos.py
│   │   └── main.py
│   ├── dist/           # Built frontend (will be created during build)
│   ├── requirements.txt
│   ├── Procfile
│   ├── build.sh
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

### 2. Verify Changes
- ✅ Backend serves frontend from `/` route
- ✅ API endpoints moved to `/api/*` 
- ✅ Frontend uses relative API paths
- ✅ CORS configured for production
- ✅ Procfile created for Render

## 🌐 Deploy to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: prepare for Render deployment"
git push origin main
```

### Step 2: Create Render Web Service

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Select the repository: `algoV`**

### Step 3: Configure Service

**Basic Settings:**
- **Name**: `algo-visualizer` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend` (important!)

**Build & Deploy:**
- **Build Command**: 
```bash
chmod +x build.sh && ./build.sh
```

- **Start Command**: 
```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Environment Variables:**
- No additional variables needed for basic deployment

### Step 4: Deploy
1. **Click "Create Web Service"**
2. **Wait for build to complete** (5-10 minutes)
3. **Your app will be available at**: `https://your-app-name.onrender.com`

## 🔍 Post-Deployment Verification

### 1. Frontend Loading
- Visit your Render URL
- Should see Algorithm Visualizer interface
- No localhost references

### 2. API Functionality
- Test algorithm execution
- Check API docs at `/docs`
- Verify health endpoint at `/api/health`

### 3. No CORS Issues
- Frontend and backend served from same domain
- All API calls should work seamlessly

## 🛠️ Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify `backend/` is set as root directory
- Ensure all dependencies are in `requirements.txt`

### Frontend Not Loading
- Verify `dist/` folder is in backend directory
- Check that `main.py` serves static files correctly
- Ensure build script runs successfully

### API Errors
- Check that API routes are prefixed with `/api`
- Verify CORS settings allow all origins
- Test individual endpoints in Render logs

## 📊 Monitoring

### Render Dashboard
- **Logs**: Real-time application logs
- **Metrics**: Response times, error rates
- **Deploys**: Build history and rollback options

### Health Checks
- **Endpoint**: `/api/health`
- **Expected**: `{"status": "healthy", "timestamp": "..."}`

## 🔄 Updates & Redeployment

### Automatic Deployments
- Render automatically redeploys on `main` branch pushes
- No manual intervention needed

### Manual Redeploy
- Go to Render dashboard
- Click "Manual Deploy" → "Deploy latest commit"

## 💰 Cost Considerations

### Free Tier
- **750 hours/month** (enough for 24/7 small app)
- **Auto-sleep** after 15 minutes of inactivity
- **Cold start** ~30 seconds after inactivity

### Paid Plans
- **Starter**: $7/month for always-on service
- **Standard**: $25/month for better performance
- **Pro**: $100/month for production workloads

## 🎯 Success Criteria

✅ **Frontend loads** from Render URL  
✅ **API endpoints** respond correctly  
✅ **No localhost** references in production  
✅ **CORS issues** eliminated  
✅ **Algorithm execution** works end-to-end  

## 🆘 Support

- **Render Docs**: [docs.render.com](https://docs.render.com/)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com/)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev/)

---

**Your Algorithm Visualizer will be production-ready and accessible worldwide! 🌍**
