# Lomash Wood - Complete Setup Guide

> Step-by-step guide to set up the Lomash Wood website locally and for production

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [Third-Party Integrations](#third-party-integrations)
- [Running the Application](#running-the-application)
- [Testing Setup](#testing-setup)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

#### 1. Node.js and npm

**Minimum Version**: Node.js 18.17 or higher

```bash
node --version
npm --version

```

**Installation:**
- **macOS**: 
  ```bash
  brew install node@18
  ```
- **Windows**: Download from [nodejs.org](https://nodejs.org/)
- **Linux**: 
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

#### 2. Git

```bash
git --version

```

#### 3. Code Editor (Recommended)

**Visual Studio Code** with extensions:
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Optional but Recommended

- **Docker** (for containerized development)
- **PostgreSQL** (if using database features)
- **Redis** (for caching and sessions)

## 🚀 Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/lomashwood/website.git

git clone git@github.com:lomashwood/website.git

cd website
```

### Step 2: Install Dependencies

Choose your preferred package manager:

#### Using npm (Default)
```bash
npm install
```

#### Using Yarn
```bash
npm install -g yarn

yarn install
```

#### Using pnpm (Faster alternative)
```bash
npm install -g pnpm

pnpm install
```

**Expected Output:**
```
added 1234 packages, and audited 1235 packages in 45s

234 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Step 3: Verify Installation

```bash
npm list --depth=0

npm run type-check
```

## 💾 Database Setup

### Option 1: No Database (Static/API-based)

If you're using external APIs or static data, you can skip this section.

### Option 2: PostgreSQL Setup

#### Install PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

**Linux:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Create Database

```bash
psql postgres

CREATE DATABASE lomashwood;

CREATE USER lomashwood_user WITH PASSWORD 'your_secure_password';

GRANT ALL PRIVILEGES ON DATABASE lomashwood TO lomashwood_user;

\q
```

#### Run Migrations (if applicable)

```bash
npx prisma migrate dev

npm run db:migrate
```

### Option 3: Docker Database

```bash
cat > docker-compose.yml << EOF
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lomashwood
      POSTGRES_USER: lomashwood_user
      POSTGRES_PASSWORD: your_secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF

docker-compose up -d
```

## ⚙️ Environment Configuration

### Step 1: Create Environment File

```bash
cp .env.example .env.local

code .env.local
nano .env.local
```

### Step 2: Configure Environment Variables

#### Basic Configuration

```env
# ======================
# Application Settings
# ======================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Lomash Wood"
NODE_ENV=development

# ======================
# API Configuration
# ======================
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET_KEY=your-secret-key-here-change-in-production

# ======================
# Database (if applicable)
# ======================
DATABASE_URL=postgresql://lomashwood_user:your_secure_password@localhost:5432/lomashwood
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# ======================
# Authentication
# ======================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-this-with-openssl-rand-base64-32
JWT_SECRET=another-secure-secret-key

# ======================
# Email Service
# ======================
# Using SendGrid
SENDGRID_API_KEY=SG.your-sendgrid-api-key

# Or using SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@lomashwood.com

# ======================
# File Upload
# ======================
# Using AWS S3
AWS_REGION=eu-west-2
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=lomashwood-uploads

# Or using Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ======================
# Analytics
# ======================
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# ======================
# Payment/Finance (if applicable)
# ======================
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# ======================
# Maps
# ======================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXX

# ======================
# Feature Flags
# ======================
NEXT_PUBLIC_ENABLE_CHAT=false
NEXT_PUBLIC_ENABLE_REVIEWS=true
NEXT_PUBLIC_ENABLE_APPOINTMENTS=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# ======================
# Cache (if using Redis)
# ======================
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password

# ======================
# Rate Limiting
# ======================
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

### Step 3: Generate Secrets

```bash
openssl rand -base64 32

openssl rand -base64 32

openssl rand -hex 32
```

Copy the generated values into your `.env.local` file.

### Step 4: Validate Environment

Create a validation script:

```bash
node scripts/validate-env.js

```

## 🔗 Third-Party Integrations

### Google Maps API (for Showroom Locations)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Maps JavaScript API**
4. Create credentials (API Key)
5. Restrict API key to your domain
6. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXX
   ```

### Google Analytics

1. Create property at [analytics.google.com](https://analytics.google.com/)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Email Service (SendGrid)

1. Sign up at [sendgrid.com](https://sendgrid.com/)
2. Create API key
3. Verify sender email
4. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=SG.xxxxx
   EMAIL_FROM=noreply@lomashwood.com
   ```

### File Storage (AWS S3)

1. Create AWS account
2. Create S3 bucket
3. Create IAM user with S3 permissions
4. Add to `.env.local`:
   ```env
   AWS_REGION=eu-west-2
   AWS_ACCESS_KEY_ID=xxxxx
   AWS_SECRET_ACCESS_KEY=xxxxx
   AWS_S3_BUCKET=lomashwood-uploads
   ```

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.0.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.3s
```

### Production Build

```bash
npm run build

npm run start
```
### Custom Port

```bash

PORT=3001 npm run dev

PORT=3001
```

### Network Access

```bash
npm run dev -- -H 0.0.0.0
```
## 🧪 Testing Setup

### Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### Configure Playwright

The project includes `playwright.config.ts`. Verify it's configured:

```bash
npx playwright test --list

```

### Run Tests

```bash
npm run test:e2e

npx playwright test tests/e2e/home.spec.ts

npm run test:e2e:ui

npm run test:e2e:headed

npx playwright test --debug
```

### Generate Test Report

```bash
npx playwright test --reporter=html

npx playwright show-report
```

## 🌐 Production Deployment

### Vercel Deployment (Recommended)

#### Prerequisites
- GitHub/GitLab account
- Vercel account (free tier available)

#### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Separate variables for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your deployment URL

5. **Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Manual Server Deployment

```bash
npm run build

npm ci --production

pm2 start npm --name "lomashwood" -- start

sudo systemctl start lomashwood
```

### Docker Deployment

```bash
docker build -t lomashwood:latest .

docker run -p 3000:3000 \
  --env-file .env.production \
  lomashwood:latest

docker-compose up -d
```

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
lsof -i :3000

kill -9 <PID>

PORT=3001 npm run dev
```

#### Module Not Found Errors

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

#### TypeScript Errors

```bash
rm -rf .next
npm run type-check
```

#### Build Failures

```bash

node --version  

rm -rf .next

npm run build
```

#### Environment Variables Not Loading

```bash
ls -la | grep env

```

#### Database Connection Errors

```bash
pg_isready
```

### Getting Help

If you're still stuck:

1. **Check Documentation**
   - Review this guide
   - Check [Next.js docs](https://nextjs.org/docs)
   - Review [Tailwind docs](https://tailwindcss.com/docs)

2. **Search Issues**
   - Check GitHub Issues
   - Search Stack Overflow

3. **Contact Team**
   - Email: dev-team@lomashwood.com
   - Slack: #dev-help channel

## ✅ Next Steps

After completing setup:

1. **Explore the Application**
   - Visit http://localhost:3000
   - Browse through all pages
   - Test forms and interactions

2. **Review Documentation**
   - Read [README.md](./README.md)
   - Check [ARCHITECTURE.md](./ARCHITECTURE.md)
   - Review [API.md](./API.md)

3. **Set Up IDE**
   - Install recommended VS Code extensions
   - Configure Prettier and ESLint
   - Set up debugging

4. **Run Tests**
   ```bash
   npm run test:e2e
   ```

5. **Make Your First Change**
   - Create a feature branch
   - Make a small change
   - Test locally
   - Create a pull request

6. **Join the Team**
   - Introduce yourself
   - Ask questions
   - Review coding standards

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Playwright Docs](https://playwright.dev/docs/intro)

### Tools
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Repository](https://github.com/lomashwood/website)
- [Figma Designs](https://figma.com/your-designs)

### Support
- **Email**: support@lomashwood.com
- **Slack**: [Join Workspace](https://lomashwood.slack.com)
- **Issues**: [GitHub Issues](https://github.com/lomashwood/website/issues)

---

**Setup Complete! 🎉**

You're now ready to start developing the Lomash Wood website.

For questions or issues, please refer to the troubleshooting section or contact the development team.