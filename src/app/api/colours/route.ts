import { NextResponse } from 'next/server';

const BACKEND_BASE = 'https://lomashwood-backend.vercel.app/api/v1';

const getBase = (): string => {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!configured) return BACKEND_BASE;
  if (configured.endsWith('/api/v1')) return configured;
  if (configured.endsWith('/api')) return `${configured}/v1`;
  return `${configured}/api/v1`;
};

export async function GET() {
  const bases = Array.from(new Set([getBase(), BACKEND_BASE]));

  for (const base of bases) {
    try {
      const res = await fetch(`${base}/products/colours`, {
        next: { revalidate: 120 },
      });
      if (!res.ok) continue;

      const payload = await res.json();
      const colours: unknown[] = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];

      return NextResponse.json({ data: colours });
    } catch {
      // try next base
    }
  }

  return NextResponse.json({ data: [] });
}
