
import { cn } from "@/lib/utils";

/**
 * Animation utility functions for consistent microanimations
 */

export type AnimationVariant = 
  | "fade-in" 
  | "slide-in" 
  | "scale-in" 
  | "bounce" 
  | "pulse"
  | "hover-lift"
  | "hover-glow"
  | "hover-scale";

/**
 * Apply animation classes based on variant
 */
export const getAnimationClass = (variant: AnimationVariant): string => {
  switch (variant) {
    case "fade-in":
      return "animate-fade-in";
    case "slide-in":
      return "animate-enter";
    case "scale-in":
      return "animate-scale-in";
    case "bounce":
      return "animate-[bounce_1s_ease-in-out]";
    case "pulse":
      return "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]";
    case "hover-lift":
      return "transition-transform hover:-translate-y-1 duration-200";
    case "hover-glow":
      return "transition-all hover:shadow-md hover:shadow-primary/20 duration-200";
    case "hover-scale":
      return "transition-transform hover:scale-[1.02] active:scale-[0.98] duration-200";
    default:
      return "";
  }
};

/**
 * Combine animation variants with custom classes
 */
export const animateElement = (
  className?: string,
  variants?: AnimationVariant[]
): string => {
  if (!variants || variants.length === 0) return className || "";
  
  const animationClasses = variants.map(getAnimationClass).join(" ");
  return cn(animationClasses, className);
};
