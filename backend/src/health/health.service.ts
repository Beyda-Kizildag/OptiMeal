import { Injectable } from '@nestjs/common';
import { CreateHealthProfileDto } from './dto/create-health-profile.dto';
import { Repository } from 'typeorm';
import { HealthProfile } from './entities/health-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthProfile)
    private readonly healthProfileRepository: Repository<HealthProfile>,
  ) {}

  getDiseaseList() {
    // Bu liste ilerde "Recipe Filter" için kaynak olacak
    return [
      { id: 'diabetes', name: 'Diyabet', note: 'Düşük glisemik indeksli besinler önerilir' },
      { id: 'celiac', name: 'Çölyak', note: 'Glutensiz tarifler listelenir' },
      { id: 'hypertension', name: 'Hipertansiyon', note: 'Düşük sodyum odaklı beslenme' },
      { id: 'lactose', name: 'Laktoz İntoleransı', note: 'Süt ürünleri alternatifi sunulur' }
    ];
  }

  async saveOrUpdateProfile(userId: string, dto: CreateHealthProfileDto) {
    // ACID: Veri tutarlılığı için önce kontrol et
    let profile = await this.healthProfileRepository.findOne({
      where: { user: { id: userId } }
    });

    if (profile) {
      // DRY: Mevcut veriyi DTO ile güncelle
      Object.assign(profile, dto);
    } else {
      // Yeni profil oluştur ve OneToOne ilişkiyi kur
      profile = this.healthProfileRepository.create({
        ...dto,
        user: { id: userId } // User entity'sinin sadece id'siyle ilişki kurmak için geçici çözüm
      });
    }

    return await this.healthProfileRepository.save(profile);
  }

  async getProfile(userId: string) {
    const profile = await this.healthProfileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'], // to get user email
    });
    
    if (!profile) {
      // return empty structure if not found
      return { chronicDiseases: [], intolerances: [], user: { email: 'Kullanıcı' }, age: 0, height: 0, weight: 0 };
    }
    
    return profile;
  }
}