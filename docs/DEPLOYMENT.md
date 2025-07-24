# Deployment Guide for LearnSphere

This guide covers how to deploy LearnSphere to various hosting platforms.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Environment Variables](#environment-variables)
- [Deployment Platforms](#deployment-platforms)
- [Post-Deployment Checklist](#post-deployment-checklist)

## 🔧 Prerequisites

Before deploying, ensure you have:

- **Backend API** deployed and accessible
- **Environment variables** configured for production
- **Google OAuth** credentials set up for your domain
- **Custom domain** (optional but recommended)

## 🏗️ Build Configuration

### Production Build

Create an optimized build for production:

```bash
npm run build
```

This creates a `dist/` directory with optimized static files.

### Build Optimization

The current build shows warnings about large chunks. Consider:

1. **Code splitting** for better performance:
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom'],
             ui: ['framer-motion', '@headlessui/react'],
             media: ['hls.js', 'plyr', 'react-player']
           }
         }
       }
     }
   });
   ```

2. **Dynamic imports** for route-based code splitting:
   ```javascript
   const HomePage = lazy(() => import('./Pages/HomePage'));
   const CoursesPage = lazy(() => import('./Pages/CoursesPage'));
   ```

## 🌍 Environment Variables

### Production Environment Setup

Create production environment variables:

```env
# Production Backend API
VITE_BACKEND_URI=https://api.yourdomain.com/api

# Google OAuth Production
VITE_GOOGLE_CLIENT_ID=your-production-google-client-id
VITE_GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/callback
```

### Security Considerations

- **Never commit** `.env` files with real credentials
- Use **secrets management** provided by your hosting platform
- Ensure **CORS** is properly configured on your backend
- Use **HTTPS** for all production endpoints

## 🚀 Deployment Platforms

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard

4. **Custom domain** (optional):
   - Add domain in Vercel dashboard
   - Update DNS records

**Vercel Configuration** (`vercel.json`):
```json
{
  "build": {
    "env": {
      "VITE_BACKEND_URI": "@backend_uri",
      "VITE_GOOGLE_CLIENT_ID": "@google_client_id",
      "VITE_GOOGLE_REDIRECT_URI": "@google_redirect_uri"
    }
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Netlify Deployment

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment Variables**: Set in Netlify dashboard

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS S3 + CloudFront

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront** for SPA routing:
   - Create distribution
   - Set error pages: 404 → `/index.html` (200)

### Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Deploy**:
   ```bash
   firebase deploy
   ```

**Firebase Configuration** (`firebase.json`):
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

### Docker Deployment

**Dockerfile**:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and run**:
```bash
docker build -t learnsphere .
docker run -p 80:80 learnsphere
```

## ✅ Post-Deployment Checklist

### Testing

- [ ] **Homepage loads** correctly
- [ ] **Navigation** works between pages
- [ ] **Course search** functionality works
- [ ] **Login/Signup** redirects work
- [ ] **Video streaming** works (if backend is connected)
- [ ] **Responsive design** works on mobile
- [ ] **Error boundaries** handle errors gracefully

### Performance

- [ ] **Page load times** are acceptable (< 3 seconds)
- [ ] **Images** are optimized and load quickly
- [ ] **JavaScript chunks** are properly split
- [ ] **CDN** is configured (if applicable)

### SEO & Analytics

- [ ] **Meta tags** are properly set
- [ ] **Google Analytics** is configured (if needed)
- [ ] **Sitemap** is generated (if needed)
- [ ] **Robots.txt** is configured

### Security

- [ ] **HTTPS** is enabled
- [ ] **CORS** is properly configured
- [ ] **Environment variables** are secure
- [ ] **API endpoints** are protected

### Monitoring

- [ ] **Error tracking** is set up (Sentry, LogRocket, etc.)
- [ ] **Performance monitoring** is configured
- [ ] **Uptime monitoring** is in place
- [ ] **Backup strategy** is implemented

## 🔍 Troubleshooting

### Common Issues

1. **Blank page after deployment**:
   - Check browser console for errors
   - Verify all environment variables are set
   - Ensure SPA routing is configured

2. **API connection fails**:
   - Verify `VITE_BACKEND_URI` is correct
   - Check CORS configuration on backend
   - Ensure backend is accessible from your domain

3. **Google OAuth not working**:
   - Update redirect URI in Google Console
   - Verify `VITE_GOOGLE_CLIENT_ID` is correct
   - Check that domain is authorized

4. **Build fails**:
   - Clear `node_modules` and reinstall
   - Check for environment-specific issues
   - Verify all dependencies are compatible

### Performance Issues

1. **Slow loading**:
   - Implement code splitting
   - Optimize images
   - Enable compression
   - Use CDN for static assets

2. **Large bundle size**:
   - Analyze bundle with `vite-bundle-analyzer`
   - Remove unused dependencies
   - Implement dynamic imports

## 📱 Mobile Considerations

- **Responsive design** is already implemented with Tailwind CSS
- **Touch interactions** work properly
- **Video playback** is optimized for mobile
- **Performance** is optimized for slower connections

## 🔧 Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_BACKEND_URI: ${{ secrets.VITE_BACKEND_URI }}
        VITE_GOOGLE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_CLIENT_ID }}
        VITE_GOOGLE_REDIRECT_URI: ${{ secrets.VITE_GOOGLE_REDIRECT_URI }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

---

This deployment guide should help you successfully deploy LearnSphere to production. Choose the platform that best fits your needs and requirements.