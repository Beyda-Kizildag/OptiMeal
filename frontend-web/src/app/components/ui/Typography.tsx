import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className = '' }: TypographyProps) {
  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = '' }: TypographyProps) {
  return (
    <h2 className={`text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = '' }: TypographyProps) {
  return (
    <h3 className={`text-2xl md:text-3xl leading-tight text-foreground ${className}`}>
      {children}
    </h3>
  );
}

export function H4({ children, className = '' }: TypographyProps) {
  return (
    <h4 className={`text-xl md:text-2xl leading-snug text-foreground ${className}`}>
      {children}
    </h4>
  );
}

export function Body({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-base md:text-lg leading-relaxed text-foreground ${className}`}>
      {children}
    </p>
  );
}

export function BodySmall({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-sm md:text-base leading-relaxed text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

export function Caption({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-xs md:text-sm leading-normal text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}
