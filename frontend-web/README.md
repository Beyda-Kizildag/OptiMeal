# OptiMeal - AI-Powered Nutrition Platform

A modern, professional health-tech web application for personalized nutrition and meal planning with chronic disease management support.

## Features

### 🎨 Design System
- **Color Palette**: Sage Green (#7A9B76), Soft White (#FAFAFA), Charcoal Gray (#3A3A3A)
- **12-Column Bootstrap Grid**: Responsive layout system
- **Typography Scale**: Consistent, scalable typography
- **Auto Layout**: Flexbox-based component system
- **Generous Whitespace**: Clean, health-focused aesthetic
- **Turkish Language Support**: Full support for Turkish characters (ç, ğ, ı, ö, ş, ü)

### 📱 Pages
- **Landing Page**: Hero, How It Works, Features, CTA sections
- **Login**: Split-screen with inspiring imagery and social login
- **Sign Up**: Registration with form validation and Turkish text
- **Design System**: Live component showcase at `/design-system`

### 🧩 Components

#### UI Kit (`/src/app/components/ui/`)
- `Button` - 5 variants (primary, secondary, outline, ghost, social)
- `Input` - Form inputs with labels, errors, and helper text
- `Grid, Col, Row` - 12-column responsive grid system
- `Typography` - H1-H4, Body, Caption components
- `Spacing` - Section, Stack, Inline, Box for consistent spacing
- `Container` - Centered content containers

#### Features
- `LanguageSwitcher` - TR/EN language toggle
- `Header` - Sticky navigation with language switcher
- `Footer` - Site-wide footer with links
- `Hero` - Landing page hero section
- `HowItWorks` - 3-step process visualization
- `Features` - Feature grid with icons
- `CTA` - Call-to-action section

## Tech Stack

- **React 18.3** with TypeScript
- **React Router 7.13** for navigation
- **Tailwind CSS 4.1** for styling
- **Lucide React** for icons
- **Vite 6.3** for build tooling
- **Inter Font** for typography

## Project Structure

```
/src
  /app
    /components
      /ui           # Design system components
      Header.tsx
      Footer.tsx
      Hero.tsx
      HowItWorks.tsx
      Features.tsx
      CTA.tsx
      LanguageSwitcher.tsx
      Layout.tsx
    /pages
      Landing.tsx
      Login.tsx
      SignUp.tsx
      DesignSystem.tsx
    App.tsx
    routes.tsx
  /styles
    fonts.css      # Inter font import
    theme.css      # Design tokens
    index.css
    tailwind.css
```

## Design Principles

### 1. Bootstrap-like 12-Column Grid
```tsx
<Grid gap="md">
  <Col span={12} md={8}>Main Content</Col>
  <Col span={12} md={4}>Sidebar</Col>
</Grid>
```

### 2. Auto Layout (Flexbox)
All components use modern flexbox layouts:
- `Stack` for vertical layouts
- `Row` for horizontal layouts
- `Inline` for inline elements

### 3. Generous Whitespace
Health applications prioritize calm, clean spaces:
- Large section padding (py-16 to py-32)
- Consistent spacing scale
- Breathing room around content

### 4. Rounded Corners (8-12px)
Friendly, accessible design:
- Inputs: 12px (rounded-xl)
- Buttons: 8px (rounded-lg)
- Cards: 16-24px (rounded-2xl/3xl)

### 5. Turkish Language Support
- Inter font with full character support
- All UI text supports ç, ğ, ı, ö, ş, ü
- TR/EN language switcher in navbar

## Routes

- `/` - Landing page
- `/login` - Login screen
- `/signup` - Sign up screen
- `/design-system` - Component showcase

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Authentication UI

### Split-Screen Layout
- **Left**: Full-height inspiring food/health imagery
- **Right**: Form with generous padding
- **Social Login**: Google and Apple sign-in buttons
- **Responsive**: Stacks on mobile, side-by-side on desktop

### Form Features
- Email/password inputs with icons
- Show/hide password toggle
- "Remember me" checkbox
- "Forgot password" link
- Terms and conditions acceptance
- Smooth transitions and hover states

## Color System

### Primary
- `--primary`: #7A9B76 (Sage Green)
- `--primary-foreground`: #FAFAFA

### Backgrounds
- `--background`: #FAFAFA (Soft White)
- `--card`: #FFFFFF
- `--accent`: #E8F0E5 (Light Sage)

### Text
- `--foreground`: #3A3A3A (Charcoal Gray)
- `--muted-foreground`: #717182

## Component Documentation

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for detailed component documentation and usage examples.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Optimized for health-tech accessibility standards

## License

© 2026 OptiMeal. All rights reserved.
