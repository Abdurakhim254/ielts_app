import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, QuestionRepository } from 'src/core';
import {  QuestionResponse } from 'src/infrastructure';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private questionRepository:QuestionRepository
  ){}
  async create(createQuestionDto: CreateQuestionDto) {
    const question =this.questionRepository.create(createQuestionDto);
    await this.questionRepository.save(question);
    return {
      message:'Question Created Successfully',
      question
    };
  }

  async findAll() {
    const questions=await this.questionRepository.find();
    if(questions.length===0) throw new NotFoundException('No Question Found');
    return {
      message:'Questions Found Successfully',
      questions
    };
  }

  async findOne(id: number):Promise<QuestionResponse> {
    const question=await this.questionRepository.findOne({where:{id}});
    if(!question){ throw new NotFoundException('Question Not Found');
  }
    return {
      message:'Question Found Successfully',
      question
    };
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question=await this.findOne(id)
    if(!question) {throw new NotFoundException('Question Not Found');
  }
    await this.questionRepository.update(id, {
      ...updateQuestionDto,
      updatedAt: new Date(),
    });
  
    const updatedUser=await this.findOne(id)

    return {
      message:'Question Updated Successfully',
      updatedUser
    };
  }

  async remove(id: number) {
    const question=await this.findOne(id);
    if(!question) {
      throw new NotFoundException('Question Not Found');
  }
    await this.questionRepository.delete(id);
    return {
      message:'Question Deleted Successfully',
      question
    };
  }

  async getCorrectIndex(questionId: number): Promise<number | null> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
      select: ['correctIndex'],
    });
    return question ? question.correctIndex : null;
  }
  
}
