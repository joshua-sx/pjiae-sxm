
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Collapsible component
 * 
 * Used for content sections that can be expanded or collapsed
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * CollapsibleTrigger component
 * 
 * Button/element that toggles the collapsible state
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * CollapsibleContent component
 * 
 * Container for the content that shows/hides based on collapsible state
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
