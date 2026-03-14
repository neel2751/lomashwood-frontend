'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { fadeUp, fadeIn, staggerContainer, imageReveal, scaleIn } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

interface AnimatedContentProps {
  children: React.ReactNode;
  variants?: Variants;
  custom?: number;
  className?: string;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  variants = fadeUp,
  delay = 0 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContent({ 
  children, 
  variants = fadeUp, 
  custom = 0,
  className = ""
}: AnimatedContentProps) {
  return (
    <motion.div
      variants={variants}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStaggerContainer({ 
  children, 
  className = "" 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { fadeUp, fadeIn, staggerContainer, imageReveal, scaleIn };
