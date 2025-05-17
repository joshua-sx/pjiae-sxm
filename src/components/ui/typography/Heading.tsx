
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

/**
 * H1 - Main page heading
 * Responsive size scaling: 1.5rem → 2rem → 2.5rem
 */
export function H1({ children, className }: HeadingProps) {
  return (
    <h1
      className={cn(
        "text-h1-sm md:text-h1-md lg:text-h1",
        "font-semibold text-heading",
        "m-0",
        className
      )}
    >
      {children}
    </h1>
  );
}

/**
 * H2 - Section heading
 * Responsive size scaling: 1.25rem → 1.5rem → 1.75rem
 */
export function H2({ children, className }: HeadingProps) {
  return (
    <h2
      className={cn(
        "text-h2-sm md:text-h2-md lg:text-h2",
        "font-medium text-subheading",
        "mt-6 mb-3",
        className
      )}
    >
      {children}
    </h2>
  );
}

/**
 * H3 - Subsection heading
 * Responsive size scaling: 1.125rem → 1.25rem → 1.5rem
 */
export function H3({ children, className }: HeadingProps) {
  return (
    <h3
      className={cn(
        "text-h3-sm md:text-h3-md lg:text-h3",
        "font-medium text-subheading",
        "mt-4 mb-2",
        className
      )}
    >
      {children}
    </h3>
  );
}
