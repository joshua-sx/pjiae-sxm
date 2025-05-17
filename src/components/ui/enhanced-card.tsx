
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface EnhancedCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "shadowed" | "flat";
}

export const EnhancedCard = ({
  title,
  description,
  headerAction,
  footer,
  children,
  className,
  variant = "default",
}: EnhancedCardProps) => {
  const cardStyles = cn(
    variant === "bordered" && "border-2",
    variant === "shadowed" && "shadow-lg",
    variant === "flat" && "border-0 shadow-none bg-transparent",
    className
  );

  const hasHeader = !!(title || description || headerAction);

  return (
    <Card className={cardStyles}>
      {hasHeader && (
        <CardHeader className={cn(
          "flex flex-row items-center justify-between",
          !description && "pb-2"
        )}>
          <div>
            {title && (typeof title === "string" ? <CardTitle>{title}</CardTitle> : title)}
            {description && (typeof description === "string" ? <CardDescription>{description}</CardDescription> : description)}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </CardHeader>
      )}
      
      <CardContent className={!hasHeader ? "pt-6" : undefined}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="flex justify-end gap-2 pt-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
