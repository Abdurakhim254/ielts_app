import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { RolesGuard } from 'src/common';
import { AnswerDto } from './dto/answer.dto';

@UseGuards(RolesGuard)
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('submit')
  async getResults(@Body() requestBody:AnswerDto){
    return this.answerService.getresult(requestBody)
  }

}
