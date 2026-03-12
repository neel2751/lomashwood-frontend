
  import type { Metadata } from 'next';

  import BedroomPageCom from './bedroomPage';


  export const metadata: Metadata = {
    title: 'Bedroom Design & Consultation | Lomash Wood',
    description: 'Discover our elegant bedroom designs with bespoke furniture and custom storage solutions. Book your free consultation today.',
    openGraph: {
      title: 'Bedroom Design & Consultation | Lomash Wood',
      description: 'Discover our elegant bedroom designs with bespoke furniture and custom storage solutions.',
      type: 'website',
    },
  };

  const products = [
    {
      id: '1',
      slug: 'modern-white-bedroom',
      name: 'Modern White Bedroom',
      category: 'bedroom',
      style: 'modern',
      finish: 'gloss',
      image: 'https://plus.unsplash.com/premium_photo-1683120852623-143817d6400b?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: { from: 50000 },
      colors: ['white', 'gray'],
      inStock: true,
      isNew: true,
      rating: 4.5,
      reviewCount: 20,
    },
    {
      id: '2',
      name: 'Classic Oak Bedroom',
      slug: 'classic-oak-bedroom',
      category: 'bedroom',
      style: 'traditional',
      finish: 'wood-grain',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      name: 'Sleek Black Bedroom',
      slug: 'sleek-black-bedroom',
      category: 'bedroom',
      style: 'industrial',
      finish: 'matt',
      image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: { from: 60000 },
      colors: ['black', 'charcoal'],
      inStock: false,
      rating: 4.2,
      reviewCount: 10,
    },
  ];

  export default function BedroomPage() {
    return (
      <BedroomPageCom products={products} />
    );
  }