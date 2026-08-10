import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, pass: formData.password }),
      });
      
      if (!response.ok) {
        throw new Error('Kayıt başarısız oldu');
      }
      
      // Auto login after successful signup
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, pass: formData.password }),
      });

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        localStorage.setItem('token', data.access_token);
        navigate('/onboarding');
      } else {
        alert('Kayıt başarılı! Lütfen giriş yapın.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Kayıt başarısız oldu. Girdiğiniz bilgileri kontrol edin.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1639086495429-d60e72c53c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjBmb29kJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzc0MzI5NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fresh organic food"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4">
            <h2 className="text-3xl xl:text-4xl leading-tight">
              Kişiselleştirilmiş beslenme planınız hazır
            </h2>
            <p className="text-lg text-white/90">
              Kronik hastalıklar için özel beslenme takibi ve AI destekli öğün planlama
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <span className="text-sm">50K+ Kullanıcı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <span className="text-sm">4.9 Puan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:col-span-7 xl:col-span-6 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl text-foreground">
              Hesap Oluştur
            </h1>
            <p className="text-muted-foreground">
              Sağlıklı yaşam yolculuğunuza bugün başlayın
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3">
            <Button 
              variant="social" 
              fullWidth
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              }
            >
              Google ile Kaydol
            </Button>

            <Button 
              variant="social" 
              fullWidth
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              }
            >
              Apple ile Kaydol
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                veya e-posta ile
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                name="name"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="email"
                name="email"
                placeholder="E-posta adresiniz"
                value={formData.email}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Şifre (en az 8 karakter)"
                value={formData.password}
                onChange={handleChange}
                className="pl-12 pr-12"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Şifre tekrar"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer flex-shrink-0"
                required
              />
              <span className="text-sm text-foreground">
                <Link to="/terms" className="text-primary hover:text-primary/80">Kullanım Şartları</Link> ve{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80">Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum
              </span>
            </label>

            <Button type="submit" variant="primary" fullWidth size="lg">
              Hesap Oluştur
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-muted-foreground">
            Zaten hesabınız var mı?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Giriş Yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
