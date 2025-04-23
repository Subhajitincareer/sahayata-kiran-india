# Deploying Sahayata Kiran

This guide covers how to deploy the Sahayata Kiran application to various platforms.

## GitHub Pages Deployment

### Setup

1. **Ensure Vite Configuration**
   The `vite.config.ts` should already include:
   ```typescript
   base: '/sahayata-kiran/'
   ```

2. **Install gh-pages package:**

```bash
npm install --save-dev gh-pages
```

3. **Add deployment scripts to `package.json`:**

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist",
  // ... other scripts
}
```

4. **Deploy the application:**

```bash
npm run deploy
```

5. **Configure GitHub Repository:**
   - Go to your repository settings
   - Navigate to Pages section
   - Ensure the source is set to gh-pages branch

Your site will be available at: `https://yourusername.github.io/sahayata-kiran/`

## Vercel Deployment

1. **Sign up/login to Vercel:** [https://vercel.com](https://vercel.com)

2. **Connect your GitHub repository**

3. **Configure the project:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add environment variables** (if needed)

5. **Deploy**

## Netlify Deployment

1. **Sign up/login to Netlify:** [https://netlify.com](https://netlify.com)

2. **Import your GitHub repository**

3. **Configure the build settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. **Add environment variables** (if needed)

5. **Deploy**

## Custom Domain Configuration

### GitHub Pages

1. **Add a CNAME file to your repository:**
   - Create a file named `CNAME` in the `public` directory
   - Add your domain name to this file, e.g., `sahayatakiran.org`

2. **Update DNS settings with your domain provider:**
   - Add an A record pointing to GitHub Pages IP addresses
   - Or add a CNAME record pointing to `yourusername.github.io`

3. **Enable HTTPS in repository settings**

### Vercel/Netlify

1. **Navigate to domain settings in the dashboard**

2. **Add your custom domain**

3. **Follow the verification steps provided by the platform**

## Configuring Environment Variables

For deployments that require environment variables (e.g., Supabase credentials):

### GitHub Pages
GitHub Pages doesn't support environment variables directly. Consider:
- Using public variables for non-sensitive data
- Using a configuration file that's generated during build

### Vercel/Netlify
Both platforms provide easy ways to add environment variables through their dashboards:

1. Navigate to project settings
2. Find the environment variables section
3. Add your variables:
   ```
   VITE_SUPABASE_URL=your_value
   VITE_SUPABASE_ANON_KEY=your_value
   ```

## Continuous Deployment

### GitHub Actions for GitHub Pages

Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```

## Post-Deployment Verification

After deploying, verify:

1. **Application loads correctly**
2. **All pages and routes work**
3. **Authentication functions properly**
4. **Database operations succeed**
5. **Multilingual support works**

## Troubleshooting Deployment Issues

### 404 Errors on Routes
For single-page applications, configure your hosting to redirect all requests to index.html:

**Netlify**: Add a `_redirects` file in the `public` directory:
```
/*    /index.html   200
```

**Vercel**: Add a `vercel.json` file:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Build Failures
- Check build logs for specific errors
- Ensure all dependencies are properly installed
- Verify environment variables are correctly set
