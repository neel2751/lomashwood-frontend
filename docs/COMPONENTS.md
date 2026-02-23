# Lomash Wood - Components Documentation

Complete component documentation for the Lomash Wood Kitchen & Bedroom Design website.

---

## Table of Contents

1. [Component Architecture](#component-architecture)
2. [Layout Components](#layout-components)
3. [Home Page Components](#home-page-components)
4. [Product Components](#product-components)
5. [Booking Components](#booking-components)
6. [Form Components](#form-components)
7. [Shared Components](#shared-components)
8. [UI Components (Shadcn)](#ui-components-shadcn)
9. [Component Guidelines](#component-guidelines)

---

## Component Architecture

### Design Principles

- **Atomic Design**: Components follow atomic design principles (atoms, molecules, organisms)
- **Reusability**: Components are built to be reusable across the application
- **Type Safety**: All components are fully typed with TypeScript
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive design using Tailwind CSS
- **Performance**: Optimized with React.memo where appropriate

### Folder Structure
```
src/components/
├── layout/          # Layout components (Header, Footer, etc.)
├── home/            # Home page specific components
├── products/        # Product listing components
├── product/         # Product detail components
├── booking/         # Appointment booking components
├── forms/           # Form components
├── ui/              # Shadcn UI components
└── shared/          # Shared utility components
```

---

## Layout Components

### Header

**Location**: `src/components/layout/Header/index.tsx`

Main navigation header with responsive design.

#### Props
```typescript
interface HeaderProps {
  className?: string;
}
```

#### Usage
```tsx
import { Header } from '@/components/layout/Header';

<Header />
```

#### Features

- Desktop navigation with mega menu
- Mobile hamburger menu
- Search functionality
- User menu with authentication state
- Sticky header on scroll

---

### DesktopNav

**Location**: `src/components/layout/Header/DesktopNav.tsx`

Desktop navigation menu.

#### Props
```typescript
interface DesktopNavProps {
  className?: string;
}
```

#### Usage
```tsx
import { DesktopNav } from '@/components/layout/Header/DesktopNav';

<DesktopNav />
```

#### Features

- Horizontal navigation
- Mega menu support
- Active link highlighting
- Dropdown menus

---

### MobileNav

**Location**: `src/components/layout/Header/MobileNav.tsx`

Mobile navigation drawer.

#### Props
```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}
```

#### Usage
```tsx
import { MobileNav } from '@/components/layout/Header/MobileNav';

<MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
```

#### Features

- Side drawer navigation
- Collapsible menu sections
- Search integration
- User account access

---

### MegaMenu

**Location**: `src/components/layout/Header/MegaMenu.tsx`

Dropdown mega menu for categories.

#### Props
```typescript
interface MegaMenuProps {
  category: 'kitchen' | 'bedroom';
  isOpen: boolean;
  onClose: () => void;
}
```

#### Usage
```tsx
import { MegaMenu } from '@/components/layout/Header/MegaMenu';

<MegaMenu 
  category="kitchen" 
  isOpen={isKitchenMenuOpen} 
  onClose={() => setIsKitchenMenuOpen(false)} 
/>
```

#### Features

- Multi-column layout
- Category images
- Featured products
- Quick links

---

### SearchBar

**Location**: `src/components/layout/Header/SearchBar.tsx`

Global search functionality.

#### Props
```typescript
interface SearchBarProps {
  placeholder?: string;
  className?: string;
}
```

#### Usage
```tsx
import { SearchBar } from '@/components/layout/Header/SearchBar';

<SearchBar placeholder="Search for kitchens, bedrooms..." />
```

#### Features

- Real-time search suggestions
- Recent searches
- Product quick preview
- Keyboard navigation

---

### Footer

**Location**: `src/components/layout/Footer/index.tsx`

Site footer with links and newsletter.

#### Props
```typescript
interface FooterProps {
  className?: string;
}
```

#### Usage
```tsx
import { Footer } from '@/components/layout/Footer';

<Footer />
```

#### Features

- Multi-column link sections
- Newsletter subscription
- Social media links
- Contact information
- Copyright notice

---

### NewsletterForm

**Location**: `src/components/layout/Footer/NewsletterForm.tsx`

Newsletter subscription form.

#### Props
```typescript
interface NewsletterFormProps {
  variant?: 'footer' | 'inline';
  className?: string;
}
```

#### Usage
```tsx
import { NewsletterForm } from '@/components/layout/Footer/NewsletterForm';

<NewsletterForm variant="footer" />
```

#### Features

- Email validation
- Success/error states
- Loading indicator
- GDPR compliance checkbox

---

### Breadcrumb

**Location**: `src/components/layout/Breadcrumb.tsx`

Breadcrumb navigation component.

#### Props
```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

#### Usage
```tsx
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Kitchen', href: '/kitchen' },
  { label: 'Modern L-Shaped' }
];

<Breadcrumb items={items} />
```

---

## Home Page Components

### Hero

**Location**: `src/components/home/Hero/index.tsx`

Hero section with slider/video background.

#### Props
```typescript
interface HeroProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
}

interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
}
```

#### Usage
```tsx
import { Hero } from '@/components/home/Hero';

const slides = [
  {
    id: '1',
    type: 'image',
    src: '/images/hero/hero-1.jpg',
    title: 'Transform Your Kitchen',
    subtitle: 'Modern designs tailored for you',
    cta: { text: 'Explore Now', href: '/kitchen' }
  }
];

<Hero slides={slides} autoPlay interval={5000} />
```

#### Features

- Image/video slider
- Auto-play with controls
- Responsive design
- Smooth transitions
- CTA buttons

---

### ExploreKitchen

**Location**: `src/components/home/ExploreKitchen/index.tsx`

Kitchen category exploration section.

#### Props
```typescript
interface ExploreKitchenProps {
  categories: CategoryData[];
  className?: string;
}

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}
```

#### Usage
```tsx
import { ExploreKitchen } from '@/components/home/ExploreKitchen';

<ExploreKitchen categories={kitchenCategories} />
```

#### Features

- Grid layout
- Category cards
- Hover effects
- Product count display

---

### ExploreBedroom

**Location**: `src/components/home/ExploreBedroom/index.tsx`

Bedroom category exploration section.

#### Props
```typescript
interface ExploreBedroomProps {
  categories: CategoryData[];
  className?: string;
}
```

#### Usage
```tsx
import { ExploreBedroom } from '@/components/home/ExploreBedroom';

<ExploreBedroom categories={bedroomCategories} />
```

---

### ColorOptions

**Location**: `src/components/home/ColorOptions/index.tsx`

Color palette showcase section.

#### Props
```typescript
interface ColorOptionsProps {
  colors: ColorOption[];
  onColorSelect?: (color: ColorOption) => void;
}

interface ColorOption {
  id: string;
  name: string;
  code: string;
  image: string;
  popular?: boolean;
}
```

#### Usage
```tsx
import { ColorOptions } from '@/components/home/ColorOptions';

const colors = [
  { id: '1', name: 'White', code: '#FFFFFF', image: '/colors/white.jpg' },
  { id: '2', name: 'Black', code: '#000000', image: '/colors/black.jpg' }
];

<ColorOptions colors={colors} />
```

#### Features

- Color swatches
- Visual preview
- Interactive selection
- Popular colors highlighted

---

### OfferSection

**Location**: `src/components/home/OfferSection/index.tsx`

Current offers and promotions.

#### Props
```typescript
interface OfferSectionProps {
  offers: Offer[];
  autoSlide?: boolean;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaLink: string;
}
```

#### Usage
```tsx
import { OfferSection } from '@/components/home/OfferSection';

<OfferSection offers={currentOffers} autoSlide />
```

#### Features

- Offer cards
- Countdown timer
- Slider functionality
- Terms & conditions modal

---

### PackageSection

**Location**: `src/components/home/PackageSection/index.tsx`

Product packages showcase.

#### Props
```typescript
interface PackageSectionProps {
  packages: Package[];
  onPackageSelect?: (packageId: string) => void;
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  image: string;
  popular?: boolean;
}
```

#### Usage
```tsx
import { PackageSection } from '@/components/home/PackageSection';

<PackageSection packages={packages} />
```

#### Features

- Package comparison
- Feature lists
- Price display
- Popular badge
- CTA buttons

---

### MediaWall

**Location**: `src/components/home/MediaWall/index.tsx`

Media gallery section.

#### Props
```typescript
interface MediaWallProps {
  media: MediaItem[];
  layout?: 'grid' | 'masonry';
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
  category?: string;
}
```

#### Usage
```tsx
import { MediaWall } from '@/components/home/MediaWall';

<MediaWall media={mediaItems} layout="masonry" />
```

#### Features

- Image/video grid
- Lightbox view
- Filter by category
- Lazy loading

---

### FinanceSection

**Location**: `src/components/home/FinanceSection/index.tsx`

Finance options showcase.

#### Props
```typescript
interface FinanceSectionProps {
  options: FinanceOption[];
  calculatorEnabled?: boolean;
}

interface FinanceOption {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  tenure: number[];
  icon: string;
}
```

#### Usage
```tsx
import { FinanceSection } from '@/components/home/FinanceSection';

<FinanceSection options={financeOptions} calculatorEnabled />
```

#### Features

- Finance cards
- EMI calculator
- Apply CTA
- Terms display

---

### OurProcess

**Location**: `src/components/home/OurProcess/index.tsx`

Process steps visualization.

#### Props
```typescript
interface OurProcessProps {
  steps: ProcessStep[];
  className?: string;
}

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}
```

#### Usage
```tsx
import { OurProcess } from '@/components/home/OurProcess';

const steps = [
  {
    id: '1',
    title: 'Consultation',
    description: 'Free design consultation',
    icon: 'calendar',
    order: 1
  }
];

<OurProcess steps={steps} />
```

#### Features

- Step indicators
- Icons
- Responsive layout
- Visual connectors

---

### WhyChooseUs

**Location**: `src/components/home/WhyChooseUs/index.tsx`

Benefits and features section.

#### Props
```typescript
interface WhyChooseUsProps {
  features: Feature[];
  className?: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}
```

#### Usage
```tsx
import { WhyChooseUs } from '@/components/home/WhyChooseUs';

<WhyChooseUs features={features} />
```

---

### Projects

**Location**: `src/components/home/Projects/index.tsx`

Completed projects showcase.

#### Props
```typescript
interface ProjectsProps {
  projects: Project[];
  showFilter?: boolean;
}

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  year: number;
}
```

#### Usage
```tsx
import { Projects } from '@/components/home/Projects';

<Projects projects={completedProjects} showFilter />
```

#### Features

- Project grid
- Category filter
- Hover effects
- View more link

---

### Testimonials

**Location**: `src/components/home/Testimonials/index.tsx`

Customer testimonials slider.

#### Props
```typescript
interface TestimonialsProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}
```

#### Usage
```tsx
import { Testimonials } from '@/components/home/Testimonials';

<Testimonials testimonials={reviews} autoPlay />
```

#### Features

- Slider/carousel
- Star ratings
- Customer photos
- Auto-play option

---

## Product Components

### ProductCard

**Location**: `src/components/products/ProductCard/index.tsx`

Individual product card for listing pages.

#### Props
```typescript
interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
  onWishlistToggle?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
  salePrice?: number;
  isFeatured: boolean;
}
```

#### Usage
```tsx
import { ProductCard } from '@/components/products/ProductCard';

<ProductCard 
  product={product} 
  variant="grid"
  onWishlistToggle={handleWishlist}
  onQuickView={handleQuickView}
/>
```

#### Features

- Image display
- Price information
- Rating display
- Wishlist toggle
- Quick view button
- Sale badge
- Hover effects

---

### ProductGrid

**Location**: `src/components/products/ProductGrid/index.tsx`

Grid/list view for products.

#### Props
```typescript
interface ProductGridProps {
  products: Product[];
  view: 'grid' | 'list';
  loading?: boolean;
  onProductClick?: (productId: string) => void;
}
```

#### Usage
```tsx
import { ProductGrid } from '@/components/products/ProductGrid';

<ProductGrid 
  products={products} 
  view={viewMode}
  loading={isLoading}
/>
```

#### Features

- Responsive grid
- List view option
- Loading states
- Empty state

---

### Filters

**Location**: `src/components/products/Filters/index.tsx`

Product filtering sidebar.

#### Props
```typescript
interface FiltersProps {
  filters: FilterConfig;
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  onReset: () => void;
}

interface FilterConfig {
  colors: ColorFilter[];
  styles: StyleFilter[];
  finishes: FinishFilter[];
  priceRange: PriceRangeFilter;
}
```

#### Usage
```tsx
import { Filters } from '@/components/products/Filters';

<Filters 
  filters={filterConfig}
  activeFilters={activeFilters}
  onFilterChange={handleFilterChange}
  onReset={handleReset}
/>
```

#### Features

- Color filter
- Style filter
- Finish filter
- Price range slider
- Active filter display
- Clear filters button

---

### FilterSidebar

**Location**: `src/components/products/Filters/FilterSidebar.tsx`

Collapsible filter sidebar for mobile.

#### Props
```typescript
interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
```

#### Usage
```tsx
import { FilterSidebar } from '@/components/products/Filters/FilterSidebar';

<FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
  <Filters {...filterProps} />
</FilterSidebar>
```

---

### ColorFilter

**Location**: `src/components/products/Filters/ColorFilter.tsx`

Color selection filter.

#### Props
```typescript
interface ColorFilterProps {
  colors: ColorOption[];
  selected: string[];
  onChange: (colors: string[]) => void;
}
```

#### Usage
```tsx
import { ColorFilter } from '@/components/products/Filters/ColorFilter';

<ColorFilter 
  colors={availableColors}
  selected={selectedColors}
  onChange={handleColorChange}
/>
```

---

### PriceRangeFilter

**Location**: `src/components/products/Filters/PriceRangeFilter.tsx`

Price range slider filter.

#### Props
```typescript
interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}
```

#### Usage
```tsx
import { PriceRangeFilter } from '@/components/products/Filters/PriceRangeFilter';

<PriceRangeFilter 
  min={0}
  max={500000}
  value={priceRange}
  onChange={handlePriceChange}
/>
```

---

### ProductSort

**Location**: `src/components/products/ProductSort.tsx`

Product sorting dropdown.

#### Props
```typescript
interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  options?: SortOption[];
}

type SortOption = 
  | 'price_asc' 
  | 'price_desc' 
  | 'newest' 
  | 'popular' 
  | 'rating';
```

#### Usage
```tsx
import { ProductSort } from '@/components/products/ProductSort';

<ProductSort 
  value={sortBy}
  onChange={handleSortChange}
/>
```

---

### ViewToggle

**Location**: `src/components/products/ViewToggle.tsx`

Grid/List view toggle.

#### Props
```typescript
interface ViewToggleProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}
```

#### Usage
```tsx
import { ViewToggle } from '@/components/products/ViewToggle';

<ViewToggle view={viewMode} onChange={setViewMode} />
```

---

## Product Detail Components

### ImageGallery

**Location**: `src/components/product/ImageGallery/index.tsx`

Product image gallery with zoom.

#### Props
```typescript
interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}
```

#### Usage
```tsx
import { ImageGallery } from '@/components/product/ImageGallery';

<ImageGallery images={product.images} productName={product.name} />
```

#### Features

- Main image display
- Thumbnail navigation
- Zoom on hover
- 360° view support
- Lightbox mode
- Mobile swipe

---

### ProductInfo

**Location**: `src/components/product/ProductInfo/index.tsx`

Product information section.

#### Props
```typescript
interface ProductInfoProps {
  product: ProductDetail;
  onColorSelect?: (colorId: string) => void;
  onFinishSelect?: (finishId: string) => void;
}
```

#### Usage
```tsx
import { ProductInfo } from '@/components/product/ProductInfo';

<ProductInfo 
  product={productDetail}
  onColorSelect={handleColorSelect}
  onFinishSelect={handleFinishSelect}
/>
```

#### Features

- Product title
- Description
- Color selector
- Finish selector
- Price calculator
- Size calculator
- Rating display

---

### ColorSelector

**Location**: `src/components/product/ProductInfo/ColorSelector.tsx`

Color selection component.

#### Props
```typescript
interface ColorSelectorProps {
  colors: Color[];
  selected: string;
  onChange: (colorId: string) => void;
}
```

#### Usage
```tsx
import { ColorSelector } from '@/components/product/ProductInfo/ColorSelector';

<ColorSelector 
  colors={product.colors}
  selected={selectedColor}
  onChange={handleColorChange}
/>
```

---

### FinishSelector

**Location**: `src/components/product/ProductInfo/FinishSelector.tsx`

Finish selection component.

#### Props
```typescript
interface FinishSelectorProps {
  finishes: Finish[];
  selected: string;
  onChange: (finishId: string) => void;
}
```

#### Usage
```tsx
import { FinishSelector } from '@/components/product/ProductInfo/FinishSelector';

<FinishSelector 
  finishes={product.finishes}
  selected={selectedFinish}
  onChange={handleFinishChange}
/>
```

---

### PriceCalculator

**Location**: `src/components/product/ProductInfo/PriceCalculator.tsx`

Dynamic price calculator.

#### Props
```typescript
interface PriceCalculatorProps {
  basePrice: number;
  options: PriceOption[];
  onCalculate?: (totalPrice: number) => void;
}

interface PriceOption {
  id: string;
  label: string;
  price: number;
  selected: boolean;
}
```

#### Usage
```tsx
import { PriceCalculator } from '@/components/product/ProductInfo/PriceCalculator';

<PriceCalculator 
  basePrice={product.price.base}
  options={priceOptions}
  onCalculate={handlePriceCalculate}
/>
```

---

### ProductActions

**Location**: `src/components/product/ProductActions/index.tsx`

Product action buttons.

#### Props
```typescript
interface ProductActionsProps {
  productId: string;
  onBookConsultation: () => void;
  onRequestQuote: () => void;
  onShare?: () => void;
}
```

#### Usage
```tsx
import { ProductActions } from '@/components/product/ProductActions';

<ProductActions 
  productId={product.id}
  onBookConsultation={handleBooking}
  onRequestQuote={handleQuote}
/>
```

#### Features

- Book consultation button
- Request quote button
- Share button
- Add to wishlist

---

### Reviews

**Location**: `src/components/product/Reviews/index.tsx`

Product reviews section.

#### Props
```typescript
interface ReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onSubmitReview?: (review: ReviewFormData) => void;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
```

#### Usage
```tsx
import { Reviews } from '@/components/product/Reviews';

<Reviews 
  productId={product.id}
  reviews={reviews}
  averageRating={product.rating}
  totalReviews={product.reviewCount}
/>
```

#### Features

- Rating summary
- Review list
- Review form
- Sort/filter reviews
- Verified purchase badge

---

### RelatedProducts

**Location**: `src/components/product/RelatedProducts.tsx`

Related products carousel.

#### Props
```typescript
interface RelatedProductsProps {
  products: Product[];
  title?: string;
}
```

#### Usage
```tsx
import { RelatedProducts } from '@/components/product/RelatedProducts';

<RelatedProducts 
  products={relatedProducts}
  title="You May Also Like"
/>
```

---

### ProductSpecs

**Location**: `src/components/product/ProductSpecs.tsx`

Product specifications table.

#### Props
```typescript
interface ProductSpecsProps {
  specifications: Specification[];
}

interface Specification {
  label: string;
  value: string;
}
```

#### Usage
```tsx
import { ProductSpecs } from '@/components/product/ProductSpecs';

<ProductSpecs specifications={product.specifications} />
```

---

## Booking Components

### BookingWizard

**Location**: `src/components/booking/BookingWizard/index.tsx`

Multi-step booking wizard.

#### Props
```typescript
interface BookingWizardProps {
  onComplete: (data: BookingData) => void;
  onCancel?: () => void;
}
```

#### Usage
```tsx
import { BookingWizard } from '@/components/booking/BookingWizard';

<BookingWizard 
  onComplete={handleBookingComplete}
  onCancel={handleCancel}
/>
```

#### Features

- Multi-step form
- Step indicator
- Form validation
- Progress saving
- Navigation controls

---

### StepIndicator

**Location**: `src/components/booking/BookingWizard/StepIndicator.tsx`

Visual step progress indicator.

#### Props
```typescript
interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

interface Step {
  id: string;
  title: string;
  completed: boolean;
}
```

#### Usage
```tsx
import { StepIndicator } from '@/components/booking/BookingWizard/StepIndicator';

<StepIndicator steps={bookingSteps} currentStep={activeStep} />
```

---

### DateTimePicker

**Location**: `src/components/booking/Steps/DateTimePicker.tsx`

Date and time selection component.

#### Props
```typescript
interface DateTimePickerProps {
  selectedDate?: Date;
  selectedTime?: string;
  availableSlots: TimeSlot[];
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}
```

#### Usage
```tsx
import { DateTimePicker } from '@/components/booking/Steps/DateTimePicker';

<DateTimePicker 
  selectedDate={date}
  selectedTime={time}
  availableSlots={slots}
  onDateChange={handleDateChange}
  onTimeChange={handleTimeChange}
/>
```

---

### Calendar

**Location**: `src/components/booking/Calendar/index.tsx`

Custom calendar component.

#### Props
```typescript
interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}
```

#### Usage
```tsx
import { Calendar } from '@/components/booking/Calendar';

<Calendar 
  selected={selectedDate}
  onSelect={handleDateSelect}
  minDate={new Date()}
  disabledDates={unavailableDates}
/>
```

---

## Form Components

### BrochureForm

**Location**: `src/components/forms/BrochureForm/index.tsx`

Brochure request form.

#### Props
```typescript
interface BrochureFormProps {
  onSuccess?: (data: BrochureFormData) => void;
  className?: string;
}
```

#### Usage
```tsx
import { BrochureForm } from '@/components/forms/BrochureForm';

<BrochureForm onSuccess={handleSuccess} />
```

#### Features

- Form validation (Zod)
- Loading states
- Success message
- Error handling
- Download link

---

### BusinessForm

**Location**: `src/components/forms/BusinessForm/index.tsx`

Business partnership inquiry form.

#### Props
```typescript
interface BusinessFormProps {
  onSuccess?: (data: BusinessFormData) => void;
  className?: string;
}
```

#### Usage
```tsx
import { BusinessForm } from '@/components/forms/BusinessForm';

<BusinessForm onSuccess={handleSuccess} />
```

---

### ContactForm

**Location**: `src/components/forms/ContactForm/index.tsx`

General contact form.

#### Props
```typescript
interface ContactFormProps {
  subject?: string;
  onSuccess?: (data: ContactFormData) => void;
  className?: string;
}
```

#### Usage
```tsx
import { ContactForm } from '@/components/forms/ContactForm';

<ContactForm subject="General Inquiry" onSuccess={handleSuccess} />
```

---

### FormField

**Location**: `src/components/forms/FormField.tsx`

Reusable form field component.

#### Props
```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}
```

#### Usage
```tsx
import { FormField } from '@/components/forms/FormField';

<FormField 
  label="Email Address"
  name="email"
  type="email"
  required
  error={errors.email}
  placeholder="your@email.com"
/>
```

---

### FileUpload

**Location**: `src/components/forms/FileUpload.tsx`

File upload component.

#### Props
```typescript
interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
  error?: string;
}
```

#### Usage
```tsx
import { FileUpload } from '@/components/forms/FileUpload';

<FileUpload 
  accept="image/*"
  maxSize={5242880}
  onUpload={handleFileUpload}
/>
```

---

## Shared Components

### PageLoader

**Location**: `src/components/shared/PageLoader.tsx`

Full-page loading indicator.

#### Props
```typescript
interface PageLoaderProps {
  message?: string;
}
```

#### Usage
```tsx
import { PageLoader } from '@/components/shared/PageLoader';

<PageLoader message="Loading products..." />
```

---

### LoadingSpinner

**Location**: `src/components/shared/LoadingSpinner.tsx`

Inline loading spinner.

#### Props
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

#### Usage
```tsx
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

<LoadingSpinner size="md" />
```

---

### EmptyState

**Location**: `src/components/shared/EmptyState.tsx`

Empty state placeholder.