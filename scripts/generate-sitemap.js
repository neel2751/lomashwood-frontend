const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lomashwood.com';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

const STATIC_ROUTES = [
  {
    path: '/',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    path: '/kitchen',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/bedroom',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/sale',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/book-appointment',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/showrooms',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/finance',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blog',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    path: '/inspiration',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    path: '/media-wall',
    changefreq: 'weekly',
    priority: 0.6,
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/our-process',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/why-choose-us',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/brochure',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/business',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/terms-conditions',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/cookies',
    changefreq: 'yearly',
    priority: 0.3,
  },
];

async function fetchProducts() {
  try {

    const mockProducts = [
      {
        id: 'prod_001',
        slug: 'modern-l-shaped-kitchen',
        category: 'kitchen',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'prod_002',
        slug: 'contemporary-u-shaped-kitchen',
        category: 'kitchen',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'prod_003',
        slug: 'classic-bedroom-set',
        category: 'bedroom',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'prod_004',
        slug: 'modern-bedroom-wardrobe',
        category: 'bedroom',
        updatedAt: new Date().toISOString(),
      },
    ];

    return mockProducts.map(product => ({
      path: `/product/${product.slug}`,
      lastmod: product.updatedAt,
      changefreq: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchBlogPosts() {
  try {
 
    const mockPosts = [
      {
        slug: 'modern-kitchen-design-trends-2025',
        category: 'kitchen-design',
        publishedAt: new Date('2025-01-20').toISOString(),
      },
      {
        slug: 'bedroom-storage-solutions',
        category: 'bedroom-design',
        publishedAt: new Date('2025-01-18').toISOString(),
      },
      {
        slug: 'choosing-right-kitchen-color',
        category: 'design-tips',
        publishedAt: new Date('2025-01-15').toISOString(),
      },
    ];

    const posts = mockPosts.map(post => ({
      path: `/blog/${post.slug}`,
      lastmod: post.publishedAt,
      changefreq: 'monthly',
      priority: 0.6,
    }));

    const categories = [...new Set(mockPosts.map(p => p.category))];
    const categoryPages = categories.map(category => ({
      path: `/blog/category/${category}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.5,
    }));

    return [...posts, ...categoryPages];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function fetchShowrooms() {
  try {

    const mockShowrooms = [
      {
        id: 'showroom_001',
        slug: 'ahmedabad-central',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'showroom_002',
        slug: 'mumbai-andheri',
        updatedAt: new Date().toISOString(),
      },
    ];

    return mockShowrooms.map(showroom => ({
      path: `/showrooms/${showroom.slug}`,
      lastmod: showroom.updatedAt,
      changefreq: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching showrooms:', error);
    return [];
  }
}

function formatDate(date) {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

function generateUrlEntry({ path, lastmod, changefreq, priority }) {
  const url = `${SITE_URL}${path}`;
  const lastmodDate = lastmod ? formatDate(lastmod) : formatDate(new Date());
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemapXML(urls) {
  const urlEntries = urls.map(generateUrlEntry).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries}
</urlset>`;
}

function generateRobotsTxt() {
  const robotsContent = `# Lomash Wood - Robots.txt
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /

# Disallow private pages
Disallow: /my-account/
Disallow: /api/
Disallow: /_next/

# Disallow admin areas (if applicable)
Disallow: /admin/

# Allow specific bot access
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;

  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ robots.txt generated successfully');
}

async function generateSitemap() {
  try {
    console.log('🚀 Starting sitemap generation...\n');

    console.log('📦 Fetching products...');
    const products = await fetchProducts();
    console.log(`   Found ${products.length} products`);

    console.log('📝 Fetching blog posts...');
    const blogPosts = await fetchBlogPosts();
    console.log(`   Found ${blogPosts.length} blog entries`);

    console.log('🏢 Fetching showrooms...');
    const showrooms = await fetchShowrooms();
    console.log(`   Found ${showrooms.length} showrooms`);

    const allUrls = [
      ...STATIC_ROUTES.map(route => ({
        ...route,
        lastmod: new Date().toISOString(),
      })),
      ...products,
      ...blogPosts,
      ...showrooms,
    ];

    console.log(`\n📊 Total URLs: ${allUrls.length}`);

    console.log('\n🔨 Generating sitemap.xml...');
    const sitemapXML = generateSitemapXML(allUrls);

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${OUTPUT_PATH}`);

    console.log('\n🤖 Generating robots.txt...');
    generateRobotsTxt();

    console.log('\n📋 Summary:');
    console.log(`   Static routes: ${STATIC_ROUTES.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Blog posts: ${blogPosts.length}`);
    console.log(`   Showrooms: ${showrooms.length}`);
    console.log(`   Total: ${allUrls.length} URLs`);
    console.log('\n✨ Sitemap generation completed successfully!');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

function validateSitemap() {
  try {
    const sitemapContent = fs.readFileSync(OUTPUT_PATH, 'utf8');

    if (!sitemapContent.includes('<?xml')) {
      throw new Error('Missing XML declaration');
    }
    
    if (!sitemapContent.includes('<urlset')) {
      throw new Error('Missing urlset element');
    }
    
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    
    if (urlCount === 0) {
      throw new Error('No URLs found in sitemap');
    }
    
    console.log(`\n✅ Sitemap validation passed (${urlCount} URLs)`);
    return true;
  } catch (error) {
    console.error('❌ Sitemap validation failed:', error.message);
    return false;
  }
}

function generateSitemapIndex(sitemaps) {
  const sitemapEntries = sitemaps.map(sitemap => {
    return `  <sitemap>
    <loc>${SITE_URL}/${sitemap.filename}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

function splitSitemap(urls, maxUrlsPerSitemap = 50000) {
  const chunks = [];
  
  for (let i = 0; i < urls.length; i += maxUrlsPerSitemap) {
    chunks.push(urls.slice(i, i + maxUrlsPerSitemap));
  }
  
  return chunks;
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Lomash Wood Sitemap Generator

Usage:
  node scripts/generate-sitemap.js [options]

Options:
  --help, -h          Show this help message
  --validate, -v      Validate existing sitemap
  --site-url <url>    Override site URL (default: from env)

Examples:
  node scripts/generate-sitemap.js
  node scripts/generate-sitemap.js --validate
  node scripts/generate-sitemap.js --site-url https://staging.lomashwood.com
  `);
  process.exit(0);
}

if (args.includes('--validate') || args.includes('-v')) {
  console.log('🔍 Validating sitemap...\n');
  const isValid = validateSitemap();
  process.exit(isValid ? 0 : 1);
}

const siteUrlIndex = args.indexOf('--site-url');
if (siteUrlIndex !== -1 && args[siteUrlIndex + 1]) {
  process.env.NEXT_PUBLIC_APP_URL = args[siteUrlIndex + 1];
}
generateSitemap()
  .then(() => {

    validateSitemap();
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

module.exports = {
  generateSitemap,
  validateSitemap,
  generateSitemapXML,
  generateSitemapIndex,
  splitSitemap,
};