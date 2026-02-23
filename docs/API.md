# Lomash Wood - API Documentation

Complete API documentation for the Lomash Wood Kitchen & Bedroom Design website.

---

## Table of Contents

1. [Overview](#overview)
2. [Base URLs](#base-urls)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
5. [Request/Response Examples](#requestresponse-examples)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Data Models](#data-models)

---

## Overview

### API Architecture

The Lomash Wood API is built using Next.js API routes with the following characteristics:

- **REST Architecture**: Standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
- **JSON Format**: All requests and responses use JSON
- **TypeScript**: Fully typed API with strict type checking
- **Validation**: Zod schemas for request validation
- **Authentication**: JWT-based authentication with NextAuth.js
- **Rate Limiting**: IP-based rate limiting for security

### Tech Stack

- Next.js API Routes
- TypeScript
- Zod (Validation)
- React Query (Client-side data fetching)
- NextAuth.js (Authentication)

---

## Base URLs

### Development
```
http://localhost:3000/api
```

### Staging
```
https://staging.lomashwood.com/api
```

### Production
```
https://www.lomashwood.com/api
```

---

## Authentication

### Authentication Flow

The API uses JWT tokens for authentication via NextAuth.js.

#### Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Register

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securepassword123",
  "phone": "+91 9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "message": "Registration successful. Please verify your email."
  }
}
```

#### Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Protected Routes

For protected endpoints, include the JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## API Endpoints

### Products

#### Get All Products

**Endpoint:** `GET /api/products`

**Query Parameters:**
- `category` (string, optional): "kitchen" | "bedroom"
- `color` (string, optional): Color filter
- `style` (string, optional): Style filter
- `finish` (string, optional): Finish filter
- `minPrice` (number, optional): Minimum price
- `maxPrice` (number, optional): Maximum price
- `sort` (string, optional): "price_asc" | "price_desc" | "newest" | "popular"
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 12)
- `search` (string, optional): Search query

**Example Request:**
```
GET /api/products?category=kitchen&color=white&sort=price_asc&page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "name": "Modern L-Shaped Kitchen",
        "slug": "modern-l-shaped-kitchen",
        "category": "kitchen",
        "description": "Contemporary L-shaped kitchen design",
        "images": [
          {
            "url": "/images/products/kitchen/modern-l-shaped-1.jpg",
            "alt": "Modern L-Shaped Kitchen",
            "isPrimary": true
          }
        ],
        "colors": [
          {
            "name": "White",
            "code": "#FFFFFF",
            "image": "/images/colors/white.jpg"
          }
        ],
        "styles": ["modern", "contemporary"],
        "finishes": ["matte", "glossy"],
        "price": {
          "base": 150000,
          "currency": "INR",
          "formatted": "₹1,50,000"
        },
        "isOnSale": false,
        "isFeatured": true,
        "rating": 4.5,
        "reviewCount": 23,
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 58,
      "itemsPerPage": 12,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "filters": {
      "colors": ["white", "black", "wood", "grey"],
      "styles": ["modern", "contemporary", "traditional"],
      "finishes": ["matte", "glossy", "textured"],
      "priceRange": {
        "min": 50000,
        "max": 500000
      }
    }
  }
}
```

#### Get Product by ID

**Endpoint:** `GET /api/products/[id]`

**Example Request:**
```
GET /api/products/prod_123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "name": "Modern L-Shaped Kitchen",
    "slug": "modern-l-shaped-kitchen",
    "category": "kitchen",
    "description": "Contemporary L-shaped kitchen design with premium finishes",
    "longDescription": "Detailed description of the product...",
    "images": [
      {
        "url": "/images/products/kitchen/modern-l-shaped-1.jpg",
        "alt": "Modern L-Shaped Kitchen - Front View",
        "isPrimary": true
      },
      {
        "url": "/images/products/kitchen/modern-l-shaped-2.jpg",
        "alt": "Modern L-Shaped Kitchen - Side View",
        "isPrimary": false
      }
    ],
    "colors": [
      {
        "id": "color_1",
        "name": "White",
        "code": "#FFFFFF",
        "image": "/images/colors/white.jpg"
      }
    ],
    "styles": ["modern", "contemporary"],
    "finishes": [
      {
        "id": "finish_1",
        "name": "Matte",
        "code": "matte",
        "image": "/images/finishes/matte.jpg"
      }
    ],
    "price": {
      "base": 150000,
      "currency": "INR",
      "formatted": "₹1,50,000"
    },
    "dimensions": {
      "length": 3000,
      "width": 2400,
      "height": 2100,
      "unit": "mm"
    },
    "specifications": [
      {
        "label": "Material",
        "value": "Premium MDF"
      },
      {
        "label": "Warranty",
        "value": "10 years"
      }
    ],
    "features": [
      "Soft-close hinges",
      "Pull-out drawers",
      "Modular design"
    ],
    "isOnSale": false,
    "salePrice": null,
    "isFeatured": true,
    "rating": 4.5,
    "reviewCount": 23,
    "relatedProducts": ["prod_124", "prod_125"],
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-20T14:45:00Z"
  }
}
```

---

### Appointments

#### Get Available Time Slots

**Endpoint:** `GET /api/appointments/availability`

**Query Parameters:**
- `date` (string, required): Date in YYYY-MM-DD format
- `showroomId` (string, optional): Specific showroom ID
- `serviceType` (string, required): "consultation" | "measurement" | "installation"

**Example Request:**
```
GET /api/appointments/availability?date=2025-02-15&serviceType=consultation
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2025-02-15",
    "availableSlots": [
      {
        "time": "10:00",
        "available": true,
        "showroomId": "showroom_1"
      },
      {
        "time": "11:00",
        "available": true,
        "showroomId": "showroom_1"
      },
      {
        "time": "14:00",
        "available": false,
        "showroomId": "showroom_1"
      },
      {
        "time": "15:00",
        "available": true,
        "showroomId": "showroom_1"
      }
    ]
  }
}
```

#### Create Appointment

**Endpoint:** `POST /api/appointments`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "appointmentType": "consultation",
  "serviceType": "kitchen",
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "address": {
      "street": "123 Main Street",
      "city": "Ahmedabad",
      "state": "Gujarat",
      "pincode": "380001"
    }
  },
  "date": "2025-02-15",
  "timeSlot": "10:00",
  "showroomId": "showroom_1",
  "notes": "Interested in modern kitchen design"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "appt_123",
    "appointmentNumber": "LW-2025-0001",
    "appointmentType": "consultation",
    "serviceType": "kitchen",
    "status": "pending",
    "customerDetails": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 9876543210"
    },
    "date": "2025-02-15",
    "timeSlot": "10:00",
    "showroom": {
      "id": "showroom_1",
      "name": "Lomash Wood - Ahmedabad Central",
      "address": "123 CG Road, Ahmedabad"
    },
    "createdAt": "2025-01-22T10:30:00Z"
  },
  "message": "Appointment booked successfully. Confirmation email sent."
}
```

#### Get User Appointments

**Endpoint:** `GET /api/appointments`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (string, optional): "pending" | "confirmed" | "completed" | "cancelled"
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "appt_123",
        "appointmentNumber": "LW-2025-0001",
        "appointmentType": "consultation",
        "serviceType": "kitchen",
        "status": "confirmed",
        "date": "2025-02-15",
        "timeSlot": "10:00",
        "showroom": {
          "name": "Lomash Wood - Ahmedabad Central",
          "address": "123 CG Road, Ahmedabad"
        },
        "createdAt": "2025-01-22T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15
    }
  }
}
```

#### Get Appointment Details

**Endpoint:** `GET /api/appointments/[id]`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "appt_123",
    "appointmentNumber": "LW-2025-0001",
    "appointmentType": "consultation",
    "serviceType": "kitchen",
    "status": "confirmed",
    "customerDetails": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 9876543210",
      "address": {
        "street": "123 Main Street",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "pincode": "380001"
      }
    },
    "date": "2025-02-15",
    "timeSlot": "10:00",
    "showroom": {
      "id": "showroom_1",
      "name": "Lomash Wood - Ahmedabad Central",
      "address": "123 CG Road, Ahmedabad",
      "phone": "+91 79 1234 5678"
    },
    "notes": "Interested in modern kitchen design",
    "assignedTo": {
      "id": "staff_1",
      "name": "Rajesh Kumar",
      "role": "Design Consultant"
    },
    "createdAt": "2025-01-22T10:30:00Z",
    "updatedAt": "2025-01-22T11:00:00Z"
  }
}
```

#### Cancel Appointment

**Endpoint:** `PATCH /api/appointments/[id]`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "cancelled",
  "cancellationReason": "Schedule conflict"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "data": {
    "id": "appt_123",
    "status": "cancelled"
  }
}
```

---

### Showrooms

#### Get All Showrooms

**Endpoint:** `GET /api/showrooms`

**Query Parameters:**
- `city` (string, optional): Filter by city
- `state` (string, optional): Filter by state
- `search` (string, optional): Search by name or location

**Example Request:**
```
GET /api/showrooms?city=Ahmedabad
```

**Response:**
```json
{
  "success": true,
  "data": {
    "showrooms": [
      {
        "id": "showroom_1",
        "name": "Lomash Wood - Ahmedabad Central",
        "slug": "ahmedabad-central",
        "address": {
          "street": "123 CG Road",
          "area": "Navrangpura",
          "city": "Ahmedabad",
          "state": "Gujarat",
          "pincode": "380009",
          "country": "India"
        },
        "coordinates": {
          "latitude": 23.0225,
          "longitude": 72.5714
        },
        "contact": {
          "phone": "+91 79 1234 5678",
          "email": "ahmedabad@lomashwood.com"
        },
        "operatingHours": {
          "monday": { "open": "10:00", "close": "20:00" },
          "tuesday": { "open": "10:00", "close": "20:00" },
          "wednesday": { "open": "10:00", "close": "20:00" },
          "thursday": { "open": "10:00", "close": "20:00" },
          "friday": { "open": "10:00", "close": "20:00" },
          "saturday": { "open": "10:00", "close": "20:00" },
          "sunday": { "open": "10:00", "close": "18:00" }
        },
        "facilities": [
          "Free Parking",
          "Virtual Reality Experience",
          "Kids Play Area"
        ],
        "images": [
          "/images/showrooms/ahmedabad-1.jpg",
          "/images/showrooms/ahmedabad-2.jpg"
        ],
        "isActive": true
      }
    ]
  }
}
```

---

### Contact

#### Submit Contact Form

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "subject": "Kitchen Design Inquiry",
  "message": "I'm interested in modern kitchen designs. Please contact me.",
  "preferredContactMethod": "email",
  "category": "product_inquiry"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll get back to you soon.",
  "data": {
    "id": "contact_123",
    "referenceNumber": "LW-CONTACT-2025-0001",
    "createdAt": "2025-01-22T10:30:00Z"
  }
}
```

---

### Newsletter

#### Subscribe to Newsletter

**Endpoint:** `POST /api/newsletter`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "preferences": {
    "productUpdates": true,
    "offers": true,
    "designTips": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter. Please check your email to confirm.",
  "data": {
    "email": "user@example.com",
    "subscriptionId": "sub_123"
  }
}
```

#### Unsubscribe from Newsletter

**Endpoint:** `POST /api/newsletter/unsubscribe`

**Request Body:**
```json
{
  "email": "user@example.com",
  "token": "unsubscribe_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

### Brochure Request

#### Request Brochure

**Endpoint:** `POST /api/brochure`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "brochureType": "kitchen",
  "address": {
    "street": "123 Main Street",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "pincode": "380001"
  },
  "deliveryMethod": "email"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Brochure request submitted successfully. You'll receive it via email shortly.",
  "data": {
    "requestId": "brochure_123",
    "downloadLink": "https://cdn.lomashwood.com/brochures/kitchen-2025.pdf",
    "expiresAt": "2025-01-29T10:30:00Z"
  }
}
```

---

### Business Partnership

#### Submit Business Inquiry

**Endpoint:** `POST /api/business`

**Request Body:**
```json
{
  "companyName": "ABC Interiors",
  "contactPerson": "Jane Smith",
  "email": "jane@abcinteriors.com",
  "phone": "+91 9876543210",
  "businessType": "interior_designer",
  "annualVolume": "50-100 lakhs",
  "address": {
    "street": "456 Business Park",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "message": "Interested in partnership opportunities"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Business inquiry submitted successfully. Our team will contact you within 2 business days.",
  "data": {
    "inquiryId": "business_123",
    "referenceNumber": "LW-BIZ-2025-0001"
  }
}
```

---

### Blog

#### Get All Blog Posts

**Endpoint:** `GET /api/blog`

**Query Parameters:**
- `category` (string, optional): Filter by category slug
- `tag` (string, optional): Filter by tag
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page
- `search` (string, optional): Search query

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "title": "10 Modern Kitchen Design Trends for 2025",
        "slug": "modern-kitchen-design-trends-2025",
        "excerpt": "Discover the latest kitchen design trends...",
        "featuredImage": "/images/blog/kitchen-trends-2025.jpg",
        "category": {
          "id": "cat_1",
          "name": "Kitchen Design",
          "slug": "kitchen-design"
        },
        "tags": ["modern", "trends", "kitchen"],
        "author": {
          "id": "author_1",
          "name": "Priya Sharma",
          "avatar": "/images/authors/priya.jpg"
        },
        "publishedAt": "2025-01-20T10:00:00Z",
        "readTime": "5 min read"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalItems": 95
    }
  }
}
```

#### Get Blog Post by Slug

**Endpoint:** `GET /api/blog/[slug]`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "title": "10 Modern Kitchen Design Trends for 2025",
    "slug": "modern-kitchen-design-trends-2025",
    "content": "<p>Full blog content in HTML...</p>",
    "excerpt": "Discover the latest kitchen design trends...",
    "featuredImage": "/images/blog/kitchen-trends-2025.jpg",
    "category": {
      "id": "cat_1",
      "name": "Kitchen Design",
      "slug": "kitchen-design"
    },
    "tags": ["modern", "trends", "kitchen"],
    "author": {
      "id": "author_1",
      "name": "Priya Sharma",
      "bio": "Senior Interior Designer with 10+ years experience",
      "avatar": "/images/authors/priya.jpg"
    },
    "publishedAt": "2025-01-20T10:00:00Z",
    "updatedAt": "2025-01-21T15:30:00Z",
    "readTime": "5 min read",
    "views": 1234,
    "relatedPosts": ["post_124", "post_125"]
  }
}
```

---

### Upload

#### Upload Image

**Endpoint:** `POST /api/upload`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body:**
```
FormData with file field
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.lomashwood.com/uploads/image_123.jpg",
    "filename": "image_123.jpg",
    "size": 245678,
    "mimeType": "image/jpeg",
    "uploadedAt": "2025-01-22T10:30:00Z"
  }
}
```

---

### User Account

#### Get User Profile

**Endpoint:** `GET /api/user/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "avatar": "/images/users/user_123.jpg",
    "address": {
      "street": "123 Main Street",
      "city": "Ahmedabad",
      "state": "Gujarat",
      "pincode": "380001"
    },
    "preferences": {
      "emailNotifications": true,
      "smsNotifications": false,
      "newsletter": true
    },
    "createdAt": "2024-12-01T10:00:00Z"
  }
}
```

#### Update User Profile

**Endpoint:** `PATCH /api/user/profile`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "+91 9876543210",
  "address": {
    "street": "456 New Street",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "pincode": "380001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_123",
    "name": "John Doe Updated",
    "email": "john@example.com"
  }
}
```

#### Get User Wishlist

**Endpoint:** `GET /api/user/wishlist`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "wishlist_1",
        "product": {
          "id": "prod_123",
          "name": "Modern L-Shaped Kitchen",
          "image": "/images/products/kitchen/modern-l-shaped-1.jpg",
          "price": {
            "base": 150000,
            "formatted": "₹1,50,000"
          }
        },
        "addedAt": "2025-01-20T10:00:00Z"
      }
    ],
    "count": 5
  }
}
```

#### Add to Wishlist

**Endpoint:** `POST /api/user/wishlist`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "prod_123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product added to wishlist",
  "data": {
    "id": "wishlist_1",
    "productId": "prod_123"
  }
}
```

#### Remove from Wishlist

**Endpoint:** `DELETE /api/user/wishlist/[productId]`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Product removed from wishlist"
}
```

---

## Error Handling

### Error Response Format

All errors follow a consistent format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Specific field error details"
    }
  }
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

### Common Error Codes
```typescript
{
  // Authentication Errors
  AUTH_INVALID_CREDENTIALS: "Invalid email or password",
  AUTH_TOKEN_EXPIRED: "Authentication token has expired",
  AUTH_UNAUTHORIZED: "Authentication required",
  
  // Validation Errors
  VALIDATION_ERROR: "Input validation failed",
  INVALID_EMAIL: "Invalid email format",
  INVALID_PHONE: "Invalid phone number",
  REQUIRED_FIELD: "Required field is missing",
  
  // Resource Errors
  RESOURCE_NOT_FOUND: "Requested resource not found",
  PRODUCT_NOT_FOUND: "Product not found",
  APPOINTMENT_NOT_FOUND: "Appointment not found",
  
  // Business Logic Errors
  APPOINTMENT_SLOT_UNAVAILABLE: "Selected time slot is not available",
  APPOINTMENT_ALREADY_BOOKED: "You already have an appointment at this time",
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later",
  
  // Server Errors
  INTERNAL_SERVER_ERROR: "An unexpected error occurred",
  DATABASE_ERROR: "Database operation failed"
}
```

### Example Error Responses

#### Validation Error (422)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "details": {
      "email": "Invalid email format",
      "phone": "Phone number must be 10 digits"
    }
  }
}
```

#### Authentication Error (401)
```json
{
  "success": false,
  "error": {
    "code": "AUTH_UNAUTHORIZED",
    "message": "Authentication required. Please log in."
  }
}
```

#### Not Found Error (404)
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 'prod_999' not found"
  }
}
```

#### Rate Limit Error (429)
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

---

## Rate Limiting

### Rate Limit Policy

| Endpoint Type | Rate Limit | Window |
|---------------|------------|--------|
| Authentication | 5 requests | 15 minutes |
| Product Listing | 100 requests | 1 hour |
| Appointment Booking | 10 requests | 1 hour |
| Form Submissions | 20 requests | 1 hour |
| General API | 1000 requests | 1 hour |

### Rate Limit Headers