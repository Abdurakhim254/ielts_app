import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/core';
import { AnswerController } from './answer.controller';
import { QuestionModule } from '../question/question.module';

@Module({
  imports:[TypeOrmModule.forFeature([Answer]),QuestionModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
