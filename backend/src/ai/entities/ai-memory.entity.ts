import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('ai_memories')
export class AiMemory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  text: string;

  @Column('text', { nullable: true })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}
