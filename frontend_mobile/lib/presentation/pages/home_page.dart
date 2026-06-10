import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/constants/api_constants.dart';
import 'dart:math' as math;
import 'chat_page.dart';
import '../../core/services/notification_service.dart';

import 'profile_view.dart';
import 'login_page.dart';

class HomePage extends StatefulWidget {
  final String token;
  final String language;

  const HomePage({super.key, required this.token, required this.language});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _activeTab = 'home';
  late String _currentLanguage;
  bool _isLoading = true;
  String _userName = '';
  String _userEmail = '';
  List<String> _healthConditions = [];
  List<String> _userIntolerances = [];
  final int _healthScore = 70; 

  late Map<String, dynamic> _t;

  final Map<String, Map<String, dynamic>> _translations = {
    'EN': {
      'greeting': 'Hello',
      'subtitle': 'Let\'s continue your healthy journey',
      'healthReport': 'Health Report',
      'healthReportDesc': 'You reduced inflammation in your body this week!',
      'keepGoing': 'Keep going!',
      'cleanEating': 'Clean\nEating',
      'quickAi': 'Quick AI Questions',
      'aiAction1': 'I\'m very hungry right now, what is the healthiest snack?',
      'aiAction2': 'I\'m craving a burger, what is the healthy version?',
      'aiAction3': 'My energy dropped this afternoon, what should I prefer?',
      'healthProfile': 'Your Health Profile',
      'activeConditions': 'Active Health Conditions',
      'aiNote': 'OptiMeal AI considers this info in all recommendations',
      'todaysInsight': 'Today\'s Insight',
      'insightText': 'To manage your diabetes risk, keeping your blood sugar stable is important. Try to keep 3-4 hours between meals.',
      'home': 'Home',
      'profile': 'Profile',
      'aiAssistant': 'OptiMeal AI Assistant',
      'aiAssistantDesc': 'Your healthy nutrition assistant will be here',
      'backToHome': 'Back to Home',
      'profileDesc': 'Your profile settings will be here',
      'notificationTitle': 'Energy Drop Warning 📉',
      'notificationBody': 'Your energy might drop around 3 PM. Time for a healthy snack!',
    },
    'TR': {
      'greeting': 'Merhaba',
      'subtitle': 'Sağlıklı beslenme yolculuğuna devam edelim',
      'healthReport': 'Sağlık Karnesi',
      'healthReportDesc': 'Bu hafta vücudundaki inflamasyonu azalttın!',
      'keepGoing': 'Harika gidiyorsun!',
      'cleanEating': 'Temiz\nBeslenme',
      'quickAi': 'Hızlı AI Sorular',
      'aiAction1': 'Şu an çok acıktım, en sağlıklı atıştırmalık ne olur?',
      'aiAction2': 'Canım hamburger çekiyor, sağlıklı versiyonu nedir?',
      'aiAction3': 'Öğleden sonra enerjim düştü, ne tercih etmeliyim?',
      'healthProfile': 'Sağlık Profilin',
      'activeConditions': 'Aktif Sağlık Durumları',
      'aiNote': 'OptiMeal AI tüm önerilerinde bu bilgileri dikkate alır',
      'todaysInsight': 'Bugünün Önerisi',
      'insightText': 'Diyabet riskiniz için kan şekerinizi dengede tutmak önemli. Öğün aralarını 3-4 saat tutmayı deneyin.',
      'home': 'Ana Sayfa',
      'profile': 'Profilim',
      'aiAssistant': 'OptiMeal AI Asistan',
      'aiAssistantDesc': 'Sağlıklı beslenme asistanınız burada olacak',
      'backToHome': 'Ana Sayfaya Dön',
      'profileDesc': 'Profil ayarlarınız burada olacak',
      'notificationTitle': 'Enerji Düşüşü Uyarısı 📉',
      'notificationBody': 'Saat 15:00 civarı enerjiniz düşebilir. Sağlıklı bir atıştırmalık zamanı geldi!',
    },
  };

  final Map<String, String> _conditionLabelsTR = {
    'diabetes': 'Diyabet',
    'hypertension': 'Hipertansiyon',
    'ibs': 'İrritabl Bağırsak',
    'thyroid': 'Tiroid',
    'celiac': 'Çölyak',
    'asthma': 'Astım',
    'heartDisease': 'Kalp Hastalığı',
    'lactoseIntolerance': 'Laktoz İntoleransı',
  };
  
  final Map<String, String> _conditionLabelsEN = {
    'diabetes': 'Diabetes',
    'hypertension': 'Hypertension',
    'ibs': 'IBS',
    'thyroid': 'Thyroid',
    'celiac': 'Celiac',
    'asthma': 'Asthma',
    'heartDisease': 'Heart Disease',
    'lactoseIntolerance': 'Lactose Intolerance',
  };

  @override
  void initState() {
    super.initState();
    _currentLanguage = widget.language;
    _t = _translations[_currentLanguage] ?? _translations['TR']!;
    _fetchProfile();

    // Init Notification Service and trigger simulated alert
    final notificationService = NotificationService();
    notificationService.init().then((_) {
      notificationService.showSimulatedAlert(
        _t['notificationTitle'],
        _t['notificationBody'],
      );
    });
  }

  Future<void> _fetchProfile() async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConstants.baseUrl}/health/profile'),
        headers: {
          'Authorization': 'Bearer ${widget.token}',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        
        final userEmail = data['user']?['email']?.toString() ?? 'Kullanıcı';
        final namePart = userEmail.split('@')[0];
        final name = namePart.isNotEmpty 
            ? namePart[0].toUpperCase() + namePart.substring(1) 
            : 'Kullanıcı';

        final conditions = List<String>.from(data['chronicDiseases'] ?? []);
        final intolerancesList = List<String>.from(data['intolerances'] ?? []);

        if (mounted) {
          setState(() {
            _userName = name;
            _userEmail = userEmail;
            _healthConditions = conditions;
            _userIntolerances = intolerancesList;
            _isLoading = false;
          });
        }
      } else {
        if (mounted) setState(() => _isLoading = false);
      }
    } catch (e) {
      print('Error fetching profile: $e');
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _handleLanguageChanged(String newLanguage) {
    setState(() {
      _currentLanguage = newLanguage;
      _t = _translations[_currentLanguage] ?? _translations['TR']!;
    });
  }

  void _handleActionCardClick(String cardText) {
    print('AI Action triggered: $cardText');
    setState(() => _activeTab = 'chat');
  }

  void _handleLogout() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const LoginPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: Color(0xFFFAFAFA),
        body: Center(child: CircularProgressIndicator(color: Color(0xFF2D5A27))),
      );
    }

    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      body: Stack(
        children: [
          // Main Content
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(bottom: 100),
              child: Column(
                children: [
                  _buildHeaderZone(),
                  _buildQuickAiCards(),
                  _buildHealthProfileBadges(),
                  _buildTodaysInsight(),
                ],
              ),
            ),
          ),
          
          // Overlays
          if (_activeTab == 'chat') ChatPage(token: widget.token, onBack: () => setState(() => _activeTab = 'home')),
          if (_activeTab == 'profile')
            ProfileView(
              token: widget.token,
              userName: _userName,
              email: _userEmail,
              chronicDiseases: _healthConditions,
              intolerances: _userIntolerances,
              language: _currentLanguage,
              onBack: () => setState(() => _activeTab = 'home'),
              onLogout: _handleLogout,
              onProfileUpdated: _fetchProfile,
              onLanguageChanged: _handleLanguageChanged,
            ),
          
          // Bottom Navigation
          if (_activeTab != 'chat')
            Align(
              alignment: Alignment.bottomCenter,
              child: _buildBottomNav(),
            ),
        ],
      ),
    );
  }

  Widget _buildHeaderZone() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(24),
          bottomRight: Radius.circular(24),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      padding: const EdgeInsets.only(left: 24, right: 24, top: 16, bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '${_t['greeting']} $_userName 👋',
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w600, color: Colors.black87),
          ),
          const SizedBox(height: 4),
          Text(
            _t['subtitle'],
            style: const TextStyle(fontSize: 14, color: Colors.black54),
          ),
          const SizedBox(height: 24),

          // Health Score Widget
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFF8FFF9), Color(0xFFF0F9F1)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF2D5A27).withOpacity(0.1)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.trending_up, color: Color(0xFF2D5A27), size: 20),
                          const SizedBox(width: 8),
                          Text(
                            _t['healthReport'],
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.black87),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _t['healthReportDesc'],
                        style: const TextStyle(fontSize: 12, color: Colors.black54, height: 1.5),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          const Icon(Icons.auto_awesome, color: Color(0xFF2D5A27), size: 16),
                          const SizedBox(width: 4),
                          Text(
                            _t['keepGoing'],
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: Color(0xFF2D5A27)),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                
                // Circular Progress indicator
                SizedBox(
                  width: 100,
                  height: 100,
                  child: Stack(
                    children: [
                      Transform.rotate(
                        angle: -math.pi / 2,
                        child: CustomPaint(
                          size: const Size(100, 100),
                          painter: CircleProgressPainter(
                            progress: _healthScore / 100,
                            strokeWidth: 8,
                          ),
                        ),
                      ),
                      Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '$_healthScore%',
                              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF2D5A27)),
                            ),
                            Text(
                              _t['cleanEating'],
                              textAlign: TextAlign.center,
                              style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w500, color: Colors.black54, height: 1.1),
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAiCards() {
    final aiCards = [
      {'icon': Icons.apple, 'text': _t['aiAction1'], 'colors': [const Color(0xFF2D5A27), const Color(0xFF3d7a37)]},
      {'icon': Icons.local_fire_department, 'text': _t['aiAction2'], 'colors': [const Color(0xFF3d7a37), const Color(0xFF2D5A27)]},
      {'icon': Icons.bolt, 'text': _t['aiAction3'], 'colors': [const Color(0xFF4a9a4a), const Color(0xFF3d7a37)]},
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(_t['quickAi'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.black87)),
                const Icon(Icons.auto_awesome, color: Color(0xFF2D5A27), size: 20),
              ],
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            height: 120,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              scrollDirection: Axis.horizontal,
              itemCount: aiCards.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, index) {
                final card = aiCards[index];
                return GestureDetector(
                  onTap: () => _handleActionCardClick(card['text'] as String),
                  child: Container(
                    width: 280,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: card['colors'] as List<Color>,
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 8, offset: const Offset(0, 4)),
                      ],
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Icon(card['icon'] as IconData, color: Colors.white, size: 20),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            card['text'] as String,
                            style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w500, height: 1.4),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHealthProfileBadges() {
    final Map<String, String> labels = _currentLanguage == 'EN' ? _conditionLabelsEN : _conditionLabelsTR;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(_t['healthProfile'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.black87)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade100),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(_t['activeConditions'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Colors.black54)),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _healthConditions.map((condition) {
                    final labelText = labels[condition] ?? condition;
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF8FFF9),
                        border: Border.all(color: const Color(0xFF2D5A27).withOpacity(0.2)),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(width: 6, height: 6, decoration: const BoxDecoration(color: Color(0xFF2D5A27), shape: BoxShape.circle)),
                          const SizedBox(width: 8),
                          Text(labelText, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: Color(0xFF2D5A27))),
                        ],
                      ),
                    );
                  }).toList(),
                ),
                if (_healthConditions.isEmpty)
                  const Text('-', style: TextStyle(color: Colors.black54)),
                const SizedBox(height: 16),
                const Divider(height: 1, color: Color(0xFFEEEEEE)),
                const SizedBox(height: 16),
                Text(
                  _t['aiNote'],
                  style: const TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: Colors.black38),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTodaysInsight() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: [Colors.white, Color(0xFFF8FFF9)], begin: Alignment.topLeft, end: Alignment.bottomRight),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF2D5A27).withOpacity(0.1)),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: const Color(0xFF2D5A27),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.auto_awesome, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(_t['todaysInsight'], style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.black87)),
                  const SizedBox(height: 4),
                  Text(
                    _t['insightText'],
                    style: const TextStyle(fontSize: 12, color: Colors.black54, height: 1.5),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomNav() {
    return Stack(
      clipBehavior: Clip.none,
      alignment: Alignment.center,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border(top: BorderSide(color: Colors.grey.shade200)),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -4))],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildNavItem(Icons.home_outlined, Icons.home, _t['home'], 'home'),
              const SizedBox(width: 60), // Space for floating button
              _buildNavItem(Icons.person_outline, Icons.person, _t['profile'], 'profile'),
            ],
          ),
        ),
        
        // AI Assistant Floating Button
        Positioned(
          top: -30,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.grey.shade100),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4)],
                ),
                child: const Text('OptiMeal AI', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Color(0xFF2D5A27))),
              ),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => setState(() => _activeTab = 'chat'),
                child: Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [Color(0xFF2D5A27), Color(0xFF3d7a37)]),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 4),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.15), blurRadius: 8, offset: const Offset(0, 4))],
                  ),
                  child: const Icon(Icons.chat_bubble_rounded, color: Colors.white, size: 28),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildNavItem(IconData outlinedIcon, IconData solidIcon, String label, String tabKey) {
    final isActive = _activeTab == tabKey;
    final color = isActive ? const Color(0xFF2D5A27) : Colors.black38;
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => setState(() => _activeTab = tabKey),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(isActive ? solidIcon : outlinedIcon, color: color, size: 26),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: color)),
        ],
      ),
    );
  }

}

class CircleProgressPainter extends CustomPainter {
  final double progress;
  final double strokeWidth;

  CircleProgressPainter({required this.progress, required this.strokeWidth});

  @override
  void paint(Canvas canvas, Size size) {
    final Paint bgPaint = Paint()
      ..color = const Color(0xFFE5E7EB)
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke;

    final Paint progressPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFF2D5A27), Color(0xFF4a9a4a)],
      ).createShader(Rect.fromCircle(center: Offset(size.width / 2, size.height / 2), radius: size.width / 2))
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;

    canvas.drawCircle(center, radius, bgPaint);
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      0,
      math.pi * 2 * progress,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
