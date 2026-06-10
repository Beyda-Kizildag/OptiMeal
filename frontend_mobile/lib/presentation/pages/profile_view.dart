import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/constants/api_constants.dart';
import 'edit_profile_page.dart';

class ProfileView extends StatefulWidget {
  final String token;
  final String userName;
  final String email;
  final List<String> chronicDiseases;
  final List<String> intolerances;
  final String language;
  final VoidCallback onBack;
  final VoidCallback onLogout;
  final VoidCallback onProfileUpdated;
  final Function(String) onLanguageChanged;

  const ProfileView({
    super.key,
    required this.token,
    required this.userName,
    required this.email,
    required this.chronicDiseases,
    required this.intolerances,
    required this.language,
    required this.onBack,
    required this.onLogout,
    required this.onProfileUpdated,
    required this.onLanguageChanged,
  });

  @override
  State<ProfileView> createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  bool _notificationsEnabled = true;
  bool _isLoadingPrefs = true;

  @override
  void initState() {
    super.initState();
    _fetchPreferences();
  }

  Future<void> _fetchPreferences() async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConstants.baseUrl}/auth/preferences'),
        headers: {
          'Authorization': 'Bearer ${widget.token}',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final prefs = data['preferences'] ?? {};
        if (mounted) {
          setState(() {
            _notificationsEnabled = prefs['notifications'] ?? true;
            _isLoadingPrefs = false;
          });
        }
      } else {
        if (mounted) setState(() => _isLoadingPrefs = false);
      }
    } catch (e) {
      print('Error fetching preferences: $e');
      if (mounted) setState(() => _isLoadingPrefs = false);
    }
  }

  Future<void> _updatePreferences(Map<String, dynamic> updates) async {
    try {
      await http.put(
        Uri.parse('${ApiConstants.baseUrl}/auth/preferences'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${widget.token}',
        },
        body: jsonEncode(updates),
      );
    } catch (e) {
      print('Error updating preferences: $e');
    }
  }

  void _toggleNotifications(bool value) {
    setState(() {
      _notificationsEnabled = value;
    });
    _updatePreferences({'notifications': value});
  }

  void _showLanguageDialog() {
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          title: Text(widget.language == 'TR' ? 'Dil Seçimi' : 'Language Selection'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                title: const Text('Türkçe'),
                trailing: widget.language == 'TR' ? const Icon(Icons.check, color: Color(0xFF2D5A27)) : null,
                onTap: () {
                  Navigator.pop(ctx);
                  widget.onLanguageChanged('TR');
                  _updatePreferences({'language': 'TR'});
                },
              ),
              ListTile(
                title: const Text('English'),
                trailing: widget.language == 'EN' ? const Icon(Icons.check, color: Color(0xFF2D5A27)) : null,
                onTap: () {
                  Navigator.pop(ctx);
                  widget.onLanguageChanged('EN');
                  _updatePreferences({'language': 'EN'});
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _handleDeleteAccount() async {
    final t = _translations[widget.language] ?? _translations['TR']!;
    
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(t['deleteAccount']!),
        content: Text(t['deleteConfirm']!),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: Text(t['cancel']!, style: const TextStyle(color: Colors.black54)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () => Navigator.pop(ctx, true),
            child: Text(t['deleteButton']!, style: const TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      try {
        final response = await http.delete(
          Uri.parse('${ApiConstants.baseUrl}/auth/account'),
          headers: {
            'Authorization': 'Bearer ${widget.token}',
          },
        );
        if (response.statusCode == 200) {
          widget.onLogout();
        } else {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('${t['error']!} ${response.body}')),
            );
          }
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('${t['error']!} $e')),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final Map<String, String> t = _translations[widget.language] ?? _translations['TR']!;
    final Map<String, String> labels = widget.language == 'EN' ? _labelsEN : _labelsTR;

    return Container(
      color: const Color(0xFFFAFAFA),
      child: SafeArea(
        child: Column(
          children: [
            // Top Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back, color: Colors.black87),
                    onPressed: widget.onBack,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    t['profileTitle']!,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600, color: Colors.black87),
                  ),
                  const Spacer(),
                  IconButton(
                    icon: const Icon(Icons.edit, color: Color(0xFF2D5A27)),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => EditProfilePage(
                            token: widget.token,
                            initialDiseases: widget.chronicDiseases,
                            initialIntolerances: widget.intolerances,
                            language: widget.language,
                          ),
                        ),
                      ).then((_) {
                        widget.onProfileUpdated();
                      });
                    },
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.only(left: 24, right: 24, top: 24, bottom: 120),
                child: Column(
                  children: [
                    // Avatar & Info
                    Center(
                      child: Column(
                        children: [
                          Container(
                            width: 100,
                            height: 100,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [Color(0xFF2D5A27), Color(0xFF4a9a4a)]),
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4)),
                              ],
                            ),
                            child: Center(
                              child: Text(
                                widget.userName.isNotEmpty ? widget.userName[0].toUpperCase() : 'U',
                                style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(widget.userName, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black87)),
                          const SizedBox(height: 4),
                          Text(widget.email, style: const TextStyle(fontSize: 14, color: Colors.black54)),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Health Settings Card
                    _buildSectionHeader(t['healthSection']!),
                    const SizedBox(height: 12),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 8)],
                      ),
                      child: Column(
                        children: [
                          _buildListTile(Icons.favorite, t['chronicDiseases']!, 
                            widget.chronicDiseases.isEmpty ? t['none']! : widget.chronicDiseases.map((e) => labels[e] ?? e).join(', ')),
                          const Divider(height: 1),
                          _buildListTile(Icons.no_meals, t['intolerances']!, 
                            widget.intolerances.isEmpty ? t['none']! : widget.intolerances.map((e) => labels[e] ?? e).join(', ')),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),

                    // App Settings Card
                    _buildSectionHeader(t['appSettings']!),
                    const SizedBox(height: 12),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 8)],
                      ),
                      child: _isLoadingPrefs 
                        ? const Padding(padding: EdgeInsets.all(24), child: Center(child: CircularProgressIndicator(color: Color(0xFF2D5A27))))
                        : Column(
                        children: [
                          _buildToggleTile(Icons.notifications, t['notifications']!, _notificationsEnabled, _toggleNotifications),
                          const Divider(height: 1),
                          ListTile(
                            leading: Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(color: const Color(0xFFF5F5F5), borderRadius: BorderRadius.circular(8)),
                              child: const Icon(Icons.language, size: 20, color: Color(0xFF2D5A27)),
                            ),
                            title: Text(t['language']!, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.black87)),
                            subtitle: Text(widget.language == 'TR' ? 'Türkçe' : 'English', style: const TextStyle(fontSize: 13, color: Colors.black54)),
                            trailing: const Icon(Icons.chevron_right, color: Colors.black26),
                            onTap: _showLanguageDialog,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Logout Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: widget.onLogout,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFFFF0F0),
                          foregroundColor: Colors.redAccent,
                          elevation: 0,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.logout, size: 20),
                            const SizedBox(width: 8),
                            Text(t['logout']!, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    // Delete Account Button
                    SizedBox(
                      width: double.infinity,
                      child: TextButton(
                        onPressed: _handleDeleteAccount,
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.red.shade700,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                        ),
                        child: Text(t['deleteAccount']!, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.black54),
      ),
    );
  }

  Widget _buildListTile(IconData icon, String title, String subtitle) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(color: const Color(0xFFF5F5F5), borderRadius: BorderRadius.circular(8)),
        child: Icon(icon, size: 20, color: const Color(0xFF2D5A27)),
      ),
      title: Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.black87)),
      subtitle: Text(subtitle, style: const TextStyle(fontSize: 13, color: Colors.black54)),
    );
  }

  Widget _buildToggleTile(IconData icon, String title, bool value, Function(bool) onChanged) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(color: const Color(0xFFF5F5F5), borderRadius: BorderRadius.circular(8)),
        child: Icon(icon, size: 20, color: const Color(0xFF2D5A27)),
      ),
      title: Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.black87)),
      trailing: Switch(
        value: value,
        onChanged: onChanged,
        activeColor: const Color(0xFF2D5A27),
      ),
    );
  }
}

const Map<String, Map<String, String>> _translations = {
  'TR': {
    'profileTitle': 'Profilim',
    'healthSection': 'SAĞLIK PROFİLİ',
    'chronicDiseases': 'Kronik Rahatsızlıklar',
    'intolerances': 'İntoleranslar / Alerjiler',
    'none': 'Yok',
    'appSettings': 'UYGULAMA AYARLARI',
    'notifications': 'Bildirimler',
    'language': 'Uygulama Dili',
    'logout': 'Çıkış Yap',
    'deleteAccount': 'Hesabı Sil',
    'deleteConfirm': 'Hesabınızı ve tüm verilerinizi kalıcı olarak silmek istediğinizden emin misiniz?',
    'cancel': 'İptal',
    'deleteButton': 'Evet, Sil',
    'error': 'Hata:',
  },
  'EN': {
    'profileTitle': 'My Profile',
    'healthSection': 'HEALTH PROFILE',
    'chronicDiseases': 'Chronic Diseases',
    'intolerances': 'Intolerances / Allergies',
    'none': 'None',
    'appSettings': 'APP SETTINGS',
    'notifications': 'Notifications',
    'language': 'App Language',
    'logout': 'Log Out',
    'deleteAccount': 'Delete Account',
    'deleteConfirm': 'Are you sure you want to permanently delete your account and all your data?',
    'cancel': 'Cancel',
    'deleteButton': 'Yes, Delete',
    'error': 'Error:',
  }
};

const Map<String, String> _labelsTR = {
  'diabetes': 'Diyabet',
  'hypertension': 'Hipertansiyon',
  'ibs': 'İrritabl Bağırsak',
  'thyroid': 'Tiroid',
  'celiac': 'Çölyak',
  'asthma': 'Astım',
  'heartDisease': 'Kalp Hastalığı',
  'lactoseIntolerance': 'Laktoz İntoleransı',
  'soy': 'Soya',
  'shellfish': 'Kabuklu Deniz Mahsulleri',
  'nuts': 'Kuruyemiş',
  'eggs': 'Yumurta',
  'fish': 'Balık',
};

const Map<String, String> _labelsEN = {
  'diabetes': 'Diabetes',
  'hypertension': 'Hypertension',
  'ibs': 'IBS',
  'thyroid': 'Thyroid',
  'celiac': 'Celiac',
  'asthma': 'Asthma',
  'heartDisease': 'Heart Disease',
  'lactoseIntolerance': 'Lactose Intolerance',
  'soy': 'Soy',
  'shellfish': 'Shellfish',
  'nuts': 'Tree Nuts',
  'eggs': 'Eggs',
  'fish': 'Fish',
};
