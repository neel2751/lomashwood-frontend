import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogGrid from '@/components/blog/BlogGrid';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { SEOHead } from '@/components/shared/SEOHead';

interface BlogCategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
    sort?: string;
  };  
}

const categoryMetadata: Record<string, { title: string; description: string }> = {
  'kitchen-design': {
    title: 'Kitchen Design Ideas & Inspiration',
    description: 'Explore the latest kitchen design trends, tips, and inspiration for your dream kitchen renovation.',
  },
  'bedroom-design': {
    title: 'Bedroom Design Ideas & Inspiration',
    description: 'Discover beautiful bedroom design ideas, storage solutions, and decor tips for creating your perfect retreat.',
  },
  'interior-tips': {
    title: 'Interior Design Tips & Advice',
    description: 'Expert interior design tips and advice to help you create beautiful, functional spaces in your home.',
  },
  'trends': {
    title: 'Latest Interior Design Trends',
    description: 'Stay updated with the latest trends in kitchen and bedroom design, colors, materials, and styles.',
  },
  'diy-guides': {
    title: 'DIY Guides & Tutorials',
    description: 'Step-by-step DIY guides and tutorials for home improvement and interior design projects.',
  },
  'maintenance': {
    title: 'Home Maintenance Tips',
    description: 'Essential maintenance tips to keep your kitchen and bedroom looking beautiful for years to come.',
  },
};

function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-neutral-400">/</span>
            )}
            {isLast ? (
              <span className="text-neutral-900 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  const category = categoryMetadata[slug];

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} | Lomash Wood Blog`,
    description: category.description,
    openGraph: {
      title: `${category.title} | Lomash Wood Blog`,
      description: category.description,
      type: 'website',
      url: `https://lomashwood.com/blog/category/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} | Lomash Wood Blog`,
      description: category.description,
    },
  };
}

export default function BlogCategoryPage({
  params,
  searchParams,
}: BlogCategoryPageProps) {
  const { slug } = params;
  const sort = searchParams.sort || 'latest';
  const category = categoryMetadata[slug];

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: category.title, href: `/blog/category/${slug}` },
  ];

  return (
    <>
      <SEOHead
        title={`${category.title} | Lomash Wood Blog`}
        description={category.description}
        canonicalUrl={`https://lomashwood.com/blog/category/${slug}`}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Category Header */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                {category.title}
              </h1>
              <p className="text-lg text-neutral-600">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter & Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Category Filter */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <CategoryFilter 
                    categories={[]} 
                    selectedCategories={[]} 
                    onCategoryChange={() => {}} 
                  />
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Sort & Filter Bar */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                  <p className="text-sm text-neutral-600">
                    Showing articles in <span className="font-semibold text-neutral-900">{category.title}</span>
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <label htmlFor="sort" className="text-sm text-neutral-600">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      defaultValue={sort}
                      className="text-sm border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="latest">Latest</option>
                      <option value="oldest">Oldest</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                    </select>
                  </div>
                </div>

                {/* Blog Grid */}
                <BlogGrid
                  posts={[]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(categoryMetadata).map((slug) => ({
    slug,
  }));
}