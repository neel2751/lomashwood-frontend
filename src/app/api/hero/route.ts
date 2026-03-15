import { NextResponse } from 'next/server';

const heroData = [
  {
    id: '1',
    title: 'Transform Your Kitchen',
    subtitle: 'Luxury fitted kitchens designed around you',
    description: 'Discover our stunning range of bespoke kitchen designs, crafted with premium materials and expert craftsmanship.',
    image: '/images/hero/hero-1.jpg',
    video: '/videos/hero-video.mp4',
    ctaText: 'Explore Kitchens',
    ctaLink: '/kitchen',
    secondaryCtaText: 'Book Appointment',
    secondaryCtaLink: '/book-appointment',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Beautiful Bedrooms',
    subtitle: 'Fitted bedrooms tailored to your lifestyle',
    description: 'From fitted wardrobes to complete bedroom transformations, we create spaces you will love to wake up in.',
    image: '/images/hero/hero-2.jpg',
    video: null,
    ctaText: 'Explore Bedrooms',
    ctaLink: '/bedroom',
    secondaryCtaText: 'Get Inspired',
    secondaryCtaLink: '/inspiration',
    isActive: true,
    order: 2,
  },
];

export async function GET() {
  try {
    const activeSlides = heroData
      .filter((slide) => slide.isActive)
      .sort((a, b) => a.order - b.order);

    return NextResponse.json(
      {
        success: true,
        data: {
          slides: activeSlides,
          total: activeSlides.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Hero API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching hero data',
      },
      { status: 500 }
    );
  }
}
