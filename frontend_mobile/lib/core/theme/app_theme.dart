import 'package:flutter/material.dart';

class AppTheme {
  // Figma'dan gelen renk paleti
  static const Color natureGreen = Color(0xFF4CAF50);
  static const Color deepNavy = Color(0xFF2C3E50);
  static const Color offWhite = Color(0xFFF5F5F5);

  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: natureGreen,
      scaffoldBackgroundColor: Colors.white,
      colorScheme: ColorScheme.fromSeed(
        seedColor: natureGreen,
        primary: natureGreen,
        secondary: deepNavy,
      ),
      // Figma'daki 12px yuvarlatılmış kenarlar (SOLID - Consistency)
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: offWhite,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: natureGreen,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }
}