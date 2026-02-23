import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

const showrooms = [
  {
    id: '1',
    name: 'Lomash Wood - Ahmedabad Central',
    slug: 'ahmedabad-central',
    address: {
      street: 'CG Road, Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
      country: 'India',
    },
    location: {
      lat: 23.0359,
      lng: 72.5561,
    },
    contact: {
      phone: '+91 79 4000 5000',
      email: 'ahmedabad.central@lomashwood.com',
      whatsapp: '+91 98250 12345',
    },
    operatingHours: {
      monday: { open: '10:00', close: '20:00', isOpen: true },
      tuesday: { open: '10:00', close: '20:00', isOpen: true },
      wednesday: { open: '10:00', close: '20:00', isOpen: true },
      thursday: { open: '10:00', close: '20:00', isOpen: true },
      friday: { open: '10:00', close: '20:00', isOpen: true },
      saturday: { open: '10:00', close: '21:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: true },
    },
    services: [
      'Kitchen Design Consultation',
      'Bedroom Design Consultation',
      'Free 3D Design',
      'Material Samples',
      'Finance Options',
      'Installation Services',
    ],
    features: [
      'Live Kitchen & Bedroom Displays',
      'Expert Design Team',
      'Free Parking',
      'Wheelchair Accessible',
      'Virtual Reality Design',
    ],
    images: [
      '/images/showrooms/ahmedabad-central-1.jpg',
      '/images/showrooms/ahmedabad-central-2.jpg',
      '/images/showrooms/ahmedabad-central-3.jpg',
    ],
    manager: {
      name: 'Rajesh Patel',
      designation: 'Showroom Manager',
      phone: '+91 98250 12345',
    },
    isActive: true,
    isPremium: true,
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Lomash Wood - Satellite',
    slug: 'satellite',
    address: {
      street: 'Opposite Pantaloons, SG Highway',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
      country: 'India',
    },
    location: {
      lat: 23.0255,
      lng: 72.5198,
    },
    contact: {
      phone: '+91 79 4000 5001',
      email: 'satellite@lomashwood.com',
      whatsapp: '+91 98250 12346',
    },
    operatingHours: {
      monday: { open: '10:00', close: '20:00', isOpen: true },
      tuesday: { open: '10:00', close: '20:00', isOpen: true },
      wednesday: { open: '10:00', close: '20:00', isOpen: true },
      thursday: { open: '10:00', close: '20:00', isOpen: true },
      friday: { open: '10:00', close: '20:00', isOpen: true },
      saturday: { open: '10:00', close: '21:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: true },
    },
    services: [
      'Kitchen Design Consultation',
      'Bedroom Design Consultation',
      'Free 3D Design',
      'Material Samples',
      'Finance Options',
    ],
    features: [
      'Live Kitchen & Bedroom Displays',
      'Expert Design Team',
      'Free Parking',
      'Wheelchair Accessible',
    ],
    images: [
      '/images/showrooms/satellite-1.jpg',
      '/images/showrooms/satellite-2.jpg',
    ],
    manager: {
      name: 'Priya Shah',
      designation: 'Showroom Manager',
      phone: '+91 98250 12346',
    },
    isActive: true,
    isPremium: false,
    createdAt: '2023-03-20T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Lomash Wood - Maninagar',
    slug: 'maninagar',
    address: {
      street: 'Maninagar Railway Station Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380008',
      country: 'India',
    },
    location: {
      lat: 23.0091,
      lng: 72.6069,
    },
    contact: {
      phone: '+91 79 4000 5002',
      email: 'maninagar@lomashwood.com',
      whatsapp: '+91 98250 12347',
    },
    operatingHours: {
      monday: { open: '10:00', close: '20:00', isOpen: true },
      tuesday: { open: '10:00', close: '20:00', isOpen: true },
      wednesday: { open: '10:00', close: '20:00', isOpen: true },
      thursday: { open: '10:00', close: '20:00', isOpen: true },
      friday: { open: '10:00', close: '20:00', isOpen: true },
      saturday: { open: '10:00', close: '20:00', isOpen: true },
      sunday: { open: '11:00', close: '19:00', isOpen: true },
    },
    services: [
      'Kitchen Design Consultation',
      'Bedroom Design Consultation',
      'Material Samples',
      'Finance Options',
    ],
    features: [
      'Live Kitchen & Bedroom Displays',
      'Expert Design Team',
      'Free Parking',
    ],
    images: [
      '/images/showrooms/maninagar-1.jpg',
      '/images/showrooms/maninagar-2.jpg',
    ],
    manager: {
      name: 'Kiran Desai',
      designation: 'Showroom Manager',
      phone: '+91 98250 12347',
    },
    isActive: true,
    isPremium: false,
    createdAt: '2023-06-10T00:00:00.000Z',
    updatedAt: '2024-01-08T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Lomash Wood - Prahlad Nagar',
    slug: 'prahlad-nagar',
    address: {
      street: 'Corporate Road, Near TGB',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
      country: 'India',
    },
    location: {
      lat: 23.0077,
      lng: 72.5052,
    },
    contact: {
      phone: '+91 79 4000 5003',
      email: 'prahladnagar@lomashwood.com',
      whatsapp: '+91 98250 12348',
    },
    operatingHours: {
      monday: { open: '10:00', close: '20:00', isOpen: true },
      tuesday: { open: '10:00', close: '20:00', isOpen: true },
      wednesday: { open: '10:00', close: '20:00', isOpen: true },
      thursday: { open: '10:00', close: '20:00', isOpen: true },
      friday: { open: '10:00', close: '20:00', isOpen: true },
      saturday: { open: '10:00', close: '21:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: true },
    },
    services: [
      'Kitchen Design Consultation',
      'Bedroom Design Consultation',
      'Free 3D Design',
      'Material Samples',
      'Finance Options',
      'Installation Services',
      'After Sales Support',
    ],
    features: [
      'Live Kitchen & Bedroom Displays',
      'Expert Design Team',
      'Free Parking',
      'Wheelchair Accessible',
      'Virtual Reality Design',
      'Kids Play Area',
    ],
    images: [
      '/images/showrooms/prahlad-nagar-1.jpg',
      '/images/showrooms/prahlad-nagar-2.jpg',
      '/images/showrooms/prahlad-nagar-3.jpg',
      '/images/showrooms/prahlad-nagar-4.jpg',
    ],
    manager: {
      name: 'Amit Mehta',
      designation: 'Showroom Manager',
      phone: '+91 98250 12348',
    },
    isActive: true,
    isPremium: true,
    createdAt: '2023-09-01T00:00:00.000Z',
    updatedAt: '2024-01-18T00:00:00.000Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const search = searchParams.get('search');
    const isActive = searchParams.get('isActive');
    const isPremium = searchParams.get('isPremium');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let filteredShowrooms = [...showrooms];

    if (city) {
      filteredShowrooms = filteredShowrooms.filter(
        (showroom) => 
          showroom.address.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredShowrooms = filteredShowrooms.filter(
        (showroom) =>
          showroom.name.toLowerCase().includes(searchLower) ||
          showroom.address.street.toLowerCase().includes(searchLower) ||
          showroom.address.city.toLowerCase().includes(searchLower) ||
          showroom.slug.toLowerCase().includes(searchLower)
      );
    }

    if (isActive !== null) {
      filteredShowrooms = filteredShowrooms.filter(
        (showroom) => showroom.isActive === (isActive === 'true')
      );
    }

    if (isPremium !== null) {
      filteredShowrooms = filteredShowrooms.filter(
        (showroom) => showroom.isPremium === (isPremium === 'true')
      );
    }

    if (lat && lng && radius) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxRadius = parseFloat(radius);

      filteredShowrooms = filteredShowrooms.filter((showroom) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          showroom.location.lat,
          showroom.location.lng
        );
        return distance <= maxRadius;
      });

      filteredShowrooms.sort((a, b) => {
        const distA = calculateDistance(
          userLat,
          userLng,
          a.location.lat,
          a.location.lng
        );
        const distB = calculateDistance(
          userLat,
          userLng,
          b.location.lat,
          b.location.lng
        );
        return distA - distB;
      });
    }

    const total = filteredShowrooms.length;
    const limitNum = limit ? parseInt(limit) : total;
    const offsetNum = offset ? parseInt(offset) : 0;
    
    const paginatedShowrooms = filteredShowrooms.slice(
      offsetNum,
      offsetNum + limitNum
    );

    return NextResponse.json(
      {
        success: true,
        data: paginatedShowrooms,
        meta: {
          total,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching showrooms:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch showrooms',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}