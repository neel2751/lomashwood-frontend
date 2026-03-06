import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: '1',
    name: 'Modern Shaker Kitchen',
    slug: 'modern-shaker-kitchen',
    category: 'kitchen',
    description: 'Contemporary shaker style kitchen with clean lines and premium finishes. Perfect for modern homes seeking a balance between traditional elegance and contemporary design.',
    shortDescription: 'Modern shaker design with premium finishes',
    images: [
      '/images/products/kitchen/shaker-1.jpg',
      '/images/products/kitchen/shaker-2.jpg',
      '/images/products/kitchen/shaker-3.jpg',
      '/images/products/kitchen/shaker-4.jpg',
    ],
    price: 12500,
    originalPrice: 15000,
    onSale: true,
    discount: 17,
    colors: [
      { name: 'White', hex: '#FFFFFF', image: '/images/colors/white.jpg' },
      { name: 'Grey', hex: '#8B8B8B', image: '/images/colors/grey.jpg' },
      { name: 'Navy', hex: '#1E3A5F', image: '/images/colors/navy.jpg' },
    ],
    styles: ['Modern', 'Shaker'],
    finishes: [
      { name: 'Matt', image: '/images/finishes/matt.jpg' },
      { name: 'Gloss', image: '/images/finishes/gloss.jpg' },
    ],
    range: 'Premium',
    inStock: true,
    stockQuantity: 15,
    sku: 'KIT-MSK-001',
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    popularity: 95,
    specifications: {
      material: 'Engineered Wood with Laminate',
      warranty: '10 Years',
      dimensions: 'Customizable',
      weight: 'Varies by configuration',
      installation: 'Professional Installation Included',
      maintenance: 'Easy to clean and maintain',
    },
    features: [
      'Soft-close hinges and drawers',
      'Customizable layout options',
      'Water-resistant materials',
      'Premium hardware included',
      'Eco-friendly materials',
      'UV-resistant finish',
    ],
    delivery: {
      estimatedDays: '21-28 business days',
      freeDelivery: true,
      deliveryCharge: 0,
      installation: true,
      installationCharge: 0,
    },
    related: ['2', '3'],
    tags: ['kitchen', 'modern', 'shaker', 'premium'],
    seo: {
      title: 'Modern Shaker Kitchen | Premium Kitchen Design',
      description: 'Discover our modern shaker kitchen with premium finishes and contemporary design.',
      keywords: ['modern kitchen', 'shaker kitchen', 'premium kitchen'],
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'Classic Wardrobe Collection',
    slug: 'classic-wardrobe-collection',
    category: 'bedroom',
    description: 'Elegant wardrobe collection with ample storage space and classic design. Features multiple compartments, drawers, and hanging space for optimal organization.',
    shortDescription: 'Classic design with modern functionality',
    images: [
      '/images/products/bedroom/wardrobe-1.jpg',
      '/images/products/bedroom/wardrobe-2.jpg',
      '/images/products/bedroom/wardrobe-3.jpg',
    ],
    price: 8500,
    originalPrice: 8500,
    onSale: false,
    discount: 0,
    colors: [
      { name: 'Oak', hex: '#D2B48C', image: '/images/colors/oak.jpg' },
      { name: 'Walnut', hex: '#5C4033', image: '/images/colors/walnut.jpg' },
      { name: 'White', hex: '#FFFFFF', image: '/images/colors/white.jpg' },
    ],
    styles: ['Classic', 'Traditional'],
    finishes: [
      { name: 'Wood Grain', image: '/images/finishes/wood-grain.jpg' },
      { name: 'Matt', image: '/images/finishes/matt.jpg' },
    ],
    range: 'Standard',
    inStock: true,
    stockQuantity: 8,
    sku: 'BED-CWC-002',
    featured: false,
    rating: 4.6,
    reviewCount: 89,
    popularity: 78,
    specifications: {
      material: 'Solid Wood and MDF',
      warranty: '5 Years',
      dimensions: 'W: 200cm x H: 220cm x D: 60cm',
      weight: '85 kg',
      installation: 'Professional Installation Available',
      maintenance: 'Regular dusting recommended',
    },
    features: [
      'Multiple storage compartments',
      'Adjustable shelves',
      'Full-length mirror option',
      'Soft-close doors',
      'Anti-tip safety bracket',
      'Solid construction',
    ],
    delivery: {
      estimatedDays: '14-21 business days',
      freeDelivery: true,
      deliveryCharge: 0,
      installation: false,
      installationCharge: 500,
    },
    related: ['1', '3'],
    tags: ['bedroom', 'wardrobe', 'classic', 'storage'],
    seo: {
      title: 'Classic Wardrobe Collection | Bedroom Storage',
      description: 'Elegant classic wardrobe with ample storage and timeless design.',
      keywords: ['bedroom wardrobe', 'classic wardrobe', 'storage'],
    },
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z',
  },
  {
    id: '3',
    name: 'Handleless Kitchen Design',
    slug: 'handleless-kitchen-design',
    category: 'kitchen',
    description: 'Sleek handleless kitchen with push-to-open mechanism and contemporary aesthetics. Minimalist design that maximizes space and creates a seamless look.',
    shortDescription: 'Minimalist handleless design',
    images: [
      '/images/products/kitchen/handleless-1.jpg',
      '/images/products/kitchen/handleless-2.jpg',
      '/images/products/kitchen/handleless-3.jpg',
      '/images/products/kitchen/handleless-4.jpg',
      '/images/products/kitchen/handleless-5.jpg',
    ],
    price: 18000,
    originalPrice: 20000,
    onSale: true,
    discount: 10,
    colors: [
      { name: 'Graphite', hex: '#383838', image: '/images/colors/graphite.jpg' },
      { name: 'White', hex: '#FFFFFF', image: '/images/colors/white.jpg' },
      { name: 'Anthracite', hex: '#293133', image: '/images/colors/anthracite.jpg' },
    ],
    styles: ['Contemporary', 'Handleless'],
    finishes: [
      { name: 'Matt', image: '/images/finishes/matt.jpg' },
      { name: 'Gloss', image: '/images/finishes/gloss.jpg' },
    ],
    range: 'Luxury',
    inStock: true,
    stockQuantity: 5,
    sku: 'KIT-HND-003',
    featured: true,
    rating: 4.9,
    reviewCount: 156,
    popularity: 98,
    specifications: {
      material: 'High-Quality MDF with Acrylic Finish',
      warranty: '15 Years',
      dimensions: 'Fully Customizable',
      weight: 'Varies by configuration',
      installation: 'Premium Installation Included',
      maintenance: 'Fingerprint-resistant coating',
    },
    features: [
      'Push-to-open mechanism',
      'Integrated appliances',
      'LED lighting included',
      'Premium soft-close system',
      'Scratch-resistant surface',
      'Seamless design',
      'Easy to clean',
      'Modern aesthetics',
    ],
    delivery: {
      estimatedDays: '28-35 business days',
      freeDelivery: true,
      deliveryCharge: 0,
      installation: true,
      installationCharge: 0,
    },
    related: ['1', '2'],
    tags: ['kitchen', 'handleless', 'contemporary', 'luxury'],
    seo: {
      title: 'Handleless Kitchen Design | Luxury Modern Kitchen',
      description: 'Experience the ultimate in modern kitchen design with our handleless luxury collection.',
      keywords: ['handleless kitchen', 'modern kitchen', 'luxury kitchen'],
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
  },
];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = mockProducts.find((p) => p.id === id);
    
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: 'Product not found',
        },
        { status: 404 }
      );
    }
    const relatedProducts = mockProducts
      .filter((p) => product.related.includes(p.id))
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        shortDescription: p.shortDescription,
        images: p.images.slice(0, 2),
        price: p.price,
        originalPrice: p.originalPrice,
        onSale: p.onSale,
        discount: p.discount,
        rating: p.rating,
        reviewCount: p.reviewCount,
      }));
    
    return NextResponse.json(
      {
        success: true,
        data: {
          product,
          relatedProducts,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Product detail API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching product details',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  _request: NextRequest,
  _context: { params: Promise<{ id: string }> }
) {
  try {
    return NextResponse.json(
      {
        success: false,
        message: 'Product update not implemented',
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('Product update API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while updating product',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  _context: { params: Promise<{ id: string }> }
) {
  try {
    return NextResponse.json(
      {
        success: false,
        message: 'Product deletion not implemented',
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('Product delete API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while deleting product',
      },
      { status: 500 }
    );
  }
}