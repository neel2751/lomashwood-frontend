# Lomash Wood - Kitchen & Bedroom Design Website

> Premium bespoke kitchen and bedroom design, manufacturing, and installation services

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-45ba4b)](https://playwright.dev/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Documentation](#documentation)

## 🎯 Overview

Lomash Wood is a modern, high-performance website for a premium kitchen and bedroom design company. The application provides a seamless user experience for browsing products, booking consultations, requesting quotes, and managing customer accounts.

### Key Objectives

- **Showcase Products**: Beautiful presentation of kitchen and bedroom designs
- **Generate Leads**: Easy consultation booking and quote request flows
- **Customer Management**: Full account management and order tracking
- **SEO Optimized**: Maximum visibility in search engines
- **Performance First**: Fast loading times and excellent Core Web Vitals

## ✨ Features

### Public Features
- 🏠 **Homepage** - Hero section, featured products, company overview
- 🍳 **Kitchen Categories** - Browse modern, traditional, and contemporary designs
- 🛏️ **Bedroom Collections** - Fitted wardrobes, walk-in closets, bedroom suites
- 🏪 **Showrooms** - Location finder with details and opening hours
- 💡 **Inspiration Gallery** - Design ideas and completed projects
- 📰 **Blog** - Design tips, trends, and company news
- 💰 **Finance Options** - Payment plans and calculator
- 📞 **Contact Forms** - Multiple contact methods and quote requests
- 📅 **Appointment Booking** - Multi-step wizard for consultation scheduling

### Customer Account Features
- 👤 **Profile Management** - Edit personal information and preferences
- 📦 **Order Tracking** - View order history and current status
- 📅 **Appointments** - Manage upcoming and past consultations
- ❤️ **Wishlist** - Save favorite products
- 🎨 **Saved Designs** - Store custom design projects
- ⚙️ **Settings** - Notifications, privacy, regional preferences

### Business Features
- 🤝 **Trade Portal** - B2B partnerships and trade accounts
- 📄 **Brochure Downloads** - Digital catalogs with lead capture
- 📊 **Analytics** - Track user behavior and conversions
- 🔐 **Protected Routes** - Authentication middleware
- 🌐 **SEO Tools** - Sitemaps, robots.txt, structured data

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://react.dev/)** - UI component library

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Playwright](https://playwright.dev/)** - E2E testing

### Infrastructure
- **Edge Runtime** - Fast middleware execution
- **ISR (Incremental Static Regeneration)** - Optimized page delivery
- **Image Optimization** - Next.js Image component

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lomashwood/website.git
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Commands

```bash
npm run dev          
npm run build        
npm run start       
npm run lint        
npm run format       
npm run test:e2e     
npm run test:e2e:ui  
npm run test:e2e:headed 

npm run type-check 
```

## 📁 Project Structure

```
lomash-wood/
├── public/                      # Static assets
│   ├── images/                  # Images and graphics
│   ├── fonts/                   # Custom fonts
│   ├── favicon.ico              # Favicon
│   ├── favicon.svg              # SVG favicon
│   ├── robots.txt               # Search engine directives
│   └── site.webmanifest         # Web app manifest
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (main)/              # Main layout group
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── kitchen/         # Kitchen pages
│   │   │   ├── bedroom/         # Bedroom pages
│   │   │   ├── showrooms/       # Showroom pages
│   │   │   ├── blog/            # Blog pages
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact page
│   │   │   └── ...              # Other pages
│   │   │
│   │   ├── (auth)/              # Auth layout group
│   │   │   ├── login/           # Login page
│   │   │   ├── register/        # Registration page
│   │   │   └── forgot-password/ # Password reset
│   │   │
│   │   ├── my-account/          # Account area
│   │   │   ├── layout.tsx       # Account layout
│   │   │   ├── page.tsx         # Account dashboard
│   │   │   ├── profile/         # Profile management
│   │   │   ├── orders/          # Order history
│   │   │   ├── appointments/    # Appointment management
│   │   │   ├── wishlist/        # Saved products
│   │   │   ├── saved-designs/   # Design projects
│   │   │   └── settings/        # Account settings
│   │   │
│   │   ├── api/                 # API routes
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   └── sitemap.ts           # Dynamic sitemap
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn/UI components
│   │   ├── shared/              # Shared components
│   │   ├── layout/              # Layout components
│   │   ├── forms/               # Form components
│   │   └── account/             # Account components
│   │
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts             # Helper functions
│   │   ├── constants.ts         # Constants
│   │   └── validators.ts        # Validation schemas
│   │
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript types
│   ├── styles/                  # Additional styles
│   └── middleware/              # Middleware functions
│       ├── auth.ts              # Authentication
│       └── api.ts               # API middleware
│
├── tests/                       # Test files
│   └── e2e/                     # E2E tests
│       ├── home.spec.ts         # Homepage tests
│       ├── products.spec.ts     # Product tests
│       ├── booking.spec.ts      # Booking tests
│       └── checkout.spec.ts     # Checkout tests
│
├── docs/                        # Documentation
│   ├── README.md                # This file
│   ├── ARCHITECTURE.md          # Architecture guide
│   ├── API.md                   # API documentation
│   └── DEPLOYMENT.md            # Deployment guide
│
├── .github/                     # GitHub configuration
│   └── workflows/               # CI/CD workflows
│
├── middleware.ts                # Next.js middleware
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── playwright.config.ts         # Playwright configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
└── README.md                    # Project overview
```

## 💻 Development

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** strict mode

### Component Guidelines

```tsx
import { FC } from 'react';

interface ComponentProps {
  title: string;
  description?: string;
}

export const Component: FC<ComponentProps> = ({ title, description }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-slate-600">{description}</p>}
    </div>
  );
};
```

### Naming Conventions

- **Components**: PascalCase (`ProductCard.tsx`)
- **Functions**: camelCase (`formatPrice()`)
- **Files**: kebab-case (`product-card.tsx`) or PascalCase for components
- **CSS Classes**: Tailwind utilities
- **Types/Interfaces**: PascalCase (`ProductType`, `UserInterface`)

### Git Workflow

```bash
git checkout -b feature/new-feature

git add .
git commit -m "feat: add new feature"

git push origin feature/new-feature

```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/tooling changes

## 🧪 Testing

### E2E Testing with Playwright

```bash

npx playwright install

npm run test:e2e

npx playwright test tests/e2e/home.spec.ts

npm run test:e2e:ui

npm run test:e2e:headed

npx playwright test --project=chromium

npx playwright test --debug

npx playwright show-report
```

### Test Coverage

- ✅ Homepage functionality
- ✅ Product browsing and filtering
- ✅ Appointment booking flow
- ✅ Quote request process
- ✅ Form validation
- ✅ Responsive design
- ✅ Accessibility

## 📦 Deployment

### Production Build

```bash
npm run build

npm run start
```

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Import project in [Vercel](https://vercel.com)
   - Connect GitHub repository

2. **Configure Environment Variables**
   - Add all `.env` variables in Vercel dashboard

3. **Deploy**
   - Automatic deployment on push to `main` branch
   - Preview deployments for pull requests

### Manual Deployment

```bash
npm run build

npm run start
```

### Environment Requirements

- Node.js 18.17+
- 512MB+ RAM
- Edge Functions support (for middleware)

## 🔐 Environment Variables

Create a `.env.local` file:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (if applicable)
DATABASE_URL=postgresql://user:password@localhost:5432/lomashwood

# Authentication (if using external service)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Email Service (if applicable)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=false
NEXT_PUBLIC_ENABLE_REVIEWS=true
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'feat: add amazing feature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Write clean, maintainable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📚 Documentation

Additional documentation:

- **[Architecture Guide](./ARCHITECTURE.md)** - System design and architecture
- **[API Documentation](./API.md)** - API endpoints and usage
- **[Deployment Guide](./DEPLOYMENT.md)** - Detailed deployment instructions
- **[Component Library](./COMPONENTS.md)** - Component documentation
- **[Testing Guide](./TESTING.md)** - Testing strategies and examples

## 📝 License

Copyright © 2026 Lomash Wood Limited. All rights reserved.

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 👥 Team

- **Development**: Your Development Team
- **Design**: Your Design Team
- **Project Management**: Your PM Team

## 📞 Support

For questions or support:

- **Email**: support@lomashwood.com
- **Phone**: 0800 123 4567
- **Website**: https://www.lomashwood.com

## 🔗 Links

- **Production**: https://www.lomashwood.com
- **Staging**: https://staging.lomashwood.com
- **Documentation**: https://docs.lomashwood.com

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**