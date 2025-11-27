# Deployment Guide

This application can be deployed to multiple platforms. Choose based on your preferences.

## ✅ Recommended: Render (Best for FastAPI)

Render is the recommended option for deploying FastAPI applications. It offers free tier support with better database integration.

### Steps to Deploy on Render:

1. **Sign up** at [render.com](https://render.com)

2. **Connect your GitHub repository**
   - Click "New Web Service"
   - Select "Build and deploy from a GitHub repository"
   - Grant access to your GitHub account

3. **Configure the deployment**
   - **Name**: `employee-task-app`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free (or paid if needed)

4. **Environment Variables** (if needed)
   - Set `PYTHON_VERSION` to `3.11.0` (optional)

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app
   - Your app URL will be displayed (e.g., `https://employee-task-app.onrender.com`)

### Notes:
- Free tier includes automatic deployments from GitHub
- Database will persist within the session
- For production, consider upgrading to a paid plan

---

## 🔵 Alternative: Vercel (Full-Stack)

Vercel supports Python with Serverless Functions, good for full-stack apps.

### Steps to Deploy on Vercel:

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import your GitHub repository**
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure**
   - Framework: Other
   - Root Directory: `/`
   - Build Command: `pip install -r requirements.txt`
   - Output Directory: (leave blank)

4. **Deploy**
   - Vercel will automatically deploy using `vercel.json` configuration
   - Your app URL will be provided

### Notes:
- `vercel.json` is configured in the project
- Free tier available with limitations

---

## 🟠 Alternative: Heroku (Classic Deployment)

Heroku was popular but now requires paid dynos. Use Render instead.

---

## 🟤 Alternative: Netlify (With Limitations)

Netlify is traditionally for static sites but can work with serverless functions.

### Note:
- Netlify is less ideal for FastAPI
- Better suited for frontend-only projects
- Recommended to use Render instead

---

## 🚀 Local Testing Before Deployment

Before deploying, test locally:

```bash
# Activate virtual environment
.\empvenv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the app
uvicorn app.main:app --reload

# Test at http://localhost:8000
```

---

## 📊 Platform Comparison

| Platform | Type | Best For | Free Tier | Setup Time |
|----------|------|----------|-----------|------------|
| **Render** | PaaS | FastAPI/Python | Yes | 5 min |
| **Vercel** | Serverless | Full-Stack | Yes (limited) | 10 min |
| **Netlify** | Static/Serverless | Frontend | Yes | 15 min |
| **Heroku** | PaaS | Any | ❌ Paid only | 5 min |

---

## 🔐 Security Tips

- Never commit `.env` files with secrets
- Use platform's environment variables for secrets
- Keep dependencies updated: `pip install --upgrade -r requirements.txt`
- Use HTTPS only in production

---

## ✨ Post-Deployment

After deployment:
1. Test all API endpoints
2. Verify database operations work
3. Monitor logs in the deployment platform
4. Set up CI/CD if needed

For issues, check platform logs and ensure all environment variables are set correctly.
