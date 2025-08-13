import { IsInt, Min, Max, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerInterfaceDto {
  @IsInt()
  @Min(0)
  @Max(3)
  choosenIndex: number;

  @IsInt()
  questionId: number;
}

export class AnswerDto {
  @ValidateNested({ each: true })
  @Type(() => AnswerInterfaceDto)
  @ArrayMinSize(1)
  answers: AnswerInterfaceDto[];
}
