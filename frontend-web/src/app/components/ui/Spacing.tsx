import { ReactNode } from 'react';

interface SpacingProps {
  children: ReactNode;
  className?: string;
}

// Generous vertical spacing components for health app feel
export function Section({ children, className = '' }: SpacingProps) {
  return (
    <section className={`py-16 md:py-24 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function SectionSmall({ children, className = '' }: SpacingProps) {
  return (
    <section className={`py-12 md:py-16 lg:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function Stack({ children, className = '', spacing = 'md' }: SpacingProps & { spacing?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12'
  };

  return (
    <div className={`flex flex-col ${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
}

export function Inline({ children, className = '', spacing = 'md' }: SpacingProps & { spacing?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const spacingClasses = {
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-6',
    xl: 'space-x-8'
  };

  return (
    <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
}

// Padding utilities
export function Box({ children, className = '', padding = 'md' }: SpacingProps & { padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' }) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
    xl: 'p-12 md:p-16'
  };

  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
