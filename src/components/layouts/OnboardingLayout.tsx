
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  className?: string;
  showLogo?: boolean;
}

const OnboardingLayout = ({ 
  children, 
  className,
  showLogo = true 
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="w-full py-4 px-6 border-b bg-white">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {showLogo && (
            <Link to="/" className="text-xl font-semibold text-pjiae-blue flex items-center">
              SmartGoals<span className="text-gray-600">365</span>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <Card className={cn("w-full max-w-3xl shadow-lg", className)}>
          <CardContent className="p-6 md:p-8">
            {children}
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 px-6 border-t bg-white">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SmartGoals365. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default OnboardingLayout;
