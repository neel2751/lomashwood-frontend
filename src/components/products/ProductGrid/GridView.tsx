import { ProductCard } from '../ProductCard';

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  style: string;
  finish: string;
  image: string;
  images?: string[];
  price?: {
    from: number;
    to?: number;
  };
  colors?: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
}

interface GridViewProps {
  products: Product[];
}

export function GridView({ products }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}