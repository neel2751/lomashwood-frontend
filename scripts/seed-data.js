const fs = require('fs');
const path = require('path');

const kitchenStyles = [
  'Modern',
  'Traditional',
  'Contemporary',
  'Shaker',
  'Handleless',
  'Country',
  'Industrial',
  'Minimalist'
];

const kitchenFinishes = [
  'Matt',
  'Gloss',
  'Satin',
  'Textured',
  'Wood Grain',
  'Metallic'
];

const kitchenColors = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Black', hex: '#000000' },
  { name: 'Sage Green', hex: '#9CAF88' },
  { name: 'Light Oak', hex: '#D4A574' },
  { name: 'Walnut', hex: '#5C4033' },
  { name: 'Anthracite', hex: '#293133' },
  { name: 'Stone Grey', hex: '#928E85' },
  { name: 'Cashmere', hex: '#E6D2B5' },
  { name: 'Porcelain', hex: '#F5F5F5' }
];

const kitchenRanges = [
  'Essential',
  'Premium',
  'Luxury',
  'Designer',
  'Bespoke'
];

const generateKitchenProducts = (count = 50) => {
  const products = [];
  
  for (let i = 1; i <= count; i++) {
    const style = kitchenStyles[Math.floor(Math.random() * kitchenStyles.length)];
    const finish = kitchenFinishes[Math.floor(Math.random() * kitchenFinishes.length)];
    const color = kitchenColors[Math.floor(Math.random() * kitchenColors.length)];
    const range = kitchenRanges[Math.floor(Math.random() * kitchenRanges.length)];
    
    const basePrice = range === 'Essential' ? 5000 :
                      range === 'Premium' ? 10000 :
                      range === 'Luxury' ? 15000 :
                      range === 'Designer' ? 20000 : 25000;
    
    const price = basePrice + Math.floor(Math.random() * 5000);
    
    products.push({
      id: `kitchen-${i}`,
      category: 'kitchen',
      name: `${style} ${finish} Kitchen`,
      slug: `${style.toLowerCase()}-${finish.toLowerCase()}-kitchen-${i}`,
      description: `Beautiful ${style.toLowerCase()} ${finish.toLowerCase()} kitchen featuring premium materials and expert craftsmanship. Perfect for modern living spaces.`,
      longDescription: `Transform your cooking space with our ${style} ${finish} kitchen design. This stunning kitchen combines functionality with aesthetic appeal, featuring high-quality materials and innovative storage solutions. The ${color.name.toLowerCase()} finish adds a touch of elegance, while the ${style.toLowerCase()} style ensures timeless appeal. Includes soft-close drawers, premium worktops, and integrated appliances.`,
      price: price,
      comparePrice: price + Math.floor(price * 0.15),
      style: style,
      finish: finish,
      color: color,
      range: range,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
      reviewCount: Math.floor(Math.random() * 200) + 10,
      images: [
        `/images/products/kitchen/${i}-main.jpg`,
        `/images/products/kitchen/${i}-detail-1.jpg`,
        `/images/products/kitchen/${i}-detail-2.jpg`,
        `/images/products/kitchen/${i}-lifestyle.jpg`
      ],
      features: [
        'Soft-close drawers and doors',
        'Premium worktop included',
        '20-year warranty',
        'Professional installation',
        'Free design consultation',
        'Integrated appliances available'
      ],
      specifications: {
        material: finish === 'Wood Grain' ? 'Solid Wood' : 'MDF with ' + finish + ' finish',
        warranty: '20 years',
        dimensions: 'Custom to your space',
        installation: 'Professional installation included',
        leadTime: '6-8 weeks'
      },
      availability: Math.random() > 0.2 ? 'in-stock' : 'pre-order',
      isFeatured: Math.random() > 0.7,
      isNew: i <= 10,
      isSale: Math.random() > 0.8,
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 10 : 0,
      tags: ['kitchen', style.toLowerCase(), finish.toLowerCase(), range.toLowerCase()],
      seo: {
        metaTitle: `${style} ${finish} Kitchen | Lomash Wood`,
        metaDescription: `Discover our ${style.toLowerCase()} ${finish.toLowerCase()} kitchen. Premium quality, expert design. Book your free consultation today.`,
        keywords: `${style} kitchen, ${finish} kitchen, ${color.name} kitchen, ${range} kitchen`
      },
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return products;
};

const bedroomStyles = [
  'Contemporary',
  'Traditional',
  'Modern',
  'Classic',
  'Minimalist',
  'Luxe',
  'Shaker',
  'Sliding Door'
];

const bedroomFinishes = [
  'Matt',
  'Gloss',
  'Wood Effect',
  'Mirrored',
  'Satin',
  'Textured'
];

const bedroomColors = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Light Oak', hex: '#D4A574' },
  { name: 'Walnut', hex: '#5C4033' },
  { name: 'Black', hex: '#000000' },
  { name: 'Cashmere', hex: '#E6D2B5' },
  { name: 'Stone', hex: '#8B8680' },
  { name: 'Dust Grey', hex: '#B2BEB5' }
];

const generateBedroomProducts = (count = 50) => {
  const products = [];
  
  for (let i = 1; i <= count; i++) {
    const style = bedroomStyles[Math.floor(Math.random() * bedroomStyles.length)];
    const finish = bedroomFinishes[Math.floor(Math.random() * bedroomFinishes.length)];
    const color = bedroomColors[Math.floor(Math.random() * bedroomColors.length)];
    const range = kitchenRanges[Math.floor(Math.random() * kitchenRanges.length)];
    
    const basePrice = range === 'Essential' ? 3000 :
                      range === 'Premium' ? 6000 :
                      range === 'Luxury' ? 10000 :
                      range === 'Designer' ? 15000 : 20000;
    
    const price = basePrice + Math.floor(Math.random() * 4000);
    
    products.push({
      id: `bedroom-${i}`,
      category: 'bedroom',
      name: `${style} ${finish} Bedroom`,
      slug: `${style.toLowerCase()}-${finish.toLowerCase()}-bedroom-${i}`,
      description: `Elegant ${style.toLowerCase()} ${finish.toLowerCase()} bedroom furniture with premium storage solutions and stunning design.`,
      longDescription: `Create your dream bedroom with our ${style} ${finish} furniture collection. This elegant bedroom design offers ample storage with style, featuring high-quality materials and meticulous craftsmanship. The ${color.name.toLowerCase()} finish creates a serene atmosphere, while the ${style.toLowerCase()} design ensures lasting appeal. Complete with fitted wardrobes, bedside tables, and optional dressing tables.`,
      price: price,
      comparePrice: price + Math.floor(price * 0.15),
      style: style,
      finish: finish,
      color: color,
      range: range,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 150) + 10,
      images: [
        `/images/products/bedroom/${i}-main.jpg`,
        `/images/products/bedroom/${i}-wardrobe.jpg`,
        `/images/products/bedroom/${i}-detail.jpg`,
        `/images/products/bedroom/${i}-lifestyle.jpg`
      ],
      features: [
        'Soft-close doors and drawers',
        'LED lighting options',
        '20-year warranty',
        'Custom storage solutions',
        'Professional fitting service',
        'Interior accessories included'
      ],
      specifications: {
        material: finish === 'Wood Effect' ? 'Solid Wood Veneer' : 'MDF with ' + finish + ' finish',
        warranty: '20 years',
        dimensions: 'Custom to your space',
        installation: 'Professional installation included',
        leadTime: '6-8 weeks'
      },
      availability: Math.random() > 0.2 ? 'in-stock' : 'pre-order',
      isFeatured: Math.random() > 0.7,
      isNew: i <= 10,
      isSale: Math.random() > 0.8,
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 10 : 0,
      tags: ['bedroom', 'wardrobe', style.toLowerCase(), finish.toLowerCase()],
      seo: {
        metaTitle: `${style} ${finish} Bedroom | Lomash Wood`,
        metaDescription: `Browse our ${style.toLowerCase()} ${finish.toLowerCase()} bedroom furniture. Quality storage solutions, stunning design. Free consultation available.`,
        keywords: `${style} bedroom, ${finish} wardrobe, ${color.name} bedroom, fitted bedroom`
      },
      createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return products;
};

const generatePackages = () => {
  return [
    {
      id: 'pkg-1',
      name: 'Starter Kitchen Package',
      category: 'kitchen',
      price: 5999,
      comparePrice: 7500,
      savings: 1501,
      description: 'Perfect for first-time buyers and smaller kitchens',
      features: [
        'Essential range kitchen units',
        'Standard worktop (3m)',
        'Single bowl stainless steel sink',
        'Chrome mixer tap',
        'Standard wall and base units',
        'Soft-close hinges',
        'Professional installation',
        '10-year warranty'
      ],
      image: '/images/packages/starter-kitchen.jpg',
      popular: false
    },
    {
      id: 'pkg-2',
      name: 'Premium Kitchen Package',
      category: 'kitchen',
      price: 12999,
      comparePrice: 16000,
      savings: 3001,
      description: 'Most popular choice for modern families',
      features: [
        'Premium range kitchen units',
        'Quartz worktop (5m)',
        'Undermount composite sink',
        'Designer mixer tap',
        'Corner carousel units',
        'Soft-close doors and drawers',
        'LED under-cabinet lighting',
        'Professional installation',
        '20-year warranty'
      ],
      image: '/images/packages/premium-kitchen.jpg',
      popular: true
    },
    {
      id: 'pkg-3',
      name: 'Luxury Kitchen Package',
      category: 'kitchen',
      price: 24999,
      comparePrice: 32000,
      savings: 7001,
      description: 'Ultimate kitchen experience with premium features',
      features: [
        'Designer range kitchen units',
        'Premium granite/quartz worktop (7m)',
        'Designer sink and tap package',
        'Full-height pull-out larders',
        'Corner magic units',
        'Integrated appliance package',
        'Smart LED lighting system',
        'Wine cooler space',
        'Professional installation',
        '25-year warranty'
      ],
      image: '/images/packages/luxury-kitchen.jpg',
      popular: false
    },
    {
      id: 'pkg-4',
      name: 'Essential Bedroom Package',
      category: 'bedroom',
      price: 3499,
      comparePrice: 4500,
      savings: 1001,
      description: 'Smart storage solution for compact bedrooms',
      features: [
        'Essential range wardrobes',
        '2-door sliding wardrobe',
        'Internal hanging rails',
        'Basic interior accessories',
        'Matt finish options',
        'Professional installation',
        '10-year warranty'
      ],
      image: '/images/packages/essential-bedroom.jpg',
      popular: false
    },
    {
      id: 'pkg-5',
      name: 'Premium Bedroom Package',
      category: 'bedroom',
      price: 7999,
      comparePrice: 10000,
      savings: 2001,
      description: 'Complete bedroom storage with style',
      features: [
        'Premium range wardrobes',
        '3-door sliding wardrobe',
        'Full interior package',
        'LED lighting system',
        'Soft-close doors',
        'Matching bedside tables',
        'Premium finish options',
        'Professional installation',
        '20-year warranty'
      ],
      image: '/images/packages/premium-bedroom.jpg',
      popular: true
    },
    {
      id: 'pkg-6',
      name: 'Complete Home Package',
      category: 'both',
      price: 34999,
      comparePrice: 45000,
      savings: 10001,
      description: 'Transform your entire home with kitchen and bedroom',
      features: [
        'Premium kitchen package',
        'Premium bedroom package',
        'Coordinated design consultation',
        'Priority installation schedule',
        'Extended warranty (25 years)',
        'Free design revisions',
        'Project manager assigned',
        'After-care service'
      ],
      image: '/images/packages/complete-home.jpg',
      popular: true
    }
  ];
};

const generateShowrooms = () => {
  return [
    {
      id: 'showroom-1',
      name: 'Lomash Wood - Ahmedabad Showroom',
      slug: 'ahmedabad-showroom',
      address: {
        street: '123 SG Highway',
        area: 'Bodakdev',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380054',
        country: 'India'
      },
      location: {
        lat: 23.0343,
        lng: 72.5271
      },
      phone: '+91 79 1234 5678',
      email: 'ahmedabad@lomashwood.com',
      hours: {
        monday: '10:00 AM - 8:00 PM',
        tuesday: '10:00 AM - 8:00 PM',
        wednesday: '10:00 AM - 8:00 PM',
        thursday: '10:00 AM - 8:00 PM',
        friday: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: '11:00 AM - 6:00 PM'
      },
      features: [
        '50+ kitchen displays',
        '30+ bedroom displays',
        'VR design experience',
        'Material samples library',
        'Free parking',
        'Wheelchair accessible'
      ],
      images: [
        '/images/showrooms/ahmedabad-exterior.jpg',
        '/images/showrooms/ahmedabad-kitchen.jpg',
        '/images/showrooms/ahmedabad-bedroom.jpg'
      ],
      isFeatured: true
    },
    {
      id: 'showroom-2',
      name: 'Lomash Wood - Satellite Showroom',
      slug: 'satellite-showroom',
      address: {
        street: '456 Satellite Road',
        area: 'Satellite',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380015',
        country: 'India'
      },
      location: {
        lat: 23.0258,
        lng: 72.5098
      },
      phone: '+91 79 2345 6789',
      email: 'satellite@lomashwood.com',
      hours: {
        monday: '10:00 AM - 8:00 PM',
        tuesday: '10:00 AM - 8:00 PM',
        wednesday: '10:00 AM - 8:00 PM',
        thursday: '10:00 AM - 8:00 PM',
        friday: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: 'Closed'
      },
      features: [
        '30+ kitchen displays',
        '20+ bedroom displays',
        'Design consultation area',
        'Coffee lounge',
        'Free parking'
      ],
      images: [
        '/images/showrooms/satellite-exterior.jpg',
        '/images/showrooms/satellite-kitchen.jpg'
      ],
      isFeatured: false
    },
    {
      id: 'showroom-3',
      name: 'Lomash Wood - Vastrapur Showroom',
      slug: 'vastrapur-showroom',
      address: {
        street: '789 Law Garden Road',
        area: 'Vastrapur',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380052',
        country: 'India'
      },
      location: {
        lat: 23.0395,
        lng: 72.5347
      },
      phone: '+91 79 3456 7890',
      email: 'vastrapur@lomashwood.com',
      hours: {
        monday: '10:00 AM - 8:00 PM',
        tuesday: '10:00 AM - 8:00 PM',
        wednesday: '10:00 AM - 8:00 PM',
        thursday: '10:00 AM - 8:00 PM',
        friday: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 9:00 PM',
        sunday: '11:00 AM - 7:00 PM'
      },
      features: [
        '40+ kitchen displays',
        '25+ bedroom displays',
        '3D design studio',
        'Kids play area',
        'Refreshment area',
        'Ample parking'
      ],
      images: [
        '/images/showrooms/vastrapur-exterior.jpg',
        '/images/showrooms/vastrapur-interior.jpg'
      ],
      isFeatured: true
    }
  ];
};

const blogCategories = [
  'Kitchen Design',
  'Bedroom Design',
  'Design Trends',
  'How To Guides',
  'Product Features',
  'Customer Stories',
  'Industry News'
];

const generateBlogPosts = (count = 30) => {
  const posts = [];
  
  const titles = [
    'Top 10 Kitchen Design Trends for 2025',
    'How to Choose the Perfect Bedroom Wardrobe',
    'Small Kitchen? Big Ideas for Space Saving',
    'The Ultimate Guide to Kitchen Layouts',
    'Bedroom Storage Solutions That Actually Work',
    'Matt vs Gloss: Which Kitchen Finish is Right for You?',
    'Creating a Luxury Master Bedroom on a Budget',
    'Kitchen Island Ideas for Every Space',
    'Sliding vs Hinged Wardrobes: Pros and Cons',
    'Color Psychology in Kitchen Design',
    'Walk-in Wardrobe Design Ideas',
    'Open Plan Kitchen Living: Design Tips',
    'Maximizing Storage in Small Bedrooms',
    'Handleless Kitchen: The Modern Choice',
    'Bedroom Lighting Guide',
    'Kitchen Worktop Materials Compared',
    'Custom Fitted Furniture vs Freestanding',
    'Creating Your Dream Dressing Room',
    'Sustainable Kitchen Design Choices',
    'Bedroom Color Schemes That Promote Sleep'
  ];
  
  for (let i = 1; i <= Math.min(count, titles.length); i++) {
    const category = blogCategories[Math.floor(Math.random() * blogCategories.length)];
    const title = titles[i - 1];
    
    posts.push({
      id: `blog-${i}`,
      title: title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: `Discover expert tips and insights about ${title.toLowerCase()}. Read our comprehensive guide to make informed decisions for your home.`,
      content: `<p>Full blog post content for: ${title}</p>
                <p>This would contain the complete article with multiple paragraphs, images, and helpful information.</p>`,
      author: {
        name: 'Design Team',
        avatar: '/images/authors/design-team.jpg',
        bio: 'Expert kitchen and bedroom designers'
      },
      category: category,
      tags: [
        category.toLowerCase().replace(/\s+/g, '-'),
        'design-tips',
        'home-improvement'
      ],
      image: `/images/blog/post-${i}.jpg`,
      readTime: Math.floor(Math.random() * 8) + 3 + ' min read',
      views: Math.floor(Math.random() * 5000) + 100,
      likes: Math.floor(Math.random() * 200) + 10,
      publishedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        metaTitle: `${title} | Lomash Wood Blog`,
        metaDescription: `${title}. Expert advice from Lomash Wood design team.`,
        keywords: title.toLowerCase().split(' ').join(', ')
      },
      status: 'published'
    });
  }
  
  return posts;
};

const generateTestimonials = () => {
  return [
    {
      id: 'test-1',
      name: 'Priya Patel',
      location: 'Ahmedabad',
      rating: 5,
      title: 'Exceptional Kitchen Design',
      content: 'The team at Lomash Wood transformed our kitchen beyond our expectations. Professional service, quality materials, and attention to detail throughout.',
      image: '/images/testimonials/customer-1.jpg',
      projectType: 'kitchen',
      date: '2024-03-15'
    },
    {
      id: 'test-2',
      name: 'Rajesh Shah',
      location: 'Satellite, Ahmedabad',
      rating: 5,
      title: 'Beautiful Bedroom Wardrobes',
      content: 'Our master bedroom is now a dream come true. The fitted wardrobes are stunning and provide so much storage. Highly recommend!',
      image: '/images/testimonials/customer-2.jpg',
      projectType: 'bedroom',
      date: '2024-02-28'
    },
    {
      id: 'test-3',
      name: 'Amit Mehta',
      location: 'Bodakdev, Ahmedabad',
      rating: 5,
      title: 'Complete Home Makeover',
      content: 'We chose the complete home package - kitchen and bedroom. The coordination was seamless, and the results are absolutely gorgeous.',
      image: '/images/testimonials/customer-3.jpg',
      projectType: 'both',
      date: '2024-04-10'
    },
    {
      id: 'test-4',
      name: 'Sneha Desai',
      location: 'Vastrapur, Ahmedabad',
      rating: 5,
      title: 'Professional and Reliable',
      content: 'From design consultation to installation, everything was handled professionally. Our new kitchen is the heart of our home now.',
      image: '/images/testimonials/customer-4.jpg',
      projectType: 'kitchen',
      date: '2024-01-20'
    },
    {
      id: 'test-5',
      name: 'Karan Trivedi',
      location: 'Ahmedabad',
      rating: 5,
      title: 'Worth Every Penny',
      content: 'Initially worried about the investment, but the quality and finish are outstanding. The 20-year warranty gives great peace of mind.',
      image: '/images/testimonials/customer-5.jpg',
      projectType: 'bedroom',
      date: '2024-03-05'
    }
  ];
};

const generateProjects = (count = 20) => {
  const projects = [];
  
  for (let i = 1; i <= count; i++) {
    const isKitchen = Math.random() > 0.5;
    
    projects.push({
      id: `project-${i}`,
      title: isKitchen ? `Modern Kitchen Project ${i}` : `Elegant Bedroom Project ${i}`,
      category: isKitchen ? 'kitchen' : 'bedroom',
      location: 'Ahmedabad, Gujarat',
      description: `A stunning ${isKitchen ? 'kitchen' : 'bedroom'} transformation showcasing our design expertise and quality craftsmanship.`,
      images: [
        `/images/projects/${isKitchen ? 'kitchen' : 'bedroom'}-${i}-1.jpg`,
        `/images/projects/${isKitchen ? 'kitchen' : 'bedroom'}-${i}-2.jpg`,
        `/images/projects/${isKitchen ? 'kitchen' : 'bedroom'}-${i}-3.jpg`
      ],
      thumbnail: `/images/projects/${isKitchen ? 'kitchen' : 'bedroom'}-${i}-thumb.jpg`,
      featured: i <= 6,
      completedDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
    });
  }
  
  return projects;
};

const generateOffers = () => {
  return [
    {
      id: 'offer-1',
      title: 'New Year Kitchen Sale',
      category: 'kitchen',
      discount: 25,
      description: 'Save up to 25% on all premium kitchen ranges',
      terms: 'Valid until January 31st, 2026. Cannot be combined with other offers. T&Cs apply.',
      image: '/images/offers/new-year-kitchen.jpg',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      active: true
    },
    {
      id: 'offer-2',
      title: 'Bedroom Makeover Special',
      category: 'bedroom',
      discount: 20,
      description: 'Transform your bedroom with 20% off fitted wardrobes',
      terms: 'Valid until February 14th, 2026. Minimum spend £3000. T&Cs apply.',
      image: '/images/offers/bedroom-special.jpg',
      startDate: '2026-01-15',
      endDate: '2026-02-14',
      active: true
    },
    {
      id: 'offer-3',
      title: 'Complete Home Package Deal',
      category: 'both',
      discount: 30,
      description: 'Save 30% when you buy kitchen and bedroom together',
      terms: 'Valid for premium and luxury ranges only. Book consultation by March 31st. T&Cs apply.',
      image: '/images/offers/home-package.jpg',
      startDate: '2026-01-01',
      endDate: '2026-03-31',
      active: true
    }
  ];
};

const generateFinanceOptions = () => {
  return [
    {
      id: 'finance-1',
      name: '0% APR Finance',
      duration: '12 months',
      apr: 0,
      minSpend: 3000,
      description: 'Interest-free credit for 12 months',
      features: [
        'No deposit required',
        'No interest charges',
        'Fixed monthly payments',
        'Early settlement option'
      ],
      popular: true
    },
    {
      id: 'finance-2',
      name: 'Low APR Finance',
      duration: '24 months',
      apr: 9.9,
      minSpend: 5000,
      description: 'Spread the cost over 2 years',
      features: [
        '10% deposit',
        'Low APR of 9.9%',
        'Fixed monthly payments',
        'Flexible payment dates'
      ],
      popular: false
    },
    {
      id: 'finance-3',
      name: 'Extended Finance',
      duration: '60 months',
      apr: 12.9,
      minSpend: 10000,
      description: 'Long-term payment plan for larger projects',
      features: [
        '10% deposit',
        'APR of 12.9%',
        'Up to 5 years to pay',
        'Early settlement discounts'
      ],
      popular: false
    }
  ];
};

const generateAppointmentSlots = () => {
  const slots = [];
  const today = new Date();

  for (let day = 1; day <= 30; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);

    if (date.getDay() === 0) continue;
    
    const dateStr = date.toISOString().split('T')[0];

    slots.push(
      { date: dateStr, time: '10:00', available: Math.random() > 0.3 },
      { date: dateStr, time: '10:30', available: Math.random() > 0.3 },
      { date: dateStr, time: '11:00', available: Math.random() > 0.3 },
      { date: dateStr, time: '11:30', available: Math.random() > 0.3 }
    );

    slots.push(
      { date: dateStr, time: '14:00', available: Math.random() > 0.3 },
      { date: dateStr, time: '14:30', available: Math.random() > 0.3 },
      { date: dateStr, time: '15:00', available: Math.random() > 0.3 },
      { date: dateStr, time: '15:30', available: Math.random() > 0.3 }
    );

    slots.push(
      { date: dateStr, time: '17:00', available: Math.random() > 0.3 },
      { date: dateStr, time: '17:30', available: Math.random() > 0.3 },
      { date: dateStr, time: '18:00', available: Math.random() > 0.3 }
    );
  }
  
  return slots;
};

const generateAllData = () => {
  console.log('🚀 Generating seed data for Lomash Wood...\n');
  
  const data = {
    products: {
      kitchen: generateKitchenProducts(50),
      bedroom: generateBedroomProducts(50)
    },
    packages: generatePackages(),
    showrooms: generateShowrooms(),
    blog: generateBlogPosts(20),
    testimonials: generateTestimonials(),
    projects: generateProjects(20),
    offers: generateOffers(),
    financeOptions: generateFinanceOptions(),
    appointmentSlots: generateAppointmentSlots(),
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      totalProducts: 100,
      totalPackages: 6,
      totalShowrooms: 3
    }
  };
  
  return data;
};

const data = generateAllData();
const outputPath = path.join(__dirname, '..', 'data', 'seed-data.json');

const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('✅ Seed data generated successfully!');
console.log(`📁 File saved to: ${outputPath}`);
console.log(`\n📊 Statistics:`);
console.log(`   - Kitchen Products: ${data.products.kitchen.length}`);
console.log(`   - Bedroom Products: ${data.products.bedroom.length}`);
console.log(`   - Packages: ${data.packages.length}`);
console.log(`   - Showrooms: ${data.showrooms.length}`);
console.log(`   - Blog Posts: ${data.blog.length}`);
console.log(`   - Testimonials: ${data.testimonials.length}`);
console.log(`   - Projects: ${data.projects.length}`);
console.log(`   - Offers: ${data.offers.length}`);
console.log(`   - Finance Options: ${data.financeOptions.length}`);
console.log(`   - Appointment Slots: ${data.appointmentSlots.length}`);

module.exports = {
  generateAllData,
  generateKitchenProducts,
  generateBedroomProducts,
  generatePackages,
  generateShowrooms,
  generateBlogPosts,
  generateTestimonials,
  generateProjects,
  generateOffers,
  generateFinanceOptions,
  generateAppointmentSlots
};