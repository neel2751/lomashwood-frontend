import type { Metadata } from 'next';

import KitchenPageCom from './kitchenPage';

export const metadata: Metadata = {
  title: 'Kitchen Design & Consultation | Lomash Wood',
  description: 'Discover our stunning kitchen designs with bespoke furniture and custom storage solutions. Book your free consultation today.',
  openGraph: {
    title: 'Kitchen Design & Consultation | Lomash Wood',
    description: 'Discover our stunning kitchen designs with bespoke furniture and custom storage solutions.',
    type: 'website',
  },
};

interface BackendProduct {
  id: string;
  slug: string;
  title: string;
  category: 'kitchen' | 'bedroom';
  style?: string;
  finish?: string;
  price?: number;
  images?: string[];
  colours?: Array<{ name: string }>;
  isPublished?: boolean;
  isFeatured?: boolean;
}

type KitchenSearchParams = Record<string, string | string[] | undefined>;

const pickSingle = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] ?? undefined;
  return value;
};

const normalizeParam = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

async function getKitchenProducts(searchParams?: KitchenSearchParams) {
  try {
    const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
    const urlsToTry: string[] = [];

    const colour = normalizeParam(pickSingle(searchParams?.colour));
    const style = normalizeParam(pickSingle(searchParams?.style));
    const size = normalizeParam(pickSingle(searchParams?.size));
    const finish = normalizeParam(pickSingle(searchParams?.finish));
    const packageFilter = normalizeParam(pickSingle(searchParams?.package));
    const sort = normalizeParam(pickSingle(searchParams?.sort));

    const params = new URLSearchParams({ category: 'kitchen' });
    if (colour) params.set('colour', colour);
    if (style) params.set('style', style);
    if (size) params.set('size', size);
    if (packageFilter) params.set('package', packageFilter);
    if (sort && sort !== 'popular') params.set('sort', sort);

    if (finish) {
      const finishValues = finish.split(',').map((v) => v.trim()).filter(Boolean);
      if (finishValues.length === 1) {
        params.set('finish', finishValues[0]);
      }
    }

    const query = params.toString();

    if (configuredBase) {
      if (configuredBase.endsWith('/api/v1')) {
        urlsToTry.push(`${configuredBase}/products?${query}`);
      } else if (configuredBase.endsWith('/api')) {
        urlsToTry.push(`${configuredBase}/v1/products?${query}`);
      } else {
        urlsToTry.push(`${configuredBase}/api/v1/products?${query}`);
        urlsToTry.push(`${configuredBase}/products?${query}`);
      }
    }

    urlsToTry.push(`https://lomashwood-backend.vercel.app/api/v1/products?${query}`);

    let rows: BackendProduct[] = [];

    for (const url of urlsToTry) {
      try {
        const response = await fetch(url, { next: { revalidate: 300 } });
        if (!response.ok)   {
          continue;
        }

        const payload = await response.json();
        const candidateRows: BackendProduct[] = Array.isArray(payload?.data?.products)
          ? payload.data.products
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload)
              ? payload
              : [];

        if (candidateRows.length > 0) {
          rows = candidateRows;
          break;
        }
      } catch {
        continue;
      }
    }

    if (rows.length === 0) {
      return [];
    }

    return rows.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.title,
      category: product.category,
      style: product.style || 'modern',
      finish: product.finish || 'matt',
      image: product.images?.[0] || '/images/placeholder-product.jpg',
      images: product.images || [],
      price: { from: product.price || 0 },
      colors: product.colours?.map((colour) => colour.name.toLowerCase()) || [],
      inStock: product.isPublished ?? true,
      isNew: false,
      rating: 0,
      reviewCount: 0,
    }));
  } catch (error) {
    console.error('Kitchen products fetch failed:', error);
    return [];
  }
}

export default async function KitchenPage({
  searchParams,
}: {
  searchParams?: KitchenSearchParams | Promise<KitchenSearchParams>;
}) {
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : undefined;
  const products = await getKitchenProducts(resolvedSearchParams);

  return (
    <div className="w-full min-h-screen bg-white">
      <KitchenPageCom products={products} />
    </div>
  );
}