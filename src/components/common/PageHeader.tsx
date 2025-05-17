
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { H1 } from '@/components/ui/typography/Heading';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode; // for filters, breadcrumbs, etc.
}

export function PageHeader({ 
  title, 
  subtitle, 
  actions, 
  className,
  children 
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <H1>{title}</H1>
          {subtitle && <p className="text-base text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
      {children && <div className="w-full mt-4">{children}</div>}
    </div>
  );
}
