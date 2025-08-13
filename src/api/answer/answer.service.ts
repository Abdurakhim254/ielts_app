import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer, AnswerRepository } from 'src/core';
import { QuestionService } from '../question/question.service';
import { AnswerDto } from './dto/answer.dto';
import { AnswerResult } from 'src/infrastructure';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answerRepository:AnswerRepository,
    private questionService:QuestionService
  ){}

  async getresult(requestBody:AnswerDto):Promise<AnswerResult> {
  
    let correctCount = 0;
    let incorrectCount = 0;
    
    const array=[...requestBody.answers]


    for (const { choosenIndex, questionId } of array) {
      await this.answerRepository.save({
        choosenIndex,
        question: { id: questionId } as any,
      });
  
      const correctIndex = await this.questionService.getCorrectIndex(questionId);
  
      if (correctIndex !== null) {
        if (correctIndex === choosenIndex) correctCount++;
        else incorrectCount++;
      }

      await this.answerRepository.clear()

    }
  
    return {
      message: 'Answers processed successfully',
      correct: correctCount,
      incorrect: incorrectCount,
      total: array.length,
    };
  }
}


  

