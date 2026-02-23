import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const productsQuerySchema = z.object({
  category: z.enum(['kitchen', 'bedroom', 'all']).optional(),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 12)),
  sort: z.enum(['price-asc', 'price-desc', 'popularity', 'newest', 'name']).optional(),
  color: z.string().optional(),
  style: z.string().optional(),
  finish: z.string().optional(),
  range: z.string().optional(),
  minPrice: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
  maxPrice: z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
  search: z.string().optional(),
  inStock: z.string().optional().transform((val) => val === 'true'),
  featured: z.string().optional().transform((val) => val === 'true'),
  onSale: z.string().optional().transform((val) => val === 'true'),
});

const mockProducts = [
  {
    id: '1',
    name: 'Modern Shaker Kitchen',
    slug: 'modern-shaker-kitchen',
    category: 'kitchen',
    description: 'Contemporary shaker style kitchen with clean lines',
    shortDescription: 'Modern shaker design with premium finishes',
    images: [
      '/images/products/kitchen/shaker-1.jpg',
      '/images/products/kitchen/shaker-2.jpg',
    ],
    price: 12500,
    originalPrice: 15000,
    onSale: true,
    discount: 17,
    colors: ['White', 'Grey', 'Navy'],
    styles: ['Modern', 'Shaker'],
    finishes: ['Matt', 'Gloss'],
    range: 'Premium',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    popularity: 95,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Classic Wardrobe Collection',
    slug: 'classic-wardrobe-collection',
    category: 'bedroom',
    description: 'Elegant wardrobe collection with ample storage',
    shortDescription: 'Classic design with modern functionality',
    images: [
      '/images/products/bedroom/wardrobe-1.jpg',
      '/images/products/bedroom/wardrobe-2.jpg',
    ],
    price: 8500,
    originalPrice: 8500,
    onSale: false,
    discount: 0,
    colors: ['Oak', 'Walnut', 'White'],
    styles: ['Classic', 'Traditional'],
    finishes: ['Wood Grain', 'Matt'],
    range: 'Standard',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 89,
    popularity: 78,
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Handleless Kitchen Design',
    slug: 'handleless-kitchen-design',
    category: 'kitchen',
    description: 'Sleek handleless kitchen with push-to-open mechanism',
    shortDescription: 'Minimalist handleless design',
    images: [
      '/images/products/kitchen/handleless-1.jpg',
      '/images/products/kitchen/handleless-2.jpg',
    ],
    price: 18000,
    originalPrice: 20000,
    onSale: true,
    discount: 10,
    colors: ['Graphite', 'White', 'Anthracite'],
    styles: ['Contemporary', 'Handleless'],
    finishes: ['Matt', 'Gloss'],
    range: 'Luxury',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 156,
    popularity: 98,
    createdAt: '2024-01-10T10:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedParams = productsQuerySchema.parse(queryParams);
    
    const {
      category,
      page = 1,
      limit = 12,
      sort,
      color,
      style,
      finish,
      range,
      minPrice,
      maxPrice,
      search,
      inStock,
      featured,
      onSale,
    } = validatedParams;

    let filteredProducts = [...mockProducts];

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }
    
    if (color) {
      filteredProducts = filteredProducts.filter((p) =>
        p.colors.some((c) => c.toLowerCase() === color.toLowerCase())
      );
    }
    
    if (style) {
      filteredProducts = filteredProducts.filter((p) =>
        p.styles.some((s) => s.toLowerCase() === style.toLowerCase())
      );
    }
    
    if (finish) {
      filteredProducts = filteredProducts.filter((p) =>
        p.finishes.some((f) => f.toLowerCase() === finish.toLowerCase())
      );
    }
    
    if (range) {
      filteredProducts = filteredProducts.filter(
        (p) => p.range.toLowerCase() === range.toLowerCase()
      );
    }
    
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price >= minPrice);
    }
    
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price <= maxPrice);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (inStock) {
      filteredProducts = filteredProducts.filter((p) => p.inStock);
    }
    
    if (featured) {
      filteredProducts = filteredProducts.filter((p) => p.featured);
    }
    
    if (onSale) {
      filteredProducts = filteredProducts.filter((p) => p.onSale);
    }

    if (sort) {
      switch (sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'popularity':
          filteredProducts.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'newest':
          filteredProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    const availableColors = Array.from(
      new Set(mockProducts.flatMap((p) => p.colors))
    );
    const availableStyles = Array.from(
      new Set(mockProducts.flatMap((p) => p.styles))
    );
    const availableFinishes = Array.from(
      new Set(mockProducts.flatMap((p) => p.finishes))
    );
    const availableRanges = Array.from(new Set(mockProducts.map((p) => p.range)));
    
    const priceRange = {
      min: Math.min(...mockProducts.map((p) => p.price)),
      max: Math.max(...mockProducts.map((p) => p.price)),
    };
    
    return NextResponse.json(
      {
        success: true,
        data: {
          products: paginatedProducts,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
          filters: {
            colors: availableColors,
            styles: availableStyles,
            finishes: availableFinishes,
            ranges: availableRanges,
            priceRange,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid query parameters',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    console.error('Products API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching products',
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}