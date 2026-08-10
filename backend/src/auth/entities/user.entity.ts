import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { HealthProfile } from '../../health/entities/health-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  password_hash: string; // Şifreleri hash'leyerek saklama (Güvenlik)

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  preferences: any;

  // Her kullanıcının sadece bir sağlık profili olabilir (1:1 İlişki)
  @OneToOne(() => HealthProfile, (profile) => profile.user)
  healthProfile: HealthProfile;
}
