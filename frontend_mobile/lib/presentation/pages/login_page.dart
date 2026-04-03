import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/theme/app_colors.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Ekran yüksekliğinin %30'u görsel için
    final double topHeight = MediaQuery.of(context).size.height * 0.30;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // 1. Üst Kısım: Görsel Alanı
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(30),
                    bottomRight: Radius.circular(30),
                  ),
                  child: Image.network(
                    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000', // Örnek sağlıklı içerik görseli
                    height: topHeight,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                // Dil Değiştirici (TR/EN)
                Positioned(
                  top: 50,
                  right: 20,
                  child: _languageSwitcher(),
                ),
              ],
            ),

            // 2. Alt Kısım: Giriş Formu
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    "OptiMeal",
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: AppColors.deepNavy),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 30),

                  // E-posta Alanı
                  const TextField(
                    decoration: InputDecoration(
                      hintText: 'E-posta',
                      prefixIcon: Icon(Icons.email_outlined),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Şifre Alanı
                  const TextField(
                    obscureText: true,
                    decoration: InputDecoration(
                      hintText: 'Şifre',
                      prefixIcon: Icon(Icons.lock_outline),
                    ),
                  ),

                  // Şifremi Unuttum
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {},
                      child: const Text("Şifremi Unuttum?", style: TextStyle(color: AppColors.natureGreen)),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Giriş Butonu
                  ElevatedButton(
                    onPressed: () {
                      // Burada Onboarding ekranına yönlendirme yapılacak [cite: 47]
                    },
                    style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
                    child: const Text("Giriş Yap"),
                  ),

                  const SizedBox(height: 20),
                  const Center(child: Text("veya şununla devam et")),
                  const SizedBox(height: 20),

                  // Sosyal Giriş Butonları
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _socialButton(Icons.g_mobiledata, Colors.red),
                      const SizedBox(width: 20),
                      _socialButton(Icons.apple, Colors.black),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _languageSwitcher() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Text("TR | EN", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
    );
  }

  Widget _socialButton(IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Icon(icon, size: 30, color: color),
    );
  }
}