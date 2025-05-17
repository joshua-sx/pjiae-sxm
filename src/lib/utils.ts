
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Standard layout constants for consistent spacing
export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: "h-16",
  HEADER_HEIGHT_PX: 64,
  CONTENT_PADDING: {
    X: {
      DEFAULT: "px-6",
      SM: "px-4",
      LG: "px-8"
    },
    Y: {
      DEFAULT: "py-6",
      SM: "py-4",
      LG: "py-8"
    }
  },
  SPACING: {
    DEFAULT: "space-y-6",
    TIGHT: "space-y-4",
    LOOSE: "space-y-8",
    SECTION: "mb-8",
    CARD: "mb-6",
    ELEMENT: "mb-4"
  }
}
