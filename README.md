# 🥗 OptiMeal - Akıllı Beslenme ve Sağlık Backend

OptiMeal, kullanıcıların kronik rahatsızlıklarına ve besin intoleranslarına göre AI destekli beslenme önerileri sunan bir platformdur.

## 🚀 4. Hafta Geliştirmeleri: Güvenli Kimlik Doğrulama

Bu hafta, projenin güvenlik ve kullanıcı yönetimi altyapısı aşağıdaki özelliklerle tamamlanmıştır:

### 🛡️ Güvenlik ve Auth Mimarisi
- **HttpOnly Cookie Yönetimi:** JWT token'ları, XSS saldırılarına karşı koruma sağlamak amacıyla tarayıcı tarafında erişilemeyen `HttpOnly` çerezlerde saklanır.
- **DTO (Data Transfer Object) Doğrulama:** `class-validator` ve `class-transformer` kullanılarak, API'ye gelen veriler (email formatı, şifre uzunluğu vb.) kontrol katmanında sıkı bir şekilde denetlenir.
- **Bcrypt Şifreleme:** Kullanıcı şifreleri veritabanına kaydedilmeden önce yüksek güvenlikli hashleme işleminden geçirilir.
- **Stateless Session:** Ölçeklenebilir bir yapı için JWT tabanlı oturum yönetimi uygulanmıştır.

### 🏗️ Teknik Stack
- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL (TypeORM)
- **Security:** Passport-JWT, Bcrypt, Cookie-Parser
- **Environment:** Docker-Compose

## 📅 Sırada Ne Var? (5. Hafta)
- [ ] Sağlık Profili (HealthProfile) Entity ve CRUD işlemleri.
- [ ] Hastalık ve İntolerans Listesi API'ları.
- [ ] React Frontend projesinin başlatılması ve Onboarding ekranları.
 ### Postman Kontrolü
  <img width="996" height="427" alt="Screenshot 2026-04-02 172730" src="https://github.com/user-attachments/assets/166533a3-90cf-4ca9-9f10-081420e4b632" />

