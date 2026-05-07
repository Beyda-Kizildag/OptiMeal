import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ColProps {
  children: ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export function Grid({ children, className = '', gap = 'md' }: GridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  return (
    <div className={`grid grid-cols-12 ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

export function Col({ children, className = '', span = 12, sm, md, lg, xl }: ColProps) {
  const getColSpan = (size?: number) => {
    if (!size) return '';
    return `col-span-${size}`;
  };

  const classes = [
    getColSpan(span),
    sm ? `sm:col-span-${sm}` : '',
    md ? `md:col-span-${md}` : '',
    lg ? `lg:col-span-${lg}` : '',
    xl ? `xl:col-span-${xl}` : '',
    className
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

// Responsive row component with auto-layout (flexbox)
interface RowProps {
  children: ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export function Row({ children, className = '', gap = 'md', align = 'stretch', justify = 'start' }: RowProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  return (
    <div className={`flex flex-wrap ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`}>
      {children}
    </div>
  );
}
