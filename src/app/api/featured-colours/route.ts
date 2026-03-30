import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const pickRows = (payload: any): any[] => {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

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

export async function GET() {
  const baseCandidates = getBaseCandidates();

  for (const base of baseCandidates) {
    try {
      const directRes = await fetch(`${base}/products/colours?featured=true`, {
        cache: 'no-store',
      });

      if (directRes.ok) {
        const directPayload = await directRes.json();
        const directRows = pickRows(directPayload);
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

      const fallbackRes = await fetch(`${base}/products/colours`, {
        cache: 'no-store',
      });

      if (!fallbackRes.ok) {
        continue;
      }

      const fallbackPayload = await fallbackRes.json();
      const fallbackRows = pickRows(fallbackPayload)
        .filter((row: any) => Boolean(row?.isFeatured ?? row?.featured));

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
