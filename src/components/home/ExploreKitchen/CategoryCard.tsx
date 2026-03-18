"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface CategoryCardProps {
  product: Product;
  className?: string;
}

export function CategoryCard({ product, className }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/product/${product.slug}?category=${product.category}`} className="group">
        <div
          className={cn(
            "product-card-pdf overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-300 cursor-pointer",
            className
          )}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-lomash-gray-100 rounded-t-lg">
            <Image
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />

            <div className="absolute top-3 left-3 flex gap-2">
              {product.featured && (
                <Badge variant="default" className="shadow-md">
                  Featured
                </Badge>
              )}
              {product.popular && (
                <Badge variant="accent" className="shadow-md">
                  Popular
                </Badge>
              )}
            </div>
          </div>

          <div className="p-4 bg-white group-hover:bg-gray-50 transition-colors">

            {product.style && (
              <p className="text-xs font-medium text-lomash-primary uppercase tracking-wider mb-2">
                {product.style}
              </p>
            )}


            <h3 className="font-bold tracking-normal text-xl text-lomash-dark mb-1 line-clamp-1 group-hover:text-lomash-primary transition-colors">
              {product.title}
            </h3>


            <div className="flex items-center justify-between mt-2">

              <span className="text-base text-lomash-primary font-semibold group-hover:text-lomash-dark transition-colors">
                View Details 
              </span>
              <ArrowRight className="ml-1 h-5 w-5 inline-block transition-transform group-hover:translate-x-1 group-hover:scale-110 group-hover:text-lomash-primary" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}