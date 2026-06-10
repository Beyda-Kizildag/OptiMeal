import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/constants/api_constants.dart';

class EditProfilePage extends StatefulWidget {
  final String token;
  final List<String> initialDiseases;
  final List<String> initialIntolerances;
  final String language;

  const EditProfilePage({
    super.key,
    required this.token,
    required this.initialDiseases,
    required this.initialIntolerances,
    required this.language,
  });

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  late List<String> _selectedDiseases;
  late List<String> _selectedIntolerances;
  bool _isSaving = false;

  final List<Map<String, dynamic>> _healthConditions = [
    {'id': 'diabetes', 'labelTR': 'Diyabet', 'labelEN': 'Diabetes', 'icon': Icons.water_drop},
    {'id': 'hypertension', 'labelTR': 'Hipertansiyon', 'labelEN': 'Hypertension', 'icon': Icons.favorite},
    {'id': 'ibs', 'labelTR': 'İrritabl Bağırsak (IBS)', 'labelEN': 'IBS', 'icon': Icons.spa},
    {'id': 'thyroid', 'labelTR': 'Tiroid', 'labelEN': 'Thyroid', 'icon': Icons.healing},
    {'id': 'celiac', 'labelTR': 'Çölyak', 'labelEN': 'Celiac', 'icon': Icons.grass},
    {'id': 'asthma', 'labelTR': 'Astım', 'labelEN': 'Asthma', 'icon': Icons.air},
    {'id': 'heartDisease', 'labelTR': 'Kalp Hastalığı', 'labelEN': 'Heart Disease', 'icon': Icons.monitor_heart},
    {'id': 'lactoseIntolerance', 'labelTR': 'Laktoz İntoleransı', 'labelEN': 'Lactose Intolerance', 'icon': Icons.no_drinks},
  ];

  final List<Map<String, dynamic>> _intolerances = [
    {'id': 'soy', 'labelTR': 'Soya', 'labelEN': 'Soy', 'icon': Icons.eco},
    {'id': 'shellfish', 'labelTR': 'Kabuklu Deniz Mahsulleri', 'labelEN': 'Shellfish', 'icon': Icons.set_meal},
    {'id': 'nuts', 'labelTR': 'Kuruyemiş', 'labelEN': 'Tree Nuts', 'icon': Icons.grass},
    {'id': 'eggs', 'labelTR': 'Yumurta', 'labelEN': 'Eggs', 'icon': Icons.egg},
    {'id': 'fish', 'labelTR': 'Balık', 'labelEN': 'Fish', 'icon': Icons.phishing},
  ];

  final Map<String, Map<String, String>> _translations = {
    'TR': {
      'title': 'Profili Düzenle',
      'diseases': 'Hastalıklar',
      'diseasesDesc': 'Var olan sağlık durumlarınızı seçin:',
      'intolerances': 'Alerjiler & İntoleranslar',
      'intolerancesDesc': 'Tüketmemeniz gereken besinleri seçin:',
      'save': 'Değişiklikleri Kaydet',
      'saving': 'Kaydediliyor...',
      'success': 'Profil güncellendi!',
      'error': 'Bir hata oluştu.',
    },
    'EN': {
      'title': 'Edit Profile',
      'diseases': 'Health Conditions',
      'diseasesDesc': 'Select your active conditions:',
      'intolerances': 'Allergies & Intolerances',
      'intolerancesDesc': 'Select foods you cannot consume:',
      'save': 'Save Changes',
      'saving': 'Saving...',
      'success': 'Profile updated!',
      'error': 'An error occurred.',
    }
  };

  @override
  void initState() {
    super.initState();
    _selectedDiseases = List.from(widget.initialDiseases);
    _selectedIntolerances = List.from(widget.initialIntolerances);
  }

  Future<void> _handleSave() async {
    setState(() => _isSaving = true);
    final t = _translations[widget.language] ?? _translations['TR']!;
    
    try {
      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/health/profile'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${widget.token}',
        },
        body: jsonEncode({
          'chronicDiseases': _selectedDiseases,
          'intolerances': _selectedIntolerances,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(t['success']!)));
          Navigator.pop(context, true);
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${t['error']!} ${response.body}')));
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${t['error']!} $e')));
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  void _toggleDisease(String id) {
    setState(() {
      if (_selectedDiseases.contains(id)) {
        _selectedDiseases.remove(id);
      } else {
        _selectedDiseases.add(id);
      }
    });
  }

  void _toggleIntolerance(String id) {
    setState(() {
      if (_selectedIntolerances.contains(id)) {
        _selectedIntolerances.remove(id);
      } else {
        _selectedIntolerances.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final t = _translations[widget.language] ?? _translations['TR']!;

    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      appBar: AppBar(
        title: Text(t['title']!, style: const TextStyle(fontWeight: FontWeight.w600, color: Colors.black87)),
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black87),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionTitle(t['diseases']!, t['diseasesDesc']!),
              const SizedBox(height: 16),
              _buildGrid(_healthConditions, _selectedDiseases, _toggleDisease),
              const SizedBox(height: 32),
              
              _buildSectionTitle(t['intolerances']!, t['intolerancesDesc']!),
              const SizedBox(height: 16),
              _buildGrid(_intolerances, _selectedIntolerances, _toggleIntolerance),
              const SizedBox(height: 48),

              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isSaving ? null : _handleSave,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2D5A27),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: _isSaving
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                      : Text(t['save']!, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title, String subtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black87)),
        const SizedBox(height: 4),
        Text(subtitle, style: const TextStyle(fontSize: 14, color: Colors.black54)),
      ],
    );
  }

  Widget _buildGrid(List<Map<String, dynamic>> items, List<String> selectedList, Function(String) onToggle) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: items.map((item) {
        final isSelected = selectedList.contains(item['id']);
        final label = widget.language == 'EN' ? item['labelEN'] : item['labelTR'];
        return GestureDetector(
          onTap: () => onToggle(item['id']),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: isSelected ? const Color(0xFF2D5A27) : Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: isSelected ? const Color(0xFF2D5A27) : Colors.grey.shade200,
                width: 2,
              ),
              boxShadow: [
                if (!isSelected)
                  BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, 2))
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(item['icon'] as IconData, size: 18, color: isSelected ? Colors.white : const Color(0xFF2D5A27)),
                const SizedBox(width: 8),
                Text(
                  label as String,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                    color: isSelected ? Colors.white : Colors.black87,
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }
}
