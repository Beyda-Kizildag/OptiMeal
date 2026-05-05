import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity'; // User entity yoluna göre düzenle

@Entity('health_profiles')
export class HealthProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string; //numberdan -- string çevirldi.

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column('text', { array: true, default: [] })
  chronicDiseases: string[]; // Kronik rahatsızlıklar listesi
  @Column('text', { array: true, default: [] })
  intolerances: string[];

  @OneToOne(() => User, (user) => user.healthProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User; // kullanıcı silinirse profil de silinir
}