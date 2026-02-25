import { 
  Shield, 
  Truck, 
  Award, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import DeliveryInfo from '@/components/product/DeliveryInfo';
import ImageGallery from '@/components/product/ImageGallery';
import ProductActions from '@/components/product/ProductActions';
import ProductInfo from '@/components/product/ProductInfo';
import ProductSpecs from '@/components/product/ProductSpecs';
import RelatedProducts from '@/components/product/RelatedProducts';
import Reviews from '@/components/product/Reviews';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';


interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params: _params,
}: ProductPageProps): Promise<Metadata> {

  const product = {
    title: 'Modern Kitchen Cabinet',
    description: 'Premium quality kitchen cabinet with soft-close doors and adjustable shelves',
  };

  return {
    title: `${product.title} | Lomash Wood`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Lomash Wood`,
      description: product.description,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const productId = params.id;

  const mockProduct = {
    id: productId,
    name: 'Modern Kitchen Cabinet',
    slug: 'modern-kitchen-cabinet',
    description: 'Premium quality kitchen cabinet with soft-close doors and adjustable shelves',
    sku: 'MKC-001',
    category: { id: 'kitchen', name: 'Kitchen', slug: 'kitchen' },
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Modern Kitchen Cabinet', isPrimary: true, order: 0 },
      { id: '2', url: 'https://plus.unsplash.com/premium_photo-1678375722686-c7ea507c3003?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Modern Kitchen Cabinet', isPrimary: false, order: 1 },
      { id: '3', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Modern Kitchen Cabinet', isPrimary: false, order: 2 },
    ],
    price: 25000,
    inStock: true,
    specifications: [],
    materials: ['Wood'],
    finishes: ['Matte'],
    colors: ['Brown'],
    tags: [],
    status: 'published' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-18 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/kitchen" className="hover:text-foreground transition-colors">
              Kitchen
            </Link>
            <span>/</span>
            <span className="text-foreground">Product Details</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-18 py-8 lg:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Suspense fallback={<ImageGallerySkeleton />}>
              <ImageGallery images={mockProduct.images} productName={mockProduct.name} />
            </Suspense>
          </div>

          {/* Product Info & Actions */}
          <div className="space-y-6">
            <Suspense fallback={<ProductInfoSkeleton />}>
              <ProductInfo product={mockProduct} />
            </Suspense>

            <Separator />

            <Suspense fallback={<ProductActionsSkeleton />}>
              <ProductActions product={mockProduct} />
            </Suspense>

            {/* Trust Badges */}
            <Card className="p-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lifetime Warranty</p>
                    <p className="text-xs text-muted-foreground">Quality guaranteed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">On all orders</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Premium Quality</p>
                    <p className="text-xs text-muted-foreground">Certified materials</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Expert Install</p>
                    <p className="text-xs text-muted-foreground">Professional service</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Features */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">What's Included</h3>
              <ul className="space-y-3">
                {[
                  'Free design consultation',
                  'Professional installation',
                  'Lifetime warranty on all hardware',
                  'Free delivery and removal of packaging',
                  '5-year manufacturer guarantee',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="delivery"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Delivery & Returns
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="description" className="mt-0">
              <div className="prose prose-sm max-w-none">
                <Suspense fallback={<DescriptionSkeleton />}>
                  <ProductDescription productId={productId} />
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <Suspense fallback={<SpecsSkeleton />}>
                <ProductSpecs />
              </Suspense>
            </TabsContent>

            <TabsContent value="delivery" className="mt-0">
              <Suspense fallback={<DeliverySkeleton />}>
                <DeliveryInfo />
              </Suspense>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <Suspense fallback={<ReviewsSkeleton />}>
                <Reviews 
                  productId={productId}
                  averageRating={4.5}
                  totalReviews={0}
                  ratingDistribution={{ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }}
                  reviews={[]}
                />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">You May Also Like</h2>
          </div>
          <Suspense fallback={<RelatedProductsSkeleton />}>
            <RelatedProducts productId={productId} />
          </Suspense>
        </div>

        {/* Final CTA */}
        <Card className="p-6 lg:p-8 bg-primary/5 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our expert designers are ready to help you create the perfect space. 
            Book a free consultation or visit our showroom today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book Free Consultation
            </Link>
            <Link 
              href="/showrooms"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Find a Showroom
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProductDescription({ productId: _productId }: { productId: string }) {
  return (
    <div className="space-y-4">
      <p>
        This premium kitchen cabinet combines elegant design with exceptional functionality. 
        Crafted from high-quality materials, it features soft-close doors and adjustable shelving 
        to meet all your storage needs.
      </p>
      <p>
        Each unit is made to measure, ensuring a perfect fit for your space. Choose from our 
        extensive range of colours and finishes to create a kitchen that truly reflects your style.
      </p>
      <h4 className="font-semibold mt-6 mb-3">Key Features:</h4>
      <ul className="list-disc list-inside space-y-2">
        <li>Soft-close doors and drawers as standard</li>
        <li>Adjustable shelving for flexible storage</li>
        <li>Durable, easy-to-clean surfaces</li>
        <li>Available in multiple colours and finishes</li>
        <li>Made-to-measure service available</li>
      </ul>
    </div>
  );
}

function ImageGallerySkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted animate-pulse rounded-lg" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function ProductInfoSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
      <div className="h-6 bg-muted animate-pulse rounded w-1/4" />
      <div className="h-4 bg-muted animate-pulse rounded w-full" />
      <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
      <div className="h-10 bg-muted animate-pulse rounded w-32" />
    </div>
  );
}

function ProductActionsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-12 bg-muted animate-pulse rounded" />
      <div className="h-12 bg-muted animate-pulse rounded" />
    </div>
  );
}

function DescriptionSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 bg-muted animate-pulse rounded" />
      ))}
    </div>
  );
}

function SpecsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex justify-between border-b pb-3">
          <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

function DeliverySkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-4 bg-muted animate-pulse rounded" />
      ))}
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3 border-b pb-6">
          <div className="h-5 bg-muted animate-pulse rounded w-32" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}

function RelatedProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}