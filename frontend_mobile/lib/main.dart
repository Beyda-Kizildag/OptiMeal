import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart'; // Senin tema dosyan
import 'presentation/pages/login_page.dart'; // Senin giriş sayfan

void main() {
  runApp(const OptiMealApp());
}

class OptiMealApp extends StatelessWidget {
  const OptiMealApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OptiMeal',
      debugShowCheckedModeBanner: false, // Sağ üstteki "Debug" bandını kaldırır

      // Daha önce oluşturduğumuz temayı buraya bağlıyoruz.
      theme: AppTheme.lightTheme,

      // Uygulama açıldığında ilk durak: Giriş Sayfası
      home: const LoginPage(),
    );
  }
}