// Global type declarations for the Lomash Wood application

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

// Next.js Page Types with Layout Support
export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Environment Variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App
      NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_APP_NAME: string;
      
      // Database
      DATABASE_URL: string;
      
      // Authentication
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      JWT_SECRET: string;
      
      // Email
      SMTP_HOST?: string;
      SMTP_PORT?: string;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
      EMAIL_FROM?: string;
      
      // Cloud Storage
      CLOUDINARY_CLOUD_NAME?: string;
      CLOUDINARY_API_KEY?: string;
      CLOUDINARY_API_SECRET?: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
      
      // AWS S3
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_REGION?: string;
      AWS_S3_BUCKET?: string;
      
      // Payment
      STRIPE_PUBLIC_KEY?: string;
      STRIPE_SECRET_KEY?: string;
      STRIPE_WEBHOOK_SECRET?: string;
      RAZORPAY_KEY_ID?: string;
      RAZORPAY_KEY_SECRET?: string;
      
      // Analytics
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
      NEXT_PUBLIC_GTM_ID?: string;
      
      // Maps
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string;
      
      // Social Auth
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      FACEBOOK_CLIENT_ID?: string;
      FACEBOOK_CLIENT_SECRET?: string;
      
      // Rate Limiting
      REDIS_URL?: string;
      
      // Feature Flags
      NEXT_PUBLIC_ENABLE_BLOG?: string;
      NEXT_PUBLIC_ENABLE_SHOWROOMS?: string;
      NEXT_PUBLIC_ENABLE_WISHLIST?: string;
    }
  }
}

// Window extensions
declare global {
  interface Window {
    // Google Analytics
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    
    // Google Tag Manager
    dataLayer?: Array<Record<string, unknown>>;
    
    // Razorpay
    Razorpay?: new (options: unknown) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
    
    // Google Maps
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
        places: {
          PlacesService: new (map: unknown) => unknown;
          Autocomplete: new (input: HTMLInputElement, options: unknown) => unknown;
        };
      };
    };
    
    // Facebook SDK
    FB?: {
      init: (params: unknown) => void;
      login: (callback: (response: unknown) => void, options?: unknown) => void;
      logout: (callback: () => void) => void;
    };
    
    // Custom properties
    __LOMASH_WOOD_INITIALIZED__?: boolean;
  }
}

// Custom CSS Properties
declare module "csstype" {
  interface Properties {
    "--lomash-primary"?: string;
    "--lomash-secondary"?: string;
    "--lomash-accent"?: string;
  }
}

// Image imports
declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

// JSON imports
declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}

// Common Utility Types
declare global {
  // Make all properties optional recursively
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  // Make all properties required recursively
  type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
  };

  // Make specific properties optional
  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

  // Make specific properties required
  type RequiredFields<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;

  // Extract keys of a type that are of a specific type
  type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T];

  // Nullable type
  type Nullable<T> = T | null;

  // Maybe type
  type Maybe<T> = T | undefined;

  // ValueOf type
  type ValueOf<T> = T[keyof T];

  // Awaited (for promise types)
  type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

  // Function types
  type VoidFunction = () => void;
  type AsyncVoidFunction = () => Promise<void>;
  type Callback<T = void> = (value: T) => void;
  type AsyncCallback<T = void> = (value: T) => Promise<void>;

  // ID types
  type ID = string | number;
  type UUID = string;

  // Timestamp types
  type Timestamp = number;
  type ISODateString = string;

  // Common object types
  type EmptyObject = Record<string, never>;
  type AnyObject = Record<string, unknown>;
  type StringRecord = Record<string, string>;
  type NumberRecord = Record<string, number>;

  // Array utilities
  type NonEmptyArray<T> = [T, ...T[]];
  type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]];

  // Tuple utilities
  type Head<T extends readonly unknown[]> = T extends readonly [
    infer First,
    ...unknown[]
  ]
    ? First
    : never;

  type Tail<T extends readonly unknown[]> = T extends readonly [
    unknown,
    ...infer Rest
  ]
    ? Rest
    : never;

  // Union to Intersection
  type UnionToIntersection<U> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  // Extract function arguments
  type ArgumentTypes<F extends (...args: unknown[]) => unknown> =
    F extends (...args: infer A) => unknown ? A : never;

  // Extract function return type
  type ReturnTypeOf<F extends (...args: unknown[]) => unknown> =
    F extends (...args: unknown[]) => infer R ? R : never;

  // Prettify type (for better IDE display)
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  // Mutable type (remove readonly)
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  // Path types for nested objects
  type PathImpl<T, K extends keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ?
          | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof unknown[]>> &
              string}`
          | `${K}.${Exclude<keyof T[K], keyof unknown[]> & string}`
      : never
    : never;

  type Path<T> = PathImpl<T, keyof T> | keyof T;

  type PathValue<
    T,
    P extends Path<T>
  > = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? Rest extends Path<T[K]>
        ? PathValue<T[K], Rest>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : never;
}

// Extend existing types
declare module "react" {
  // Additional props for all components
  interface HTMLAttributes<T> {
    // Custom data attributes
    "data-testid"?: string;
    "data-cy"?: string;
  }
}

// Styled Components (if using)
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      dark: string;
      light: string;
    };
    fonts: {
      sans: string;
      heading: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
  }
}

// Axios extensions
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    skipAuth?: boolean;
    cache?: boolean;
    cacheTTL?: number;
  }
}

// React Query extensions
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: {
      message: string;
      code?: string;
      statusCode?: number;
    };
  }
}

export {};