# OptiMeal Design System

## Overview
A comprehensive, health-focused design system for the OptiMeal AI-powered meal planning platform with full Turkish language support.

## Color Palette

### Primary Colors
- **Sage Green** (`#7A9B76`) - Primary brand color, used for CTAs and key elements
- **Soft White** (`#FAFAFA`) - Background color for clean, breathable layouts
- **Charcoal Gray** (`#3A3A3A`) - Foreground/text color for readability

### Accent Colors
- **Light Sage** (`#E8F0E5`) - Accent backgrounds and highlights
- **Border** (`rgba(0, 0, 0, 0.1)`) - Subtle borders for cards and containers

## Typography

### Font Family
- **Inter** - Primary font with full Turkish character support (ç, ğ, ı, ö, ş, ü)
- Weights: 300, 400, 500, 600, 700

### Typography Scale
```tsx
import { H1, H2, H3, Body, Caption } from './components/ui';

<H1>Heading 1 - Sağlıklı Yaşam</H1>         // 4xl-6xl responsive
<H2>Heading 2 - Beslenme Planı</H2>         // 3xl-5xl responsive
<H3>Heading 3 - Öğün Takibi</H3>            // 2xl-3xl responsive
<Body>Body text with Turkish support</Body>  // base-lg responsive
<Caption>Small caption text</Caption>        // xs-sm responsive
```

## 12-Column Grid System

Bootstrap-like responsive grid system:

```tsx
import { Grid, Col } from './components/ui';

<Grid gap="md">
  <Col span={12} md={8}>
    {/* 8 columns on desktop, full width on mobile */}
  </Col>
  <Col span={12} md={4}>
    {/* 4 columns on desktop, full width on mobile */}
  </Col>
</Grid>
```

### Grid Props
- `gap`: 'sm' | 'md' | 'lg' | 'xl'
- `span`: 1-12 (mobile first)
- `sm`, `md`, `lg`, `xl`: Responsive breakpoints

## Buttons

### Variants
```tsx
import { Button } from './components/ui';

<Button variant="primary">Ana Buton</Button>      // Main CTAs
<Button variant="secondary">İkincil</Button>      // Secondary actions
<Button variant="outline">Çerçeveli</Button>      // Tertiary actions
<Button variant="ghost">Minimal</Button>          // Low emphasis
<Button variant="social">Google ile Giriş</Button> // Social login
```

### Sizes
```tsx
<Button size="sm">Küçük</Button>    // Compact buttons
<Button size="md">Orta</Button>     // Default size
<Button size="lg">Büyük</Button>    // Prominent CTAs
```

### With Icons
```tsx
import { ArrowRight } from 'lucide-react';

<Button 
  variant="primary" 
  icon={<ArrowRight className="w-5 h-5" />}
>
  Devam Et
</Button>
```

## Form Inputs

### Input Component
```tsx
import { Input } from './components/ui';

<Input 
  label="E-posta Adresi"
  placeholder="ornek@email.com"
  type="email"
  error="Bu alan zorunludur"
  helperText="Geçerli bir e-posta girin"
/>
```

### Features
- 8-12px rounded corners for friendly feel
- 2px border with focus states
- Full Turkish character support
- Built-in error and helper text
- Icon support via positioned elements

## Spacing System

### Generous Whitespace
Health apps benefit from breathing room:

```tsx
import { Section, Stack, Box } from './components/ui';

// Vertical sections
<Section>              // py-16 md:py-24 lg:py-32
  <Stack spacing="lg"> // space-y-8
    {children}
  </Stack>
</Section>

// Padding containers
<Box padding="md">     // p-6 md:p-8
  {children}
</Box>
```

### Spacing Scale
- `sm`: 4 (1rem)
- `md`: 6 (1.5rem)
- `lg`: 8 (2rem)
- `xl`: 12 (3rem)

## Auto Layout (Flexbox)

All components use modern auto layout:

```tsx
import { Row, Stack, Inline } from './components/ui';

// Vertical stack
<Stack spacing="md" className="items-center">
  {children}
</Stack>

// Horizontal row
<Row gap="md" align="center" justify="between">
  {children}
</Row>

// Inline elements
<Inline spacing="sm">
  {children}
</Inline>
```

## Language Switcher

Built-in TR/EN language switcher:

```tsx
import { LanguageSwitcher } from './components/LanguageSwitcher';

<LanguageSwitcher />
```

Features:
- Minimalist dropdown design
- Flag icons for visual clarity
- Accessible keyboard navigation
- Persists language preference

## Rounded Corners

Consistent border radius for friendly, accessible feel:

- **Inputs**: 12px (`rounded-xl`)
- **Buttons**: 8px (`rounded-lg`)
- **Cards**: 16-24px (`rounded-2xl`, `rounded-3xl`)
- **Small elements**: 8px (`rounded-lg`)

## Authentication Screens

### Split Layout Pattern
```tsx
// Left: Full-height inspiring image
// Right: Form with generous whitespace

<div className="grid lg:grid-cols-12">
  <div className="lg:col-span-6">{/* Image */}</div>
  <div className="lg:col-span-6">{/* Form */}</div>
</div>
```

### Social Login
Pre-styled Google and Apple sign-in buttons with proper branding.

## Accessibility

- Focus states on all interactive elements
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Turkish character rendering tested

## Usage Example

```tsx
import { 
  Container, 
  Grid, 
  Col, 
  Button, 
  Input, 
  H1, 
  Body 
} from './components/ui';

function MyComponent() {
  return (
    <Container>
      <Grid gap="lg">
        <Col span={12} md={6}>
          <H1>OptiMeal'e Hoş Geldiniz</H1>
          <Body>Kişiselleştirilmiş beslenme planınız hazır</Body>
        </Col>
        <Col span={12} md={6}>
          <Input 
            label="E-posta" 
            placeholder="ornek@email.com"
          />
          <Button variant="primary" size="lg" fullWidth>
            Başlayın
          </Button>
        </Col>
      </Grid>
    </Container>
  );
}
```

## Live Demo

Visit `/design-system` route to see all components in action with live examples.

## Best Practices

1. **Use generous whitespace** - Health apps should feel calm and uncluttered
2. **Consistent spacing** - Stick to the spacing scale (sm, md, lg, xl)
3. **Responsive by default** - All components are mobile-first
4. **Semantic HTML** - Use proper heading hierarchy
5. **Accessible forms** - Always include labels and error states
6. **Turkish support** - Test all text with Turkish characters
7. **12-column grid** - Use the grid system for consistent layouts
8. **Auto layout** - Leverage flexbox for dynamic content
