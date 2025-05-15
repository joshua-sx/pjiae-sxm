import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Standard layout constants for consistent spacing
export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: "h-16",
  HEADER_HEIGHT_PX: 64,
  CONTENT_PADDING: "p-6",
  CONTENT_TOP_PADDING: "pt-6",
  SECTION_SPACING: "mb-6",
}
