import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('health_profiles')
export class HealthProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { nullable: true })
  chronicDiseases: string[];

  @Column('simple-array', { nullable: true })
  intolerances: string[];

  @Column('simple-array', { nullable: true })
  pastIllnesses: string[];

  @Column({ default: 0 })
  lastAnalysisScore: number; // Sağlık karnesi puanı

  // kullanıcı - profil eşletirme (1:1 İlişki)
  @OneToOne(() => User, (user) => user.healthProfile)
  @JoinColumn()
  user: User;
}
