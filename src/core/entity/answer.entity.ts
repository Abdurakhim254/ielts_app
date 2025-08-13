import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  choosenIndex: number;

  @ManyToOne(() => Question, question => question.answers, { onDelete: 'CASCADE' })
  question: Question;

  @CreateDateColumn()
  createdAt: Date;
}
