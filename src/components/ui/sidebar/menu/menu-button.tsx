
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useSidebar } from "../context"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center justify-start gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()
    
    // Create the button element with the proper styling
    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          sidebarMenuButtonVariants({ variant, size }), 
          
          // When collapsed, center the button perfectly using grid layout
          "group-data-[state=collapsed]:grid group-data-[state=collapsed]:place-items-center",
          
          // Remove any horizontal padding in collapsed state for consistent centering
          "group-data-[state=collapsed]:px-0",
          
          // Precise icon handling in collapsed state
          "group-data-[state=collapsed]:[&>svg]:size-4",
          "group-data-[state=collapsed]:[&>svg]:m-0",
          
          // Hide all text and chevrons in collapsed state
          "group-data-[state=collapsed]:[&>span]:hidden",
          "group-data-[state=collapsed]:[&>[data-chevron]]:hidden",
          "group-data-[state=collapsed]:[&>.lucide-chevron-down]:hidden",
          "group-data-[state=collapsed]:[&>.lucide-chevron-right]:hidden",
          "group-data-[state=collapsed]:[&>.lucide-chevron-left]:hidden",
          "group-data-[state=collapsed]:[&>.lucide-chevron-up]:hidden",
          
          // Ensure no padding or margins affect the centering
          "group-data-[state=collapsed]:[&>svg]:!mr-0",
          
          // Remove the specific padding for items with chevrons
          // This ensures all items are treated the same way in collapsed state
          
          className
        )}
        {...props}
      />
    )

    // If there's no tooltip, just return the button
    if (!tooltip) {
      return button
    }

    // Convert string tooltip to object configuration
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    // Return the button wrapped in a tooltip
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"
