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

const products = [
  {
    id: '1',
    slug: 'modern-white-kitchen',
    name: 'Modern White Kitchen',
    category: 'kitchen',
    style: 'modern',
    finish: 'gloss',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0',
    price: { from: 50000 },
    colors: ['white', 'gray'],
    inStock: true,
    isNew: true,
    rating: 4.5,
    reviewCount: 20,
  },
  {
    id: '2',
    name: 'Classic Oak Kitchen',
    slug: 'classic-oak-kitchen',
    category: 'kitchen',
    style: 'traditional',
    finish: 'wood-grain',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0',
    price: { from: 75000 },
    colors: ['oak', 'beige'],
    inStock: true,
    isSale: true,
    discount: 10,
    rating: 4.0,
    reviewCount: 15,
  },
  {
    id: '3',
    name: 'Sleek Black Kitchen',
    slug: 'sleek-black-kitchen',
    category: 'kitchen',
    style: 'industrial',
    finish: 'matt',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0',
    price: { from: 60000 },
    colors: ['black', 'charcoal'],
    inStock: false,
    rating: 4.2,
    reviewCount: 10,
  },
];

export default function KitchenPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Pass products */}
      <KitchenPageCom 
        products={products}
      />
    </div>
  );
}