# 🍏 OptiMeal Backend - AI-Powered Nutrition & Health Tracking

Bu dizin, OptiMeal projesinin **NestJS** ile geliştirilen sunucu tarafı mantığını ve veritabanı yönetimini barındırır. Projenin 3. haftasında temel güvenlik ve kullanıcı yönetim sistemi başarıyla kurulmuştur.

## 🚀 3. Hafta: Kimlik Doğrulama ve Güvenlik Güncellemesi

Bu hafta yapılan geliştirmeler, sistemin en kritik parçası olan **Authentication (Auth)** katmanına odaklanmıştır:

### 🛡️ Güvenlik Özellikleri
- **JWT (JSON Web Token) Entegrasyonu:** Kullanıcı oturumlarını güvenli ve "stateless" (durum bilgisi saklamayan) bir şekilde yönetmek için `@nestjs/jwt` ve `passport-jwt` kullanıldı.
- **Bcrypt Şifreleme:** Kullanıcı şifreleri veritabanına asla düz metin olarak kaydedilmez. `bcrypt` kütüphanesi ile yüksek güvenlikli bir şekilde "hash"lenerek saklanır.
- **DTO (Data Transfer Object) Mimarisi:** Gelen isteklerin (Request) doğruluğunu kontrol etmek ve tip güvenliğini (Type Safety) sağlamak için `RegisterDto` ve `LoginDto` sınıfları oluşturuldu.

### 🏗️ Veritabanı Modelleri (TypeORM)
- **User Entity:** Kullanıcının temel giriş bilgilerini tutan tablo.
- **HealthProfile Entity:** Kullanıcının kronik rahatsızlıkları, boy, kilo ve yaş gibi verilerini tutan tablo.
- **1:1 İlişki:** Her kullanıcının kendine ait tek bir sağlık profili olması için tablolar arası ilişki kuruldu.

### 🛣️ API Uç Noktaları (Endpoints)
| Metot | URL | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Yeni bir kullanıcı kaydı oluşturur (Şifreyi hashler). |
| `POST` | `/auth/login` | Kimlik bilgilerini doğrular ve bir `access_token` döner. |

### 📸 API Testleri (Postman)
Aşağıdaki ekran görüntüsü, `/auth/register` endpoint'ine gönderilen başarılı bir kayıt isteğini ve veritabanına hash'lenmiş şifre ile kaydedilen kullanıcı yanıtını göstermektedir:

<img width="1149" height="682" alt="Screenshot 2026-03-23 212220" src="https://github.com/user-attachments/assets/f5ae3177-c213-4d8a-88b3-6531282541ff" />

<img width="719" height="517" alt="Screenshot 2026-03-24 130840" src="https://github.com/user-attachments/assets/1412b229-5c70-4282-886b-f84eafc4c2b4" />


## 🛠️ Kurulum ve Çalıştırma

Backend projesini ayağa kaldırmak için ana dizindeki Docker konteynerlarının çalıştığından emin olun:

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme modunda başlat
npm run start:dev
