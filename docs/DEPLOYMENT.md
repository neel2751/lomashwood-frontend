# Lomash Wood - Deployment Guide

Complete deployment guide for the Lomash Wood Kitchen & Bedroom Design website.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Deployment Platforms](#deployment-platforms)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Rollback Procedures](#rollback-procedures)
9. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

### Required Tools

- Node.js 18.x or higher
- pnpm 8.x or higher (preferred) or npm
- Git
- Vercel CLI (for Vercel deployment)
- AWS CLI (for S3 deployment, if applicable)

### Access Requirements

- GitHub repository access
- Deployment platform credentials (Vercel/Netlify/AWS)
- Domain registrar access
- Analytics platform access
- Email service credentials
- Database access (if applicable)

---

## Environment Setup

### Environment Variables

Create appropriate `.env` files for each environment:

#### Development (`.env.development`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=false

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_dev_google_maps_key
```

#### Staging (`.env.staging`)
```bash

NEXT_PUBLIC_API_URL=https://staging.lomashwood.com/api
NEXT_PUBLIC_APP_URL=https://staging.lomashwood.com

NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_staging_google_maps_key
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

EMAIL_SERVICE_API_KEY=your_staging_email_key
EMAIL_FROM=noreply-staging@lomashwood.com

DATABASE_URL=postgresql://user:password@staging-db:5432/lomashwood

NEXTAUTH_URL=https://staging.lomashwood.com
NEXTAUTH_SECRET=your_staging_secret_key

SENTRY_DSN=your_staging_sentry_dsn
SENTRY_ENVIRONMENT=staging
```

#### Production (`.env.production`)
```bash

NEXT_PUBLIC_API_URL=https://www.lomashwood.com/api
NEXT_PUBLIC_APP_URL=https://www.lomashwood.com

NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_production_google_maps_key
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

EMAIL_SERVICE_API_KEY=your_production_email_key
EMAIL_FROM=noreply@lomashwood.com

DATABASE_URL=postgresql://user:password@production-db:5432/lomashwood

NEXTAUTH_URL=https://www.lomashwood.com
NEXTAUTH_SECRET=your_production_secret_key

SENTRY_DSN=your_production_sentry_dsn
SENTRY_ENVIRONMENT=production

RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

NEXT_PUBLIC_CDN_URL=https://cdn.lomashwood.com
```

### Securing Environment Variables

**Never commit `.env` files to version control.**

For deployment platforms, set environment variables through:

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- AWS: Parameter Store / Secrets Manager

---

## Build Process

### Pre-Build Checks
```bash

pnpm install --frozen-lockfile

pnpm lint

pnpm type-check

pnpm test

pnpm build
```

### Build Optimization

Update `next.config.js` for production:
```javascript
const nextConfig = {

  swcMinify: true,
  compress: true,

  images: {
    domains: ['cdn.lomashwood.com', 'images.lomashwood.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Deployment Platforms

### Option 1: Vercel (Recommended)

#### Initial Setup
```bash
npm i -g vercel

vercel login

vercel link
```

#### Deploy to Production
```bash
vercel --prod

git push origin main
```

#### Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["bom1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### Option 2: Netlify

#### Deploy via CLI
```bash
npm install -g netlify-cli

netlify login

netlify init

netlify deploy --prod
```

#### Configuration

Create `netlify.toml`:
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Option 3: AWS (Advanced)

#### S3 + CloudFront Deployment
```bash
pnpm build

aws s3 sync .next/static s3://lomashwood-static --cache-control max-age=31536000

aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

#### Production Deployment (`.github/workflows/deploy-production.yml`)
```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run linting
        run: pnpm lint
      
      - name: Run type check
        run: pnpm type-check
      
      - name: Run tests
        run: pnpm test
      
      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment completed'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

#### Staging Deployment (`.github/workflows/deploy-staging.yml`)
```yaml
name: Deploy to Staging

on:
  push:
    branches:
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.STAGING_API_URL }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.STAGING_APP_URL }}
      
      - name: Deploy to Vercel (Staging)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Performance Optimization

### Pre-Deployment Optimization

#### 1. Image Optimization
```bash
pnpm run optimize-images
```

#### 2. Bundle Analysis
```bash
ANALYZE=true pnpm build
```

#### 3. Lighthouse Audit

Run Lighthouse audit before production deployment:

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Post-Deployment Optimization

#### Configure CDN Caching
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};
```

---

## Monitoring & Analytics

### Setup Google Analytics
```typescript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

### Error Tracking (Sentry)
```bash
pnpm add @sentry/nextjs

npx @sentry/wizard -i nextjs
```

### Performance Monitoring

Tools to implement:

- Vercel Analytics
- Google PageSpeed Insights
- New Relic / DataDog
- Sentry Performance Monitoring

---

## Rollback Procedures

### Vercel Rollback
```bash
vercel ls

vercel rollback [deployment-url]
```

### Git-Based Rollback
```bash
git revert HEAD

git push origin main

git checkout -b rollback/fix-critical-bug
git revert <commit-hash>
git push origin rollback/fix-critical-bug
```

### Database Rollback

If database migrations are involved:
```bash
pnpm prisma migrate rollback

pg_restore -d lomashwood backup.dump
```

---

## Post-Deployment Checklist

### Immediate Checks (within 5 minutes)

- [ ] Website is accessible at production URL
- [ ] SSL certificate is active (HTTPS)
- [ ] All pages load without errors
- [ ] Forms submit successfully
- [ ] Images load correctly
- [ ] API endpoints respond correctly
- [ ] Analytics tracking is active
- [ ] Error tracking is receiving data

### Functional Testing (within 30 minutes)

- [ ] Test appointment booking flow
- [ ] Test product filtering
- [ ] Test search functionality
- [ ] Test form submissions (brochure, contact, business)
- [ ] Test user authentication
- [ ] Test mobile responsiveness
- [ ] Test all CTAs and navigation links
- [ ] Verify showroom locations display correctly

### SEO & Performance (within 1 hour)

- [ ] robots.txt is accessible
- [ ] sitemap.xml is generated and accessible
- [ ] Meta tags are correct on all pages
- [ ] Open Graph images display correctly
- [ ] Lighthouse score meets targets
- [ ] Core Web Vitals are acceptable
- [ ] Google Search Console verification

### Monitoring Setup (within 24 hours)

- [ ] Uptime monitoring configured
- [ ] Error alerts configured
- [ ] Performance alerts configured
- [ ] Backup strategy verified
- [ ] CDN caching verified
- [ ] Database connection pooling verified

### Documentation Updates

- [ ] Update CHANGELOG.md
- [ ] Update deployment date in README.md
- [ ] Document any configuration changes
- [ ] Update API documentation if changed
- [ ] Notify team of deployment completion

---

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

#### Environment Variable Issues

- Verify all required variables are set
- Check for typos in variable names
- Ensure secrets are properly configured in platform

#### Performance Issues

- Enable compression
- Optimize images
- Implement code splitting
- Use dynamic imports for heavy components

#### Database Connection Issues

- Check connection string
- Verify database is accessible from deployment region
- Check connection pool settings
- Verify SSL settings if required

---

## Support & Resources

### Platform Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Netlify Documentation](https://docs.netlify.com)

### Internal Resources

- Deployment Runbook: `/docs/runbooks/deployment.md`
- Incident Response: `/docs/runbooks/incident-response.md`
- Contact: devops@lomashwood.com

---

## Security Considerations

### Pre-Deployment Security Checklist

- [ ] All dependencies updated to latest secure versions
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] API routes protected
- [ ] Sensitive data encrypted
- [ ] No secrets in client-side code
- [ ] Content Security Policy configured

### Post-Deployment Security

- [ ] Security audit completed
- [ ] Penetration testing scheduled
- [ ] SSL/TLS certificate verified
- [ ] Firewall rules reviewed
- [ ] Backup encryption verified

---

**Last Updated:** January 2026  
**Maintainer:** DevOps Team  
**Version:** 1.0.0