import { IsArray, ArrayMinSize, ArrayMaxSize, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsString({ each: true })
  options: string[];

  @IsInt()
  @Min(0)
  @Max(3)
  correctIndex: number;
}
