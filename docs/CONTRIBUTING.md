# Contributing to Lomash Wood

Thank you for your interest in contributing to the Lomash Wood project! This document provides guidelines and instructions for contributing.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)
9. [Issue Reporting](#issue-reporting)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Personal attacks or insults
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18.x or higher
- pnpm 8.x or higher (preferred package manager)
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the Repository**
```bash
   # Navigate to https://github.com/lomashwood/lomash-wood
   # Click "Fork" button
```

2. **Clone Your Fork**
```bash
   git clone https://github.com/YOUR_USERNAME/lomash-wood.git
   cd lomash-wood
```

3. **Add Upstream Remote**
```bash
   git remote add upstream https://github.com/lomashwood/lomash-wood.git
```

4. **Install Dependencies**
```bash
   pnpm install
```

5. **Setup Environment Variables**
```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
```

6. **Run Development Server**
```bash
   pnpm dev
```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Workflow

### Branch Strategy

We follow a Git Flow branching model:

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Production hotfixes
- `refactor/*` - Code refactoring
- `docs/*` - Documentation updates

### Creating a New Branch
```bash
# Update develop branch
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Create fix branch
git checkout -b fix/issue-description
```

### Branch Naming Convention

- `feature/add-product-filter` - New feature
- `fix/booking-form-validation` - Bug fix
- `hotfix/critical-security-patch` - Hotfix
- `refactor/product-service` - Code refactoring
- `docs/update-api-documentation` - Documentation

---

## Coding Standards

### TypeScript Guidelines

1. **Use TypeScript for All Files**
```typescript
   // ✅ Good
   interface User {
     id: string;
     name: string;
     email: string;
   }

   function getUser(id: string): User {
     // implementation
   }

   // ❌ Bad - No types
   function getUser(id) {
     // implementation
   }
```

2. **Avoid `any` Type**
```typescript
   // ✅ Good
   interface ApiResponse<T> {
     data: T;
     success: boolean;
   }

   // ❌ Bad
   function handleResponse(response: any) {
     // implementation
   }
```

3. **Use Interfaces for Object Shapes**
```typescript
   // ✅ Good
   interface ProductProps {
     product: Product;
     onSelect: (id: string) => void;
   }

   // ❌ Bad - Using type for object
   type ProductProps = {
     product: Product;
     onSelect: (id: string) => void;
   }
```

### React/Next.js Guidelines

1. **Use Functional Components**
```tsx
   // ✅ Good
   export function ProductCard({ product }: ProductCardProps) {
     return <div>{product.name}</div>;
   }

   // ❌ Bad - Class component
   export class ProductCard extends React.Component {
     render() {
       return <div>{this.props.product.name}</div>;
     }
   }
```

2. **Use 'use client' Directive When Needed**
```tsx
   'use client';

   import { useState } from 'react';

   export function InteractiveComponent() {
     const [count, setCount] = useState(0);
     return <button onClick={() => setCount(count + 1)}>{count}</button>;
   }
```

3. **Component File Structure**
```tsx
   'use client'; // If needed

   // 1. Imports
   import React from 'react';
   import { cn } from '@/lib/utils';

   // 2. Types/Interfaces
   interface ComponentProps {
     className?: string;
   }

   // 3. Component
   export function Component({ className }: ComponentProps) {
     return <div className={cn('base-class', className)}>Content</div>;
   }

   // 4. Display name
   Component.displayName = 'Component';
```

4. **Prefer Named Exports**
```tsx
   // ✅ Good
   export function ProductCard() {}

   // ❌ Bad
   export default ProductCard;
```

### Styling Guidelines

1. **Use Tailwind CSS Utility Classes**
```tsx
   // ✅ Good
   <div className="flex items-center gap-4 p-6 bg-white rounded-lg">
     Content
   </div>

   // ❌ Bad - Inline styles
   <div style={{ display: 'flex', padding: '24px' }}>
     Content
   </div>
```

2. **Use cn() for Conditional Classes**
```tsx
   import { cn } from '@/lib/utils';

   <button
     className={cn(
       'px-4 py-2 rounded',
       isActive && 'bg-blue-500',
       isDisabled && 'opacity-50 cursor-not-allowed'
     )}
   >
     Button
   </button>
```

3. **Mobile-First Responsive Design**
```tsx
   // ✅ Good - Mobile first
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     Content
   </div>

   // ❌ Bad - Desktop first
   <div className="grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
     Content
   </div>
```

### File Organization
```typescript
// ✅ Good - Organized imports
// 1. External dependencies
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';

// 3. Hooks
import { useProducts } from '@/hooks/useProducts';

// 4. Utils/Lib
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/formatters';

// 5. Types
import type { Product } from '@/types/product.types';

// 6. Styles (if any)
import styles from './component.module.css';
```

### Code Quality Rules

1. **No Console Logs in Production**
```typescript
   // ✅ Good
   if (process.env.NODE_ENV === 'development') {
     console.log('Debug info');
   }

   // ❌ Bad
   console.log('User data:', userData);
```

2. **Proper Error Handling**
```typescript
   // ✅ Good
   try {
     const data = await fetchData();
     return data;
   } catch (error) {
     console.error('Failed to fetch data:', error);
     toast.error('Failed to load data');
     return null;
   }

   // ❌ Bad
   const data = await fetchData(); // No error handling
```

3. **Use Meaningful Variable Names**
```typescript
   // ✅ Good
   const filteredProducts = products.filter(p => p.category === 'kitchen');
   const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

   // ❌ Bad
   const x = products.filter(p => p.category === 'kitchen');
   const t = items.reduce((s, i) => s + i.price, 0);
```

---

## Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no code change)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

### Examples
```bash
# Feature
git commit -m "feat(products): add color filter functionality"

# Bug fix
git commit -m "fix(booking): resolve date picker validation issue"

# Documentation
git commit -m "docs(api): update authentication endpoint documentation"

# Refactoring
git commit -m "refactor(components): extract reusable ProductCard component"

# Multiple lines
git commit -m "feat(checkout): add payment integration

- Integrate Razorpay payment gateway
- Add payment success/failure handling
- Update order status based on payment

Closes #123"
```

### Commit Best Practices

1. **Keep commits atomic** - One logical change per commit
2. **Write descriptive messages** - Explain what and why, not how
3. **Reference issues** - Use `Closes #123` or `Fixes #456`
4. **Test before committing** - Ensure code works
5. **Update tests** - Include test updates in the same commit

---

## Pull Request Process

### Before Creating a PR

1. **Update Your Branch**
```bash
   git checkout develop
   git pull upstream develop
   git checkout your-branch
   git rebase develop
```

2. **Run Tests**
```bash
   pnpm test
   pnpm lint
   pnpm type-check
```

3. **Build Verification**
```bash
   pnpm build
```

### Creating a Pull Request

1. **Push Your Branch**
```bash
   git push origin your-branch-name
```

2. **Open Pull Request on GitHub**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Select base: `develop` (not main)
   - Fill out the PR template

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
Add screenshots for UI changes

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Dependent changes merged
```

### PR Review Process

1. **Automated Checks**
   - Linting passes
   - Type checking passes
   - Tests pass
   - Build succeeds

2. **Code Review**
   - At least one approval required
   - Address all comments
   - Update based on feedback

3. **Merge**
   - Squash and merge (preferred)
   - Delete branch after merge

---

## Testing Guidelines

### Test Structure
```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100000,
  };

  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<ProductCard product={mockProduct} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

### Testing Best Practices

1. **Test user behavior, not implementation**
2. **Use descriptive test names**
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Mock external dependencies**
5. **Test edge cases and error states**

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test ProductCard.test.tsx
```

---

## Documentation

### Code Documentation

1. **Component Documentation**
```typescript
   /**
    * ProductCard component displays a product with image, name, and price.
    * 
    * @param {ProductCardProps} props - Component props
    * @param {Product} props.product - Product data to display
    * @param {Function} props.onSelect - Callback when product is selected
    * 
    * @example
    * <ProductCard 
    *   product={product} 
    *   onSelect={handleSelect}
    * />
    */
   export function ProductCard({ product, onSelect }: ProductCardProps) {
     // implementation
   }
```

2. **Function Documentation**
```typescript
   /**
    * Formats a price value to Indian Rupee format
    * 
    * @param {number} price - Price in paise
    * @returns {string} Formatted price string (e.g., "₹1,50,000")
    */
   export function formatPrice(price: number): string {
     return new Intl.NumberFormat('en-IN', {
       style: 'currency',
       currency: 'INR',
       maximumFractionDigits: 0,
     }).format(price);
   }
```

3. **Complex Logic Documentation**
```typescript
   // Calculate available time slots excluding booked appointments
   // and considering showroom operating hours
   const availableSlots = timeSlots.filter(slot => {
     const isWithinOperatingHours = isTimeInRange(
       slot.time,
       operatingHours
     );
     const isNotBooked = !bookedSlots.includes(slot.time);
     
     return isWithinOperatingHours && isNotBooked;
   });
```

### Updating Documentation

When making changes, update relevant documentation:

- `README.md` - Project overview and setup
- `docs/API.md` - API endpoint changes
- `docs/COMPONENTS.md` - Component changes
- Inline comments - Complex logic
- JSDoc comments - Functions and components

---

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** - Check if already reported
2. **Check documentation** - Issue might be addressed
3. **Reproduce the bug** - Ensure it's reproducible

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add screenshots if applicable

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 120, Safari 17]
- Node version: [e.g., 18.17.0]

## Additional Context
Any other relevant information
```

### Feature Request Template
```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this solve?

## Proposed Solution
How should this work?

## Alternative Solutions
Other approaches considered

## Additional Context
Mockups, examples, or references
```

---

## Development Tips

### VS Code Setup

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- GitLens

### Useful Commands
```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Type check
pnpm type-check

# Run Storybook (if available)
pnpm storybook

# Generate component
pnpm generate:component ComponentName

# Clean build
pnpm clean && pnpm build
```

### Debugging

1. **Next.js Debugging**
```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Next.js: debug server-side",
         "type": "node-terminal",
         "request": "launch",
         "command": "pnpm dev"
       },
       {
         "name": "Next.js: debug client-side",
         "type": "chrome",
         "request": "launch",
         "url": "http://localhost:3000"
       }
     ]
   }
```

2. **React DevTools**
   - Install React Developer Tools browser extension
   - Use Components and Profiler tabs

3. **Network Debugging**
   - Use browser DevTools Network tab
   - Check API requests and responses

---

## Questions?

If you have questions about contributing:

- **Email**: developers@lomashwood.com
- **Slack**: #dev-contributions channel
- **GitHub Discussions**: Project discussions page

---

## License

By contributing to Lomash Wood, you agree that your contributions will be licensed under the project's license.

---

**Thank you for contributing to Lomash Wood! Your efforts help make this project better for everyone.**

---

**Last Updated:** January 22, 2026  
**Version:** 1.0.0  
**Maintainer:** Development Team