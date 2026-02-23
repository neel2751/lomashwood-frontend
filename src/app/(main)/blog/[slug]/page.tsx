import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

async function getBlogPost(slug: string) {

  const posts: Record<string, any> = {
    'modern-kitchen-design-trends-2024': {
      title: 'Modern Kitchen Design Trends for 2024',
      slug: 'modern-kitchen-design-trends-2024',
      excerpt: 'Discover the hottest kitchen design trends that are shaping modern homes in 2024.',
      content: `
        <h2>Introduction</h2>
        <p>The kitchen has evolved from a purely functional space to the heart of the home, where families gather, entertain, and create memories. In 2024, kitchen design continues to push boundaries with innovative solutions that blend aesthetics with functionality.</p>
        
        <h2>1. Sustainable Materials</h2>
        <p>Eco-friendly materials are taking center stage in modern kitchen design. Homeowners are increasingly opting for sustainable options like reclaimed wood, recycled glass countertops, and bamboo cabinetry. These materials not only reduce environmental impact but also add unique character to your kitchen.</p>
        
        <h2>2. Bold Color Palettes</h2>
        <p>While white kitchens remain timeless, 2024 sees a shift towards bolder color choices. Deep greens, navy blues, and warm terracotta tones are becoming popular for cabinetry and accent walls, creating dramatic and personalized spaces.</p>
        
        <h2>3. Smart Kitchen Technology</h2>
        <p>Technology integration is more seamless than ever. From voice-activated faucets to smart refrigerators that help with meal planning, modern kitchens are becoming intelligent spaces that enhance daily living.</p>
        
        <h2>4. Mixed Materials</h2>
        <p>The trend of mixing different materials and finishes continues to grow. Combining wood with metal, stone with glass, or matte with glossy finishes creates visual interest and depth in kitchen design.</p>
        
        <h2>Conclusion</h2>
        <p>These trends reflect a shift towards more personalized, sustainable, and technologically advanced kitchens that serve as the true heart of the home.</p>
      `,
      image: '/images/blog/modern-kitchen-trends.jpg',
      category: 'Kitchen Design',
      author: {
        name: 'Priya Sharma',
        avatar: '/images/authors/priya.jpg',
        bio: 'Interior Design Expert with 10+ years of experience'
      },
      publishedAt: '2024-01-15',
      readTime: '5 min read',
      tags: ['Kitchen', 'Modern Design', 'Trends', 'Interior Design']
    }
  };

  return posts[slug] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Lomash Wood',
    };
  }

  return {
    title: `${post.title} | Lomash Wood Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] bg-stone-200">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="inline-block px-3 py-1 bg-amber-600 text-white text-sm font-semibold rounded mb-4">
                {post.category}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-stone-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{post.author.name}</p>
                  <p className="text-sm">{post.author.bio}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 ml-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
                <button 
                  className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Share</span>
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg prose-stone max-w-none
                prose-headings:font-bold prose-headings:text-stone-900
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-semibold text-stone-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-full hover:bg-amber-100 hover:text-amber-800 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for related posts */}
              <p className="text-stone-600 col-span-2">
                Related posts will appear here based on category and tags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-amber-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-amber-100 mb-8">
              Subscribe to get the latest design trends and inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-stone-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}