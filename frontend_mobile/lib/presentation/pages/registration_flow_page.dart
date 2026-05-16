import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/theme/app_colors.dart';
import '../../core/constants/api_constants.dart';

class RegistrationFlowPage extends StatefulWidget {
  const RegistrationFlowPage({super.key});

  @override
  State<RegistrationFlowPage> createState() => _RegistrationFlowPageState();
}

class _RegistrationFlowPageState extends State<RegistrationFlowPage> {
  int _currentStep = 1;
  String _language = 'EN';
  bool _isLoading = false;

  // Step 1 State
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _ageController = TextEditingController();
  final _heightController = TextEditingController();
  final _weightController = TextEditingController();
  bool _showPassword = false;

  // Step 2 State
  List<String> _selectedConditions = [];
  String _searchQuery = '';
  
  // We'll store the token received after register+login to send health profile
  String? _token;

  final Map<String, Map<String, dynamic>> _t = {
    'EN': {
      'step1Label': 'Credentials',
      'step2Label': 'Health Profile',
      'step3Label': 'AI Insights',
      'credentialsTitle': 'Create Your Profile',
      'credentialsSubtitle': 'Let\'s start with the basics',
      'name': 'Full Name',
      'namePlaceholder': 'Enter your full name',
      'email': 'Email Address',
      'emailPlaceholder': 'your.email@example.com',
      'password': 'Password',
      'passwordPlaceholder': 'Create a secure password',
      'age': 'Age',
      'agePlaceholder': 'Your age',
      'height': 'Height (cm)',
      'heightPlaceholder': 'e.g., 170',
      'weight': 'Weight (kg)',
      'weightPlaceholder': 'e.g., 70',
      'continue': 'Continue',
      'personalizeTitle': 'Let\'s Personalize Your Journey',
      'personalizeSubtitle': 'Select any health conditions that apply to you',
      'searchPlaceholder': 'Search conditions...',
      'diabetes': 'Diabetes',
      'hypertension': 'Hypertension',
      'ibs': 'IBS',
      'thyroid': 'Thyroid',
      'celiac': 'Celiac',
      'asthma': 'Asthma',
      'heartDisease': 'Heart Disease',
      'lactoseIntolerance': 'Lactose Intolerance',
      'insightsTitle': 'Your Personalized AI Assistant',
      'insightsSubtitle': 'Powered by advanced nutrition intelligence',
      'aiInsightLabel': 'AI-Powered Recommendations',
      'aiInsightText': 'Based on your profile, our LLM-powered assistant will prioritize anti-inflammatory recipes and stable blood sugar choices for you.',
      'getStarted': 'Get Started',
      'healthProfile': 'Your Health Profile:',
    },
    'TR': {
      'step1Label': 'Kimlik Bilgileri',
      'step2Label': 'Sağlık Profili',
      'step3Label': 'Yapay Zeka Önerileri',
      'credentialsTitle': 'Profilinizi Oluşturun',
      'credentialsSubtitle': 'Temel bilgilerle başlayalım',
      'name': 'Ad Soyad',
      'namePlaceholder': 'Adınızı ve soyadınızı girin',
      'email': 'E-posta Adresi',
      'emailPlaceholder': 'ornek@email.com',
      'password': 'Şifre',
      'passwordPlaceholder': 'Güvenli bir şifre oluşturun',
      'age': 'Yaş',
      'agePlaceholder': 'Yaşınız',
      'height': 'Boy (cm)',
      'heightPlaceholder': 'örn., 170',
      'weight': 'Kilo (kg)',
      'weightPlaceholder': 'örn., 70',
      'continue': 'Devam Et',
      'personalizeTitle': 'Yolculuğunu Kişiselleştirelim',
      'personalizeSubtitle': 'Size uyan sağlık durumlarını seçin',
      'searchPlaceholder': 'Durum ara...',
      'diabetes': 'Diyabet',
      'hypertension': 'Hipertansiyon',
      'ibs': 'İrritabl Bağırsak',
      'thyroid': 'Tiroid',
      'celiac': 'Çölyak',
      'asthma': 'Astım',
      'heartDisease': 'Kalp Hastalığı',
      'lactoseIntolerance': 'Laktoz İntoleransı',
      'insightsTitle': 'Kişiselleştirilmiş Yapay Zeka Asistanınız',
      'insightsSubtitle': 'Gelişmiş beslenme zekası tarafından desteklenmektedir',
      'aiInsightLabel': 'Yapay Zeka Destekli Öneriler',
      'aiInsightText': 'Profilinize göre, LLM destekli asistanımız sizin için anti-enflamatuar tarifler ve dengeli kan şekeri seçeneklerine öncelik verecektir.',
      'getStarted': 'Başlayın',
      'healthProfile': 'Sağlık Profiliniz:',
    },
  };

  final List<Map<String, dynamic>> _healthConditions = [
    {'id': 'diabetes', 'labelKey': 'diabetes', 'icon': Icons.monitor_heart},
    {'id': 'hypertension', 'labelKey': 'hypertension', 'icon': Icons.favorite},
    {'id': 'ibs', 'labelKey': 'ibs', 'icon': Icons.warning_amber},
    {'id': 'thyroid', 'labelKey': 'thyroid', 'icon': Icons.thermostat},
    {'id': 'celiac', 'labelKey': 'celiac', 'icon': Icons.grass},
    {'id': 'asthma', 'labelKey': 'asthma', 'icon': Icons.medication},
    {'id': 'heartDisease', 'labelKey': 'heartDisease', 'icon': Icons.favorite_border},
    {'id': 'lactose', 'labelKey': 'lactoseIntolerance', 'icon': Icons.water_drop},
  ];

  Future<void> _handleStep1Continue() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;
    final age = _ageController.text;
    final height = _heightController.text;
    final weight = _weightController.text;

    if (email.isEmpty || password.isEmpty || age.isEmpty || height.isEmpty || weight.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all fields')),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      // 1. Register User
      final regRes = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'pass': password,
        }),
      );

      // Registration successful or already exists (we might still try to login)
      if (regRes.statusCode == 201 || regRes.statusCode == 200 || regRes.statusCode == 409) {
        // 2. Login to get token
        final loginRes = await http.post(
          Uri.parse('${ApiConstants.baseUrl}/auth/login'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({'email': email, 'pass': password}),
        );

        if (loginRes.statusCode == 200 || loginRes.statusCode == 201) {
          final data = jsonDecode(loginRes.body);
          _token = data['token'];
          setState(() {
            _currentStep = 2;
          });
        } else {
          throw Exception('Login failed after registration');
        }
      } else {
        throw Exception('Registration failed: ${regRes.body}');
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

  void _handleConditionToggle(String conditionId) {
    setState(() {
      if (_selectedConditions.contains(conditionId)) {
        _selectedConditions.remove(conditionId);
      } else {
        _selectedConditions.add(conditionId);
      }
    });
  }

  void _handleStep2Continue() {
    setState(() {
      _currentStep = 3;
    });
  }

  Future<void> _handleGetStarted() async {
    if (_token == null) {
       ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Not authenticated. Cannot save profile.')),
        );
        return;
    }
    setState(() => _isLoading = true);

    try {
      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/health/profile'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_token',
        },
        body: jsonEncode({
          'age': int.parse(_ageController.text),
          'height': int.parse(_heightController.text),
          'weight': int.parse(_weightController.text),
          'chronicDiseases': _selectedConditions,
          'intolerances': [], // or map some conditions here if needed
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Registration & Profile Saved Successfully!')),
          );
          Navigator.pop(context); // Go back to login or redirect to home
        }
      } else {
        throw Exception('Failed to save profile: ${response.body}');
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

    return Scaffold(
      backgroundColor: AppColors.offWhite,
      body: SafeArea(
        child: Column(
          children: [
            // Header with Progress
            Container(
              color: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.language, size: 16, color: Color(0xFF2D5A27)),
                          const SizedBox(width: 4),
                          DropdownButtonHideUnderline(
                            child: DropdownButton<String>(
                              value: _language,
                              icon: const Icon(Icons.keyboard_arrow_down, size: 16, color: Color(0xFF2D5A27)),
                              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: Color(0xFF2D5A27)),
                              onChanged: (String? newValue) {
                                if (newValue != null) setState(() => _language = newValue);
                              },
                              items: ['EN', 'TR'].map<DropdownMenuItem<String>>((String value) {
                                return DropdownMenuItem<String>(value: value, child: Text(value));
                              }).toList(),
                            ),
                          ),
                        ],
                      ),
                      Text('$_currentStep/3', style: const TextStyle(fontSize: 13, color: Colors.black54, fontWeight: FontWeight.w500)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      _buildStepIndicator(1, t['step1Label']),
                      const Icon(Icons.chevron_right, size: 16, color: Colors.black26),
                      _buildStepIndicator(2, t['step2Label']),
                      const Icon(Icons.chevron_right, size: 16, color: Colors.black26),
                      _buildStepIndicator(3, t['step3Label']),
                    ],
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: _currentStep == 1
                    ? _buildStep1(t)
                    : _currentStep == 2
                        ? _buildStep2(t)
                        : _buildStep3(t),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepIndicator(int stepNum, String label) {
    final isActive = stepNum <= _currentStep;
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 6,
            decoration: BoxDecoration(
              color: isActive ? const Color(0xFF2D5A27) : Colors.grey.shade300,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w500,
              color: isActive ? const Color(0xFF2D5A27) : Colors.black38,
            ),
          )
        ],
      ),
    );
  }

  Widget _buildStep1(Map<String, dynamic> t) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(t['credentialsTitle'], style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w600, color: Color(0xFF2D5A27))),
        const SizedBox(height: 8),
        Text(t['credentialsSubtitle'], style: const TextStyle(fontSize: 14, color: Colors.black54)),
        const SizedBox(height: 24),

        _buildTextField(t['name'], t['namePlaceholder'], _nameController),
        const SizedBox(height: 16),
        _buildTextField(t['email'], t['emailPlaceholder'], _emailController, keyboardType: TextInputType.emailAddress),
        const SizedBox(height: 16),
        _buildTextField(t['password'], t['passwordPlaceholder'], _passwordController, obscureText: !_showPassword, suffixIcon: IconButton(
          icon: Icon(_showPassword ? Icons.visibility_off : Icons.visibility, color: Colors.grey, size: 20),
          onPressed: () => setState(() => _showPassword = !_showPassword),
        )),
        const SizedBox(height: 16),
        
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)]),
          child: Row(
            children: [
              Expanded(child: _buildSmallNumberField(t['age'], t['agePlaceholder'], _ageController)),
              const SizedBox(width: 12),
              Expanded(child: _buildSmallNumberField(t['height'], t['heightPlaceholder'], _heightController)),
              const SizedBox(width: 12),
              Expanded(child: _buildSmallNumberField(t['weight'], t['weightPlaceholder'], _weightController)),
            ],
          ),
        ),

        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: _isLoading ? null : _handleStep1Continue,
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF2D5A27),
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          ),
          child: _isLoading 
            ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
            : Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(t['continue'], style: const TextStyle(fontSize: 16, color: Colors.white)),
              const SizedBox(width: 8),
              const Icon(Icons.chevron_right, color: Colors.white),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStep2(Map<String, dynamic> t) {
    final filtered = _healthConditions.where((c) {
      final label = t[c['labelKey']] as String;
      return label.toLowerCase().contains(_searchQuery.toLowerCase());
    }).toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(t['personalizeTitle'], style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w600, color: Color(0xFF2D5A27))),
        const SizedBox(height: 8),
        Text(t['personalizeSubtitle'], style: const TextStyle(fontSize: 14, color: Colors.black54)),
        const SizedBox(height: 24),

        TextField(
          onChanged: (v) => setState(() => _searchQuery = v),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.search, color: Colors.black38),
            hintText: t['searchPlaceholder'],
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.symmetric(vertical: 16),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: Colors.grey.shade200)),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: Colors.grey.shade200)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFF2D5A27))),
          ),
        ),
        const SizedBox(height: 24),

        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 1.3,
          ),
          itemCount: filtered.length,
          itemBuilder: (context, i) {
            final c = filtered[i];
            final isSelected = _selectedConditions.contains(c['id']);
            return GestureDetector(
              onTap: () => _handleConditionToggle(c['id']),
              child: Container(
                decoration: BoxDecoration(
                  color: isSelected ? const Color(0xFF2D5A27) : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: isSelected ? const Color(0xFF2D5A27) : Colors.grey.shade200, width: 2),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)],
                ),
                child: Stack(
                  children: [
                    if (isSelected)
                      const Positioned(
                        top: 8, right: 8,
                        child: CircleAvatar(radius: 10, backgroundColor: Colors.white, child: Icon(Icons.check, size: 14, color: Color(0xFF2D5A27))),
                      ),
                    Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: isSelected ? Colors.white.withOpacity(0.2) : const Color(0xFFF5F5F5),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(c['icon'], size: 24, color: isSelected ? Colors.white : const Color(0xFF2D5A27)),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            t[c['labelKey']],
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: isSelected ? Colors.white : Colors.black87,
                            ),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: _handleStep2Continue,
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF2D5A27),
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(t['continue'], style: const TextStyle(fontSize: 16, color: Colors.white)),
              const SizedBox(width: 8),
              const Icon(Icons.chevron_right, color: Colors.white),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStep3(Map<String, dynamic> t) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Center(
          child: Container(
            width: 64, height: 64,
            decoration: const BoxDecoration(
              gradient: LinearGradient(colors: [Color(0xFF2D5A27), Color(0xFF234519)]),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.psychology, color: Colors.white, size: 32),
          ),
        ),
        const SizedBox(height: 16),
        Text(t['insightsTitle'], textAlign: TextAlign.center, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w600, color: Color(0xFF2D5A27))),
        const SizedBox(height: 8),
        Text(t['insightsSubtitle'], textAlign: TextAlign.center, style: const TextStyle(fontSize: 14, color: Colors.black54)),
        const SizedBox(height: 32),

        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(colors: [Color(0xFF2D5A27), Color(0xFF234519)]),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.auto_awesome, color: Colors.white, size: 20),
                  ),
                  const SizedBox(width: 12),
                  Expanded(child: Text(t['aiInsightLabel'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF2D5A27)))),
                ],
              ),
              const SizedBox(height: 16),
              Text(t['aiInsightText'], style: const TextStyle(fontSize: 14, color: Colors.black87, height: 1.5)),
              if (_selectedConditions.isNotEmpty) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: const Color(0xFFF5F5F5), borderRadius: BorderRadius.circular(12)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(t['healthProfile'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Colors.black54)),
                      const SizedBox(height: 8),
                      Wrap(
                        spacing: 8, runSpacing: 8,
                        children: _selectedConditions.map((id) {
                          final c = _healthConditions.firstWhere((x) => x['id'] == id);
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(color: const Color(0xFF2D5A27), borderRadius: BorderRadius.circular(16)),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(c['icon'], size: 14, color: Colors.white),
                                const SizedBox(width: 4),
                                Text(t[c['labelKey']], style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w500)),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),

        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)]),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatCol(t['age'], _ageController.text, ''),
              _buildStatCol(t['height'], _heightController.text, ' cm'),
              _buildStatCol(t['weight'], _weightController.text, ' kg'),
            ],
          ),
        ),

        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: _isLoading ? null : _handleGetStarted,
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF2D5A27),
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          ),
          child: _isLoading 
            ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
            : Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.apple, color: Colors.white),
              const SizedBox(width: 8),
              Text(t['getStarted'], style: const TextStyle(fontSize: 16, color: Colors.white)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStatCol(String label, String val, String unit) {
    return Column(
      children: [
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.black54)),
        const SizedBox(height: 4),
        Text('$val$unit', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Color(0xFF2D5A27))),
      ],
    );
  }

  Widget _buildTextField(String label, String hint, TextEditingController controller, {bool obscureText = false, Widget? suffixIcon, TextInputType? keyboardType}) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)]),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: Colors.black87)),
          const SizedBox(height: 8),
          TextField(
            controller: controller,
            obscureText: obscureText,
            keyboardType: keyboardType,
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: const TextStyle(color: Colors.black38, fontSize: 15),
              filled: true,
              fillColor: const Color(0xFFF5F5F5),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              suffixIcon: suffixIcon,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSmallNumberField(String label, String hint, TextEditingController controller) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: Colors.black87)),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(color: Colors.black38, fontSize: 13),
            filled: true,
            fillColor: const Color(0xFFF5F5F5),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
