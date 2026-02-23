import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_APP_NAME: string;

      DATABASE_URL: string;

      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      JWT_SECRET: string;

      SMTP_HOST?: string;
      SMTP_PORT?: string;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
      EMAIL_FROM?: string;

      CLOUDINARY_CLOUD_NAME?: string;
      CLOUDINARY_API_KEY?: string;
      CLOUDINARY_API_SECRET?: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;

      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_REGION?: string;
      AWS_S3_BUCKET?: string;

      STRIPE_PUBLIC_KEY?: string;
      STRIPE_SECRET_KEY?: string;
      STRIPE_WEBHOOK_SECRET?: string;
      RAZORPAY_KEY_ID?: string;
      RAZORPAY_KEY_SECRET?: string;

      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
      NEXT_PUBLIC_GTM_ID?: string;

      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string;

      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      FACEBOOK_CLIENT_ID?: string;
      FACEBOOK_CLIENT_SECRET?: string;

      REDIS_URL?: string;

      NEXT_PUBLIC_ENABLE_BLOG?: string;
      NEXT_PUBLIC_ENABLE_SHOWROOMS?: string;
      NEXT_PUBLIC_ENABLE_WISHLIST?: string;
    }
  }
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;

    dataLayer?: Array<Record<string, unknown>>;

    Razorpay?: new (options: unknown) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };

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

    FB?: {
      init: (params: unknown) => void;
      login: (callback: (response: unknown) => void, options?: unknown) => void;
      logout: (callback: () => void) => void;
    };

    __LOMASH_WOOD_INITIALIZED__?: boolean;
  }
}

declare module "csstype" {
  interface Properties {
    "--lomash-primary"?: string;
    "--lomash-secondary"?: string;
    "--lomash-accent"?: string;
  }
}

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

declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}

declare global {
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
  };

  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

  type RequiredFields<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;

  type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
  }[keyof T];

  type Nullable<T> = T | null;

  type Maybe<T> = T | undefined;

  type ValueOf<T> = T[keyof T];

  type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

  type VoidFunction = () => void;
  type AsyncVoidFunction = () => Promise<void>;
  type Callback<T = void> = (value: T) => void;
  type AsyncCallback<T = void> = (value: T) => Promise<void>;

  type ID = string | number;
  type UUID = string;

  type Timestamp = number;
  type ISODateString = string;

  type EmptyObject = Record<string, never>;
  type AnyObject = Record<string, unknown>;
  type StringRecord = Record<string, string>;
  type NumberRecord = Record<string, number>;

  type NonEmptyArray<T> = [T, ...T[]];
  type ReadonlyNonEmptyArray<T> = readonly [T, ...T[]];

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

  type UnionToIntersection<U> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  type ArgumentTypes<F extends (...args: unknown[]) => unknown> =
    F extends (...args: infer A) => unknown ? A : never;

  type ReturnTypeOf<F extends (...args: unknown[]) => unknown> =
    F extends (...args: unknown[]) => infer R ? R : never;

  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

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

declare module "react" {
  interface HTMLAttributes<T> {
    "data-testid"?: string;
    "data-cy"?: string;
  }
}

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

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
    skipAuth?: boolean;
    cache?: boolean;
    cacheTTL?: number;
  }
}

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