import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/theme/app_colors.dart';
import '../../core/constants/api_constants.dart';
import 'registration_flow_page.dart';
import 'home_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _showPassword = false;
  String _language = 'EN';
  bool _isLoading = false;

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  final Map<String, Map<String, String>> _t = {
    'EN': {
      'welcome': 'Welcome to OptiMeal',
      'subtitle': 'Sign in to continue your healthy journey',
      'email': 'Email',
      'password': 'Password',
      'emailPlaceholder': 'Enter your email',
      'passwordPlaceholder': 'Enter your password',
      'forgotPassword': 'Forgot Password?',
      'signIn': 'Sign In',
      'orContinue': 'Or continue with',
      'noAccount': "Don't have an account?",
      'signUp': 'Sign Up',
    },
    'TR': {
      'welcome': 'OptiMeal\'e Hoş Geldiniz',
      'subtitle': 'Sağlıklı yolculuğunuza devam etmek için giriş yapın',
      'email': 'E-posta',
      'password': 'Şifre',
      'emailPlaceholder': 'E-posta adresinizi girin',
      'passwordPlaceholder': 'Şifrenizi girin',
      'forgotPassword': 'Şifremi Unuttum?',
      'signIn': 'Giriş Yap',
      'orContinue': 'Veya şununla devam edin',
      'noAccount': 'Hesabınız yok mu?',
      'signUp': 'Kayıt Ol',
    },
  };

  Future<void> _handleSignIn() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) return;

    setState(() => _isLoading = true);

    try {
      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'pass': password,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        final token = data['access_token'] ?? data['token'];
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('${_t[_language]!['signIn']} Successful!')),
          );
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => HomePage(token: token, language: _language)),
          );
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Login failed: ${response.body}')),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = _t[_language]!;
    final topHeight = MediaQuery.of(context).size.height * 0.30;

    return Scaffold(
      backgroundColor: AppColors.offWhite,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top Image Section
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(12),
                    bottomRight: Radius.circular(12),
                  ),
                  child: Image.asset(
                    'assets/images/splash.jpg',
                    height: topHeight,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                // Language Switcher
                Positioned(
                  top: 50,
                  right: 16,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.95),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.white.withOpacity(0.5)),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 4,
                        )
                      ],
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _language,
                        icon: const Icon(Icons.keyboard_arrow_down, size: 16, color: AppColors.deepNavy),
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.deepNavy),
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        onChanged: (String? newValue) {
                          if (newValue != null) {
                            setState(() => _language = newValue);
                          }
                        },
                        items: <String>['EN', 'TR'].map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Row(
                              children: [
                                const Icon(Icons.language, size: 14, color: AppColors.deepNavy),
                                const SizedBox(width: 4),
                                Text(value),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  ),
                ),
              ],
            ),

            // Content Section
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Brand Header
                  Text(
                    t['welcome']!,
                    style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w600, color: AppColors.deepNavy),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    t['subtitle']!,
                    style: const TextStyle(fontSize: 15, color: Colors.black54),
                  ),
                  const SizedBox(height: 32),

                  // Form Card
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.05),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Email Input
                        Text(t['email']!, style: const TextStyle(fontSize: 14, color: AppColors.deepNavy)),
                        const SizedBox(height: 8),
                        TextField(
                          controller: _emailController,
                          keyboardType: TextInputType.emailAddress,
                          decoration: InputDecoration(
                            hintText: t['emailPlaceholder'],
                            hintStyle: const TextStyle(color: Colors.black38, fontSize: 15),
                            filled: true,
                            fillColor: Colors.white,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade200),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade200),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: AppColors.natureGreen, width: 2),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Password Input
                        Text(t['password']!, style: const TextStyle(fontSize: 14, color: AppColors.deepNavy)),
                        const SizedBox(height: 8),
                        TextField(
                          controller: _passwordController,
                          obscureText: !_showPassword,
                          decoration: InputDecoration(
                            hintText: t['passwordPlaceholder'],
                            hintStyle: const TextStyle(color: Colors.black38, fontSize: 15),
                            filled: true,
                            fillColor: Colors.white,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade200),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade200),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: AppColors.natureGreen, width: 2),
                            ),
                            suffixIcon: IconButton(
                              icon: Icon(
                                _showPassword ? Icons.visibility_off : Icons.visibility,
                                color: Colors.grey,
                                size: 20,
                              ),
                              onPressed: () => setState(() => _showPassword = !_showPassword),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Forgot Password Link
                        Align(
                          alignment: Alignment.centerRight,
                          child: TextButton(
                            onPressed: () {},
                            style: TextButton.styleFrom(
                              padding: EdgeInsets.zero,
                              minimumSize: const Size(50, 30),
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            ),
                            child: Text(
                              t['forgotPassword']!,
                              style: const TextStyle(fontSize: 14, color: AppColors.natureGreen),
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Sign In Button
                        ElevatedButton(
                          onPressed: _isLoading ? null : _handleSignIn,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.natureGreen,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            elevation: 0,
                          ),
                          child: _isLoading
                              ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                              : Text(
                                  t['signIn']!,
                                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                                ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Divider
                  Row(
                    children: [
                      Expanded(child: Container(height: 1, color: Colors.grey.shade300)),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Text(t['orContinue']!, style: const TextStyle(fontSize: 13, color: Colors.black54)),
                      ),
                      Expanded(child: Container(height: 1, color: Colors.grey.shade300)),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Social Login
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _socialButton(Icons.g_mobiledata, Colors.red),
                      const SizedBox(width: 16),
                      _socialButton(Icons.apple, Colors.black),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Sign Up Link
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(t['noAccount']!, style: const TextStyle(fontSize: 14, color: Colors.black54)),
                      TextButton(
                        onPressed: () {
                          Navigator.push(context, MaterialPageRoute(builder: (_) => const RegistrationFlowPage()));
                        },
                        child: Text(
                          t['signUp']!,
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppColors.deepNavy),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _socialButton(IconData icon, Color color) {
    return Container(
      width: 56,
      height: 56,
      decoration: BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        border: Border.all(color: Colors.grey.shade200),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: IconButton(
        icon: Icon(icon, size: 30, color: color),
        onPressed: () {},
      ),
    );
  }
}