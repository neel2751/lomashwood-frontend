import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ImageGallery from '@/components/product/ImageGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import RelatedProducts from '@/components/product/RelatedProducts';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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

interface ProductColour {
  id?: string;
  name?: string;
  hexCode?: string;
}

const normalizeIdentifier = (raw: string) => decodeURIComponent(raw || '').trim();

const toAbsoluteImage = (url: string): string => {
  if (!url) return '/images/placeholder-product.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `https://lomashwood-backend.vercel.app${url}`;
  return url;
};

const descriptionBlocklist = [
  /shipping/i,
  /return\s*&?\s*warranty/i,
  /customi[sz]ation options?/i,
];

const shouldHideContent = (text?: string): boolean => {
  if (!text) return false;
  return descriptionBlocklist.some((pattern) => pattern.test(text));
};

const sanitizeDescription = (text?: string): string => {
  if (!text) return '';

  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !descriptionBlocklist.some((pattern) => pattern.test(line)))
    .join('\n\n');
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
  const description = sanitizeDescription(product.description || 'No product description available.');
  const packageDescription = sanitizeDescription(product.package?.description);
  const imageUrls = (product.images && product.images.length > 0)
    ? product.images.map(toAbsoluteImage)
    : ['/images/placeholder-product.jpg'];

  const galleryImages = imageUrls.map((url, index) => ({
    id: `${product.id}-img-${index}`,
    url,
    alt: `${productName} ${index + 1}`,
  }));

  const productColours = (product.colours || []) as ProductColour[];
  const colorNames = Array.from(new Set(productColours.map((colour) => colour.name || '').filter(Boolean)));
  const sizeTitles = Array.from(new Set((product.sizes || []).map((size) => size.title || '').filter(Boolean)));
  const packageFeatures = (product.package?.features || []).filter((feature) => !shouldHideContent(feature));
  const highlights = [
    style && style !== '0' ? { label: 'Style', value: style } : null,
    finish && finish !== '0' ? { label: 'Finish', value: finish } : null,
    product.rangeName ? { label: 'Range', value: product.rangeName } : null,
    colorNames.length > 0 ? { label: 'Colours', value: `${colorNames.length} options` } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-t bg-gradient-to-b from-muted/70 to-background">
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
            <Card className="border-primary/10 bg-card/90 p-6 shadow-sm">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">Bespoke Collection</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="capitalize">{category}</Badge>
                {style && style !== '0' && <Badge variant="outline">{style}</Badge>}
                {!product.isPublished && <Badge variant="destructive">Unpublished</Badge>}
              </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">{productName}</h1>

                {typeof product.price === 'number' ? (
                  <p className="text-3xl font-semibold text-primary">£{product.price.toLocaleString('en-GB')}</p>
                ) : (
                  <p className="text-lg text-muted-foreground">Price on request</p>
                )}

                <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {finish && finish !== '0' && (
                    <p>
                      Finish: <span className="font-medium text-foreground capitalize">{finish}</span>
                    </p>
                  )}

                  {product.package?.title && (
                    <p>
                      Package: <span className="font-medium text-foreground">{product.package.title}</span>
                    </p>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">{description}</p>

                {highlights.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {highlights.map((item) => (
                      <div key={item.label} className="rounded-lg border border-primary/10 bg-background/80 p-3">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                        <p className="mt-1 text-sm font-medium text-foreground capitalize">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {colorNames.length > 0 && (
              <Card className="p-5 border-primary/10">
                <h3 className="font-semibold mb-2">Available Colours</h3>
                <div className="flex flex-wrap gap-2.5">
                  {productColours.map((colour) => {
                    const label = colour.name || 'Colour';
                    const hex = colour.hexCode;

                    return (
                      <span
                        key={colour.id || label}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/10"
                          style={{ backgroundColor: hex || '#D4D4D8' }}
                          aria-hidden="true"
                        />
                        {label}
                      </span>
                    );
                  })}
                </div>
              </Card>
            )}

            {sizeTitles.length > 0 && (
              <Card className="p-5 border-primary/10">
                <h3 className="font-semibold mb-2">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizeTitles.map((title) => (
                    <Badge key={title} variant="outline">{title}</Badge>
                  ))}
                </div>
              </Card>
            )}

            {packageFeatures.length > 0 && (
              <Card className="p-6 border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background">
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

            <Card className="border-primary/10 bg-muted/30 p-5">
              <p className="text-sm font-semibold text-foreground">Need Help Choosing The Right Design?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Visit a showroom or book a consultation for tailored bedroom planning with our design team.
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/book-appointment?product=${product.id}&category=${category}`}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
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

        <Tabs defaultValue="description" className="mb-12 rounded-xl border border-primary/10 bg-card p-6 shadow-sm">
          <TabsList className="w-full justify-start rounded-lg bg-muted/60 p-1">
            <TabsTrigger value="description" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground">
              Specifications
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="description" className="mt-0">
              <div className="prose prose-sm max-w-none text-foreground/90">
                <p>{description}</p>
                {packageDescription && <p>{packageDescription}</p>}
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
