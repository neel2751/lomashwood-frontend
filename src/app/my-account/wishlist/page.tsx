import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Trash2, Share2, Filter, Grid3x3, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'View and manage your saved products',
};

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: '1',
      productId: 'prod-001',
      name: 'Modern Modular Kitchen - Premium Series',
      image: '/images/products/kitchen/modern-kitchen-1.jpg',
      category: 'Kitchen',
      price: 85000,
      originalPrice: 95000,
      discount: 10,
      inStock: true,
      colors: ['White Oak', 'Dark Walnut', 'Natural Teak'],
      finishes: ['Matte', 'Glossy'],
      rating: 4.8,
      reviews: 124,
      addedDate: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      productId: 'prod-002',
      name: 'Wardrobe with Sliding Doors',
      image: '/images/products/bedroom/wardrobe-1.jpg',
      category: 'Bedroom',
      price: 30000,
      originalPrice: null,
      discount: 0,
      inStock: true,
      colors: ['Walnut Brown', 'White', 'Grey'],
      finishes: ['Glossy', 'Matte'],
      rating: 4.6,
      reviews: 89,
      addedDate: '2024-01-18T14:20:00Z',
    },
    {
      id: '3',
      productId: 'prod-003',
      name: 'L-Shaped Kitchen with Island',
      image: '/images/products/kitchen/l-shaped-kitchen.jpg',
      category: 'Kitchen',
      price: 125000,
      originalPrice: 140000,
      discount: 11,
      inStock: false,
      colors: ['White', 'Grey', 'Navy Blue'],
      finishes: ['Matte'],
      rating: 4.9,
      reviews: 156,
      addedDate: '2024-01-20T09:15:00Z',
    },
    {
      id: '4',
      productId: 'prod-004',
      name: 'King Size Bed with Storage',
      image: '/images/products/bedroom/king-bed.jpg',
      category: 'Bedroom',
      price: 45000,
      originalPrice: 50000,
      discount: 10,
      inStock: true,
      colors: ['Dark Brown', 'Light Oak', 'Grey'],
      finishes: ['Matte', 'Semi-Glossy'],
      rating: 4.7,
      reviews: 92,
      addedDate: '2024-01-22T16:45:00Z',
    },
    {
      id: '5',
      productId: 'prod-005',
      name: 'Modular Kitchen - Budget Series',
      image: '/images/products/kitchen/budget-kitchen.jpg',
      category: 'Kitchen',
      price: 55000,
      originalPrice: null,
      discount: 0,
      inStock: true,
      colors: ['White', 'Cream'],
      finishes: ['Matte'],
      rating: 4.5,
      reviews: 67,
      addedDate: '2024-01-23T11:00:00Z',
    },
    {
      id: '6',
      productId: 'prod-006',
      name: 'Dressing Table with Mirror',
      image: '/images/products/bedroom/dressing-table.jpg',
      category: 'Bedroom',
      price: 18000,
      originalPrice: 22000,
      discount: 18,
      inStock: true,
      colors: ['White', 'Natural Wood', 'Black'],
      finishes: ['Glossy', 'Matte'],
      rating: 4.4,
      reviews: 45,
      addedDate: '2024-01-24T13:30:00Z',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const totalItems = wishlistItems.length;
  const inStockItems = wishlistItems.filter(item => item.inStock).length;
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share List
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Items</DropdownMenuItem>
              <DropdownMenuItem>In Stock</DropdownMenuItem>
              <DropdownMenuItem>Out of Stock</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Kitchen</DropdownMenuItem>
              <DropdownMenuItem>Bedroom</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalItems}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <ShoppingBag className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{inStockItems}</p>
              <p className="text-sm text-gray-600">In Stock</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className="h-8 px-3 text-base mx-auto mb-2 bg-primary">
                ₹
              </Badge>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className="h-8 px-3 text-base mx-auto mb-2 bg-green-600">
                %
              </Badge>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalSavings)}
              </p>
              <p className="text-sm text-gray-600">Potential Savings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      {wishlistItems.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="select-all" />
                <label
                  htmlFor="select-all"
                  className="text-sm font-medium cursor-pointer"
                >
                  Select All
                </label>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Selected
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                    <SelectItem value="discount">Highest Discount</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex border rounded-lg">
                  <Button variant="ghost" size="sm" className="rounded-r-none">
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  <Button variant="ghost" size="sm" className="rounded-l-none">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-white bg-red-600">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  {item.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-600">
                      {item.discount}% OFF
                    </Badge>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <Checkbox className="bg-white" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {item.category}
                    </Badge>
                    <Link
                      href={`/product/${item.productId}`}
                      className="block font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 font-medium">{item.rating}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">{item.reviews} reviews</span>
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Colors:</span>
                    <div className="flex gap-1">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="h-5 w-5 rounded-full border-2 border-gray-200"
                          style={{
                            backgroundColor: color.toLowerCase().includes('white')
                              ? '#ffffff'
                              : color.toLowerCase().includes('dark')
                              ? '#4a4a4a'
                              : color.toLowerCase().includes('grey')
                              ? '#9ca3af'
                              : '#8b7355',
                          }}
                          title={color}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-[10px] text-gray-600">
                          +{item.colors.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-gray-500">
                    Added on {formatDate(item.addedDate)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1"
                      disabled={!item.inStock}
                      asChild={item.inStock}
                    >
                      {item.inStock ? (
                        <Link href={`/product/${item.productId}`}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Out of Stock
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16">
            <div className="text-center max-w-md mx-auto">
              <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Save products you love to easily find them later and track price changes
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/kitchen">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Browse Kitchen
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/bedroom">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Browse Bedroom
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      {wishlistItems.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Wishlist Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Items in your wishlist are saved but not reserved. Add them to cart to secure your purchase.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We'll notify you about price drops and when out-of-stock items are back.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Share your wishlist with friends and family for gift ideas.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}