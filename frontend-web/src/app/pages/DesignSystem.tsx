import { 
  Button, 
  Input, 
  Container, 
  Grid, 
  Col, 
  H1, 
  H2, 
  H3, 
  Body, 
  Section, 
  Stack,
  Box 
} from '../components/ui';
import { Heart, Mail, Search } from 'lucide-react';

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <Stack spacing="xl">
          {/* Typography */}
          <Section>
            <Stack spacing="lg">
              <H1>OptiMeal Design System</H1>
              <Body>
                A comprehensive design system with Turkish character support (ç, ğ, ı, ö, ş, ü)
              </Body>
            </Stack>
          </Section>

          {/* Colors */}
          <Box padding="lg" className="bg-card border border-border rounded-2xl">
            <Stack spacing="lg">
              <H2>Color Palette</H2>
              <Grid gap="lg">
                <Col span={12} md={4}>
                  <div className="space-y-3">
                    <div className="h-24 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                      Sage Green (Primary)
                    </div>
                    <p className="text-sm text-muted-foreground">#7A9B76</p>
                  </div>
                </Col>
                <Col span={12} md={4}>
                  <div className="space-y-3">
                    <div className="h-24 bg-background rounded-xl flex items-center justify-center text-foreground border border-border">
                      Soft White (Background)
                    </div>
                    <p className="text-sm text-muted-foreground">#FAFAFA</p>
                  </div>
                </Col>
                <Col span={12} md={4}>
                  <div className="space-y-3">
                    <div className="h-24 bg-foreground rounded-xl flex items-center justify-center text-background">
                      Charcoal Gray
                    </div>
                    <p className="text-sm text-muted-foreground">#3A3A3A</p>
                  </div>
                </Col>
              </Grid>
            </Stack>
          </Box>

          {/* Typography Scale */}
          <Box padding="lg" className="bg-card border border-border rounded-2xl">
            <Stack spacing="lg">
              <H2>Typography Scale</H2>
              <Stack spacing="md">
                <div>
                  <H1>Heading 1 - Sağlıklı Yaşam</H1>
                  <p className="text-sm text-muted-foreground mt-2">4xl-6xl responsive</p>
                </div>
                <div>
                  <H2>Heading 2 - Beslenme Planı</H2>
                  <p className="text-sm text-muted-foreground mt-2">3xl-5xl responsive</p>
                </div>
                <div>
                  <H3>Heading 3 - Öğün Takibi</H3>
                  <p className="text-sm text-muted-foreground mt-2">2xl-3xl responsive</p>
                </div>
                <div>
                  <Body>Body Text - Bu metin Türkçe karakterleri destekler: ç, ğ, ı, ö, ş, ü</Body>
                  <p className="text-sm text-muted-foreground mt-2">base-lg responsive</p>
                </div>
              </Stack>
            </Stack>
          </Box>

          {/* Buttons */}
          <Box padding="lg" className="bg-card border border-border rounded-2xl">
            <Stack spacing="lg">
              <H2>Button Variants</H2>
              <Grid gap="md">
                <Col span={12} md={6} lg={3}>
                  <Stack spacing="sm">
                    <Button variant="primary" fullWidth>Primary</Button>
                    <p className="text-xs text-muted-foreground">Main actions</p>
                  </Stack>
                </Col>
                <Col span={12} md={6} lg={3}>
                  <Stack spacing="sm">
                    <Button variant="secondary" fullWidth>Secondary</Button>
                    <p className="text-xs text-muted-foreground">Secondary actions</p>
                  </Stack>
                </Col>
                <Col span={12} md={6} lg={3}>
                  <Stack spacing="sm">
                    <Button variant="outline" fullWidth>Outline</Button>
                    <p className="text-xs text-muted-foreground">Tertiary actions</p>
                  </Stack>
                </Col>
                <Col span={12} md={6} lg={3}>
                  <Stack spacing="sm">
                    <Button variant="ghost" fullWidth>Ghost</Button>
                    <p className="text-xs text-muted-foreground">Minimal style</p>
                  </Stack>
                </Col>
              </Grid>

              <H3>Button Sizes</H3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm" icon={<Heart className="w-4 h-4" />}>Small</Button>
                <Button size="md" icon={<Mail className="w-5 h-5" />}>Medium</Button>
                <Button size="lg" icon={<Search className="w-5 h-5" />}>Large</Button>
              </div>
            </Stack>
          </Box>

          {/* Form Inputs */}
          <Box padding="lg" className="bg-card border border-border rounded-2xl">
            <Stack spacing="lg">
              <H2>Form Inputs</H2>
              <Grid gap="lg">
                <Col span={12} md={6}>
                  <Input 
                    label="E-posta Adresi" 
                    placeholder="ornek@email.com"
                    type="email"
                  />
                </Col>
                <Col span={12} md={6}>
                  <Input 
                    label="Şifre" 
                    placeholder="En az 8 karakter"
                    type="password"
                    helperText="Güçlü şifre kullanın"
                  />
                </Col>
                <Col span={12}>
                  <Input 
                    label="Ad Soyad" 
                    placeholder="Adınız ve soyadınız"
                    error="Bu alan zorunludur"
                  />
                </Col>
              </Grid>
            </Stack>
          </Box>

          {/* 12-Column Grid System */}
          <Box padding="lg" className="bg-card border border-border rounded-2xl">
            <Stack spacing="lg">
              <H2>12-Column Grid System</H2>
              <Body>Responsive grid with Bootstrap-like column spanning</Body>
              
              <Grid gap="md">
                <Col span={12} className="bg-accent p-4 rounded-lg text-center">
                  12 columns
                </Col>
              </Grid>
              
              <Grid gap="md">
                <Col span={6} className="bg-accent p-4 rounded-lg text-center">
                  6 columns
                </Col>
                <Col span={6} className="bg-accent p-4 rounded-lg text-center">
                  6 columns
                </Col>
              </Grid>
              
              <Grid gap="md">
                <Col span={4} className="bg-accent p-4 rounded-lg text-center">
                  4 cols
                </Col>
                <Col span={4} className="bg-accent p-4 rounded-lg text-center">
                  4 cols
                </Col>
                <Col span={4} className="bg-accent p-4 rounded-lg text-center">
                  4 cols
                </Col>
              </Grid>
              
              <Grid gap="md">
                <Col span={12} md={8} className="bg-accent p-4 rounded-lg text-center">
                  8 columns on desktop
                </Col>
                <Col span={12} md={4} className="bg-accent p-4 rounded-lg text-center">
                  4 columns on desktop
                </Col>
              </Grid>
            </Stack>
          </Box>

          {/* Spacing */}
          <Box padding="lg" className="bg-card border border-border rounded-2xl">
            <Stack spacing="lg">
              <H2>Generous Whitespace</H2>
              <Body>
                Consistent spacing system for clean, breathable layouts that enhance readability 
                and create a calming health-focused atmosphere.
              </Body>
              <div className="grid grid-cols-4 gap-4">
                {['Small (4)', 'Medium (6)', 'Large (8)', 'XL (12)'].map((label, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-primary/20 rounded-lg h-16 mb-2" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
