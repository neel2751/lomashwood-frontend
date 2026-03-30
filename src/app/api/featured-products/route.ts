import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const pickRows = (payload: any): any[] => {
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

const pickFeaturedRows = (rows: any[]): any[] =>
  rows.filter((row) => Boolean(row?.featured ?? row?.isFeatured));

const getBaseCandidates = (): string[] => {
  const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  const urls: string[] = [];

  if (configuredBase) {
    if (configuredBase.endsWith('/api/v1')) {
      urls.push(configuredBase);
    } else if (configuredBase.endsWith('/api')) {
      urls.push(`${configuredBase}/v1`);
    } else {
      urls.push(`${configuredBase}/api/v1`);
      urls.push(configuredBase);
    }
  }

  urls.push('https://lomashwood-backend.vercel.app/api/v1');

  return Array.from(new Set(urls));
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = (url.searchParams.get('category') || 'kitchen').trim();

  const baseCandidates = getBaseCandidates();

  for (const base of baseCandidates) {
    try {
      const directUrl = `${base}/products?category=${encodeURIComponent(category)}&featured=true&limit=8`;
      const directRes = await fetch(directUrl, { cache: 'no-store' });
      if (directRes.ok) {
        const directPayload = await directRes.json();
        const directRows = pickFeaturedRows(pickRows(directPayload)).slice(0, 8);
        if (directRows.length > 0) {
          return NextResponse.json(
            { data: directRows },
            {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Pragma: 'no-cache',
                Expires: '0',
              },
            }
          );
        }
      }

      const fallbackUrl = `${base}/products?category=${encodeURIComponent(category)}&limit=50`;
      const fallbackRes = await fetch(fallbackUrl, { cache: 'no-store' });
      if (!fallbackRes.ok) {
        continue;
      }

      const fallbackPayload = await fallbackRes.json();
      const fallbackRows = pickFeaturedRows(pickRows(fallbackPayload)).slice(0, 8);

      return NextResponse.json(
        { data: fallbackRows },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        }
      );
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    { data: [] },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}
