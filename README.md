# 🛡️ Sağlık Profili & Güvenlik Altyapısı

Bu aşamada projenin veri güvenliği ve kişiselleştirme katmanı inşa edilmiştir. Temel odak noktası, hassas sağlık verilerinin korunması ve kullanıcıya özel analizler için gerekli veri setinin oluşturulmasıdır.

---

### 1. UUID Kimliklendirme Sistemi
ID yapısı yerine modern ve güvenli UUID yapısı benimsenmiştir.

* **Güvenlik Katmanı:** Artan tam sayı (integer) ID yapısı tamamen terk edilerek **UUID (Universally Unique Identifier)** yapısına geçilmiştir.
* **Veri Gizliliği:** Kullanıcıların hassas sağlık verilerine tahmin edilebilir ID'ler üzerinden erişilmesi (**IDOR - Insecure Direct Object Reference** riski) tamamen engellenmiştir.

### 2. Kişisel Sağlık Profili (`HealthProfile`)
Kullanıcının biyometrik ve tıbbi geçmişini tutan dinamik bir modül tasarlanmıştır.

* **Dinamik Yapı:** Kullanıcıların kronik rahatsızlıklarını (Diyabet, Hipertansiyon, Alerji vb.) ve gıda intoleranslarını (Laktoz, Gluten vb.) tanımlayabildiği tablo yapısı oluşturulmuştur.
* **Fiziksel Metrikler:** Boy, kilo ve yaş verileri, ileride yapılacak olan **BMI (Vücut Kitle İndeksi)** ve inflamasyon analizi algoritmaları için sisteme entegre edilmiştir.

### 3. JWT Guard & Yetkilendirme
Erişim kontrolü ve veri izolasyonu merkezi bir güvenlik stratejisiyle yönetilmektedir.

* **Erişim Kontrolü:** `JwtAuthGuard` ve `JwtStrategy` implementasyonu ile sağlık verileri koruma altına alınmıştır.
* **Context Yönetimi:** İstek atan kullanıcının kimliği token üzerinden çözülerek sadece kendi verisine güvenli erişim sağlaması sağlanmıştır. Bu kurgu, veritabanı düzeyinde izolasyon prensibini destekler.
