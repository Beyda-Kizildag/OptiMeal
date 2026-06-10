import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class ApiConstants {
  // LÜTFEN DİKKAT: Gerçek bir telefonla (fiziksel cihaz) test yapıyorsanız, 
  // bilgisayarınızın Wi-Fi IPv4 adresini (örneğin 'http://192.168.1.45:3000') 
  // aşağıya yazmalısınız. Telefon ve bilgisayar aynı Wi-Fi'da olmalıdır.
  
  static const String _physicalDeviceIp = 'http://192.168.1.172:3000'; // Kendi IP'nizi yazın
  
  static String get baseUrl {
    if (kIsWeb) {
      return 'http://localhost:3000';
    }
    // Gerçek cihaz kullanıyorsanız üstteki _physicalDeviceIp'yi döndürün:
      return _physicalDeviceIp; 

    // Emülatör kullanıyorsanız bu kalabilir:
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3000';
    }
    return 'http://localhost:3000';
  }
}
