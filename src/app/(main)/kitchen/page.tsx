
import type { Metadata } from 'next';

import KitchenPageCom from './kitchenPage';


export const metadata: Metadata = {
  title: 'Kitchen Design & Consultation | Lomash Wood',
  description: 'Explore our premium kitchen designs with customizable colours, styles, and finishes. Book a free consultation today.',
  openGraph: {
    title: 'Kitchen Design & Consultation | Lomash Wood',
    description: 'Explore our premium kitchen designs with customizable colours, styles, and finishes.',
    type: 'website',
  },
};

const products = [
  {
    id: '1',
    name: 'Modern White Kitchen',
    category: 'kitchen',
    style: 'modern',
    finish: 'gloss',
    image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    category: 'kitchen',
    style: 'traditional',
    finish: 'wood-grain',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    category: 'kitchen',
    style: 'industrial',
    finish: 'matt',
    image: 'https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: { from: 60000 },
    colors: ['black', 'charcoal'],
    inStock: false,
    rating: 4.2,
    reviewCount: 10,
  },
];


export default function KitchenPage() {
  return (
    <KitchenPageCom products={products} />
  );
}