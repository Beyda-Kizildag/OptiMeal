import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../core/constants/api_constants.dart';

class Message {
  final String id;
  final bool isUser;
  final String text;
  final DateTime timestamp;
  final String? motivationalFeedback;

  Message({
    required this.id,
    required this.isUser,
    required this.text,
    required this.timestamp,
    this.motivationalFeedback,
  });
}

class ChatPage extends StatefulWidget {
  final String token;
  final VoidCallback onBack;

  const ChatPage({super.key, required this.token, required this.onBack});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  
  final List<Message> _messages = [];
  bool _isTyping = false;

  final List<Map<String, dynamic>> _quickActionChips = [
    {
      'id': 'lowGlycemic',
      'text': 'Düşük Glisemik Atıştırmalık',
      'icon': Icons.trending_up,
    },
    {
      'id': 'healthyBurger',
      'text': 'Sağlıklı Hamburger Alternatifi',
      'icon': Icons.favorite,
    },
    {
      'id': 'lowEnergy',
      'text': 'Enerji Düşüklüğü',
      'icon': Icons.auto_awesome,
    },
  ];

  @override
  void initState() {
    super.initState();
    _fetchHistory();
  }

  Future<void> _fetchHistory() async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConstants.baseUrl}/ai/chat/history'),
        headers: {
          'Authorization': 'Bearer ${widget.token}',
        },
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as List;
        final history = data.map((item) => Message(
          id: item['id'] ?? DateTime.now().millisecondsSinceEpoch.toString(),
          isUser: item['role'] == 'user',
          text: item['content'],
          timestamp: DateTime.parse(item['createdAt']),
        )).toList();

        if (mounted) {
          setState(() {
            _messages.clear();
            if (history.isEmpty) {
              _messages.add(
                Message(
                  id: '1',
                  isUser: false,
                  text: 'Merhaba! Ben OptiMeal AI Asistanınızım. Sağlıklı beslenme konusunda size nasıl yardımcı olabilirim?',
                  timestamp: DateTime.now(),
                  motivationalFeedback: 'Sağlıklı seçimler yapmaya hazırsınız!',
                ),
              );
            } else {
              _messages.addAll(history);
            }
          });
          _scrollToBottom();
        }
      }
    } catch (e) {
      print('Failed to fetch history: $e');
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _handleSendMessage(String text) async {
    if (text.trim().isEmpty) return;

    final userText = text.trim();
    _textController.clear();

    setState(() {
      _messages.add(
        Message(
          id: DateTime.now().millisecondsSinceEpoch.toString(),
          isUser: true,
          text: userText,
          timestamp: DateTime.now(),
        ),
      );
      _isTyping = true;
    });
    
    _scrollToBottom();

    try {
      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/ai/chat'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${widget.token}',
        },
        body: jsonEncode({'message': userText}),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        setState(() {
          _messages.add(
            Message(
              id: DateTime.now().millisecondsSinceEpoch.toString(),
              isUser: false,
              text: data['reply'] ?? 'Cevap alınamadı.',
              timestamp: DateTime.now(),
              motivationalFeedback: _getMotivationalFeedback(userText),
            ),
          );
        });
      } else {
        throw Exception('API error');
      }
    } catch (e) {
      setState(() {
        _messages.add(
          Message(
            id: DateTime.now().millisecondsSinceEpoch.toString(),
            isUser: false,
            text: 'Üzgünüm, şu an bağlantı kuramıyorum. Lütfen internet bağlantınızı kontrol edin.',
            timestamp: DateTime.now(),
          ),
        );
      });
    } finally {
      setState(() {
        _isTyping = false;
      });
      _scrollToBottom();
    }
  }

  String _getMotivationalFeedback(String text) {
    final feedbacks = [
      'Bu seçim enerjinizi yüksek tutar!',
      'Harika bir soru - sağlıklı düşünüyorsunuz!',
      'Bu seçim kan şekerinizi dengede tutar!',
      'Mükemmel! İnflamasyonu azaltmaya devam!',
    ];
    return feedbacks[DateTime.now().millisecondsSinceEpoch % feedbacks.length];
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: SafeArea(
        child: Column(
          children: [
            // Top App Bar
            _buildAppBar(),

            // Chat Messages Area
            Expanded(
              child: Container(
                color: const Color(0xFFFAFAFA),
                child: ListView.builder(
                  controller: _scrollController,
                  padding: const EdgeInsets.all(16),
                  itemCount: _messages.length + (_isTyping ? 1 : 0),
                  itemBuilder: (context, index) {
                    if (index == _messages.length && _isTyping) {
                      return _buildTypingIndicator();
                    }
                    return _buildMessageBubble(_messages[index]);
                  },
                ),
              ),
            ),

            // Bottom Input Area
            _buildBottomArea(),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            offset: const Offset(0, 1),
            blurRadius: 2,
          ),
        ],
      ),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.black87),
            onPressed: widget.onBack,
          ),
          const SizedBox(width: 8),
          Stack(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF8FBC8F), Color(0xFF6B9B6B)],
                  ),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.auto_awesome, color: Colors.white, size: 20),
              ),
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: const Color(0xFF4ADE80),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 2),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(width: 12),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'OptiMeal Assistant',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Colors.black87),
              ),
              Text(
                'Online',
                style: TextStyle(fontSize: 12, color: Color(0xFF4ADE80)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTypingIndicator() {
    return Align(
      alignment: Alignment.centerLeft,
      child: Padding(
        padding: EdgeInsets.only(bottom: 16),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: Color(0xFF8FBC8F),
            borderRadius: BorderRadius.all(Radius.circular(16)),
          ),
          child: Text('OptiMeal AI yazıyor...', style: TextStyle(color: Colors.white, fontSize: 12, fontStyle: FontStyle.italic)),
        ),
      ),
    );
  }

  Widget _buildMessageBubble(Message message) {
    return Align(
      alignment: message.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        margin: const EdgeInsets.only(bottom: 16),
        child: Column(
          crossAxisAlignment: message.isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: message.isUser ? const Color(0xFF800000) : const Color(0xFF8FBC8F),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text(
                message.text,
                style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.4),
              ),
            ),
            if (!message.isUser && message.motivationalFeedback != null)
              Container(
                margin: const EdgeInsets.only(top: 8),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade200),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.02),
                      blurRadius: 4,
                    )
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.trending_up, color: Color(0xFF8FBC8F), size: 14),
                    const SizedBox(width: 8),
                    Flexible(
                      child: Text(
                        message.motivationalFeedback!,
                        style: TextStyle(fontSize: 11, color: Colors.grey.shade600, fontStyle: FontStyle.italic),
                      ),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: 4),
            Text(
              "${message.timestamp.hour.toString().padLeft(2, '0')}:${message.timestamp.minute.toString().padLeft(2, '0')}",
              style: TextStyle(fontSize: 10, color: Colors.grey.shade400),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomArea() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Colors.grey.shade100)),
      ),
      child: Column(
        children: [
          // Quick Action Chips
          SizedBox(
            height: 40,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _quickActionChips.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final chip = _quickActionChips[index];
                return GestureDetector(
                  onTap: () => _handleSendMessage(chip['text']),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF8FBC8F), Color(0xFF6B9B6B)],
                      ),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(chip['icon'], color: Colors.white, size: 14),
                        const SizedBox(width: 6),
                        Text(
                          chip['text'],
                          style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          
          // Input Row
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF5F5F5),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: Colors.grey.shade200),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _textController,
                          decoration: const InputDecoration(
                            hintText: 'Mesajınızı yazın...',
                            hintStyle: TextStyle(color: Colors.grey, fontSize: 14),
                            border: InputBorder.none,
                          ),
                          onSubmitted: _handleSendMessage,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.mic, color: Colors.grey, size: 20),
                        onPressed: () {
                          // voice logic
                        },
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: () => _handleSendMessage(_textController.text),
                child: Container(
                  width: 48,
                  height: 48,
                  decoration: const BoxDecoration(
                    color: Color(0xFF800000),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.send, color: Colors.white, size: 20),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
