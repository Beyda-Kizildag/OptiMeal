import { IsNumber, IsOptional, IsArray, IsString, Min, Max } from 'class-validator';

export class CreateHealthProfileDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  age: number;

  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(250)
  height: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(300)
  weight: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  chronicDiseases: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  intolerances: string[];
}