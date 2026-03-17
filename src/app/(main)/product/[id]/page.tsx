import { Shield, Truck, Award, Clock, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import DeliveryInfo from '@/components/product/DeliveryInfo';
import ImageGallery from '@/components/product/ImageGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import RelatedProducts from '@/components/product/RelatedProducts';
import Reviews from '@/components/product/Reviews';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PageParams = { id: string };

interface ProductPageProps {
  params: PageParams | Promise<PageParams>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface ApiProduct {
  id: string;
  title?: string;
  name?: string;
  slug?: string;
  description?: string;
  category?: 'kitchen' | 'bedroom' | string;
  style?: string;
  finish?: string;
  rangeName?: string;
  price?: number;
  images?: string[];
  isPublished?: boolean;
  inStock?: boolean;
  colours?: Array<{ id?: string; name?: string; hexCode?: string }>;
  sizes?: Array<{ id?: string; title?: string; description?: string }>;
  package?: {
    id?: string;
    title?: string;
    description?: string;
    features?: string[];
    price?: number;
  } | null;
  rating?: number;
  reviewCount?: number;
}

const normalizeIdentifier = (raw: string) => decodeURIComponent(raw || '').trim();

const toAbsoluteImage = (url: string): string => {
  if (!url) return '/images/placeholder-product.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `https://lomashwood-backend.vercel.app${url}`;
  return url;
};

async function fetchProductById(id: string): Promise<ApiProduct | null> {
  const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  const urlsToTry: string[] = [];

  if (configuredBase) {
    if (configuredBase.endsWith('/api/v1')) {
      urlsToTry.push(`${configuredBase}/products/${id}`);
    } else if (configuredBase.endsWith('/api')) {
      urlsToTry.push(`${configuredBase}/v1/products/${id}`);
    } else {
      urlsToTry.push(`${configuredBase}/api/v1/products/${id}`);
      urlsToTry.push(`${configuredBase}/products/${id}`);
    }
  }

  urlsToTry.push(`https://lomashwood-backend.vercel.app/api/v1/products/${id}`);

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, { next: { revalidate: 120 } });
      if (!response.ok) continue;

      const payload = await response.json();
      const product = (payload?.data ?? payload) as ApiProduct;
      if (product?.id) {
        return product;
      }
    } catch {
      continue;
    }
  }

  return null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const productId = normalizeIdentifier(resolvedParams.id);
  const product = await fetchProductById(productId);

  if (!product) {
    return {
      title: 'Product Not Found | Lomash Wood',
      description: 'The requested product could not be found.',
    };
  }

  const title = product.title || product.name || 'Product Details';
  const description = product.description || 'Premium product details from Lomash Wood.';

  return {
    title: `${title} | Lomash Wood`,
    description,
    openGraph: {
      title: `${title} | Lomash Wood`,
      description,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const productId = normalizeIdentifier(resolvedParams.id);
  const product = await fetchProductById(productId);

  if (!product) {
    notFound();
  }

  const productName = product.title || product.name || 'Product';
  const category = product.category || 'kitchen';
  const style = product.style || '';
  const finish = product.finish || '';
  const description = product.description || 'No product description available.';
  const imageUrls = (product.images && product.images.length > 0)
    ? product.images.map(toAbsoluteImage)
    : ['/images/placeholder-product.jpg'];

  const galleryImages = imageUrls.map((url, index) => ({
    id: `${product.id}-img-${index}`,
    url,
    alt: `${productName} ${index + 1}`,
  }));

  const colorNames = (product.colours || []).map((colour) => colour.name || '').filter(Boolean);
  const sizeTitles = (product.sizes || []).map((size) => size.title || '').filter(Boolean);
  const packageFeatures = product.package?.features || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-8 lg:px-18 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${category}`} className="hover:text-foreground transition-colors capitalize">{category}</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{productName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-18 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageGallery images={galleryImages} productName={productName} />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="capitalize">{category}</Badge>
                {style && style !== '0' && <Badge variant="outline">{style}</Badge>}
                {!product.isPublished && <Badge variant="destructive">Unpublished</Badge>}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{productName}</h1>

              {typeof product.price === 'number' ? (
                <p className="text-2xl font-semibold text-primary">£{product.price.toLocaleString('en-GB')}</p>
              ) : (
                <p className="text-lg text-muted-foreground">Price on request</p>
              )}

              {finish && finish !== '0' && (
                <p className="text-sm text-muted-foreground">
                  Finish: <span className="font-medium text-foreground capitalize">{finish}</span>
                </p>
              )}

              {product.package?.title && (
                <p className="text-sm text-muted-foreground">
                  Package: <span className="font-medium text-foreground">{product.package.title}</span>
                </p>
              )}

              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className={`rounded-lg border p-3 ${product.inStock === false ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'}`}>
                <p className="font-medium">Availability</p>
                <p className="text-muted-foreground">{product.inStock === false ? 'Contact us for availability' : 'In stock'}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="font-medium">Product ID</p>
                <p className="text-muted-foreground break-all">{product.id}</p>
              </div>
            </div>

            {colorNames.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Available Colours</h3>
                <div className="flex flex-wrap gap-2">
                  {colorNames.map((name) => (
                    <Badge key={name} variant="outline">{name}</Badge>
                  ))}
                </div>
              </Card>
            )}

            {sizeTitles.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizeTitles.map((title) => (
                    <Badge key={title} variant="outline">{title}</Badge>
                  ))}
                </div>
              </Card>
            )}

            {packageFeatures.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {packageFeatures.map((feature, index) => (
                    <li key={`${feature}-${index}`} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

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

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/book-appointment?product=${product.id}&category=${category}`}
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
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="delivery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Delivery & Returns
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              Reviews
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="description" className="mt-0">
              <div className="prose prose-sm max-w-none">
                <p>{description}</p>
                {product.package?.description && <p>{product.package.description}</p>}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <ProductSpecs
                material={product.rangeName}
                finish={finish ? [finish] : []}
                colors={colorNames}
                features={packageFeatures.map((feature) => ({ name: feature }))}
              />
            </TabsContent>

            <TabsContent value="delivery" className="mt-0">
              <DeliveryInfo />
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <Reviews
                productId={product.id}
                averageRating={product.rating || 0}
                totalReviews={product.reviewCount || 0}
                ratingDistribution={{ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }}
                reviews={[]}
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">You May Also Like</h2>
          </div>
          <RelatedProducts productId={product.id} category={category} style={style} />
        </div>
      </div>
    </div>
  );
}
