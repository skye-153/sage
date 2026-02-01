# SAGE - Static Site Deployment Guide

## Overview

Your SAGE website is now configured for **static generation** with an **embedded admin interface**. This means:
- All data is stored in a single JSON file (`src/lib/data.json`)
- The site can be hosted anywhere (GitHub Pages, Netlify, Vercel, S3, etc.)
- No backend server required
- You can edit data via `/admin` and rebuild to deploy changes

---

## Architecture

```
┌─────────────────────────────────────────┐
│         Your Local Machine              │
├─────────────────────────────────────────┤
│  1. Edit data in /admin interface       │
│  2. Data saved to src/lib/data.json     │
│  3. Run: npm run build                  │
│  4. Upload out/ folder to hosting       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Static Hosting (GitHub Pages,      │
│      Vercel, Netlify, AWS S3, etc)      │
├─────────────────────────────────────────┤
│  - No server needed                     │
│  - Blazing fast (CDN cached)            │
│  - Can be hosted anywhere               │
└─────────────────────────────────────────┘
```

---

## Step 1: Local Development Setup

### Prerequisites
- Node.js 18+ installed
- Git installed (for version control)

### Initial Setup

```bash
# Navigate to project
cd d:\sage

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:9002` to see your site.

---

## Step 2: Using the Admin Dashboard

### Accessing Admin
1. Go to `http://localhost:9002/admin` (or your domain `/admin`)
2. You'll see tabs for: Universities, Scholarships, Accommodations, Visa, Finances

### Adding/Editing Data
1. Click **+ Add Row** to create a new item
2. Fill in the form fields
3. For HTML content (details, knowMore), you can enter raw HTML
4. Click **Save** to save to `src/lib/data.json`

### Adding Columns
1. Click **+ Add Column**
2. Enter the column name (e.g., "Location", "Prerequisites")
3. The column is added to all current items in that category

### Deleting Data
1. Click the trash icon next to any row
2. Confirm deletion

### Downloading Data
- Click **Download Data** to backup your data as JSON

---

## Step 3: Building for Production

### Building the Static Site

```bash
npm run build
```

This command will:
1. Pre-render all pages with your data
2. Create a static export in the `out/` folder
3. Include all your data embedded in the HTML files
4. Generate no JavaScript or dynamic routes

### What Gets Generated
- `out/` folder contains your entire static website
- All pages are pre-rendered as HTML files
- No server-side rendering needed
- Perfect for static hosting

---

## Step 4: Deployment Options

### Option A: Vercel (Recommended - Easiest)

**Advantages:**
- Free tier available
- Automatic deployments from GitHub
- Built-in analytics and previews
- Very fast global CDN

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Leave build settings as default (Vercel auto-detects Next.js)
6. Click "Deploy"

**After making changes:**
```bash
npm run build
git add .
git commit -m "Update data: added new universities"
git push  # Auto-deploys to Vercel
```

### Option B: GitHub Pages (Free, No Deployment Service)

**Advantages:**
- 100% free
- Hosted on GitHub
- Simple to use

**Steps:**

1. Create a GitHub Actions workflow file `.github/workflows/deploy.yml`:

```yaml
name: Deploy Static Site

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build static site
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

2. Update `next.config.ts` to add basePath for GitHub Pages:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/sage', // Change 'sage' to your repo name
  // ... rest of config
};
```

3. Push to GitHub - it auto-builds and deploys!

4. Your site will be available at: `https://yourusername.github.io/sage`

### Option C: Netlify (Free)

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub/GitLab account
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `out`
7. Click Deploy

### Option D: AWS S3 + CloudFront (Pay-as-you-go)

**Steps:**
1. Build locally: `npm run build`
2. Create S3 bucket and upload `out/` folder contents
3. Create CloudFront distribution pointing to S3
4. Use custom domain if needed

**Cost:** Typically $0.50-5/month depending on traffic

### Option E: Traditional Hosting (cPanel, Shared Hosting)

1. Build: `npm run build`
2. Upload the `out/` folder contents to your public_html directory via FTP/SFTP
3. Done! No server configuration needed

---

## Step 5: Workflow for Adding/Changing Data

### When You Want to Update Data:

```bash
# 1. Start dev server
npm run dev

# 2. Visit http://localhost:9002/admin
# 3. Make changes in the admin interface
# 4. Changes are auto-saved to src/lib/data.json

# 4. Build for production
npm run build

# 5. Deploy (depends on your hosting choice)

# If using Vercel or GitHub Pages with auto-deploy:
git add src/lib/data.json
git commit -m "Update: Add new scholarship programs"
git push  # Auto-deploys!

# If using manual hosting:
# Upload the out/ folder to your hosting via FTP/S3/etc
```

---

## File Structure for Deployment

```
Your Site
├── src/
│   ├── lib/
│   │   └── data.json          ← All your data here
│   └── ...
├── out/                        ← Generated static site
│   ├── index.html
│   ├── universities/
│   ├── scholarships/
│   └── ...
└── package.json
```

---

## Environment Variables

If you need environment variables in your static site, create `.env.local`:

```
# .env.local
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Only variables starting with `NEXT_PUBLIC_` are available in the browser/static export.

---

## FAQ

### Q: Do I need Node.js on the hosting server?
**A:** No! The `out/` folder contains pure static HTML/CSS/JS. No server needed.

### Q: How often can I update data?
**A:** As often as you want! Just use the admin panel, rebuild, and redeploy.

### Q: Can multiple people edit data?
**A:** Currently one person at a time (since changes are to local files). For team editing, consider:
- Using a database backend (Firebase, MongoDB, etc.)
- Setting up a proper CMS like Contentful or Strapi

### Q: Is there a limit to how much data I can have?
**A:** The static export will work with large amounts of data, but very large JSON files might be slow to load. Start with <10k items and optimize if needed.

### Q: How do I add images?
**A:** Use URLs in your data:
```json
{
  "headerImage": "https://images.unsplash.com/photo-xxx"
}
```

### Q: Can I add custom domains?
**A:** Yes! Depends on hosting:
- **Vercel:** Add domain in dashboard
- **GitHub Pages:** Add CNAME file and DNS records
- **Netlify:** Add domain in settings
- **Traditional Hosting:** Use your hosting provider's domain setup

### Q: How do I track analytics?
**A:** Add Google Analytics to your site:
1. Create Google Analytics account
2. Add tracking ID to `src/app/layout.tsx`

---

## Troubleshooting

### Build fails with "Cannot find module"
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run build
```

### Changes don't appear after deploy
1. Hard refresh browser: `Ctrl+Shift+R` (or `Cmd+Shift+R`)
2. Clear browser cache
3. Check if you ran `npm run build` locally before deploying

### Admin page shows blank/error
1. Check browser console for errors (F12)
2. Ensure API route is accessible: `http://localhost:9002/api/data`
3. Make sure `src/lib/data.json` exists

### Site is very slow
1. Optimize images (use smaller file sizes or convert to WebP)
2. Reduce HTML content size (break into multiple pages)
3. Enable gzip compression on your hosting

---

## Next Steps

1. ✅ Run `npm install`
2. ✅ Test admin panel: `npm run dev` then visit `/admin`
3. ✅ Make test changes and verify they work
4. ✅ Choose a hosting provider (Vercel recommended)
5. ✅ Deploy your first version
6. ✅ Share with users!

---

## Support & Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments)
- [GitHub Pages + GitHub Actions](https://pages.github.com/)

---

**Happy Deploying! 🚀**
