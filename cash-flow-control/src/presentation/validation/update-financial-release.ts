import { FinancialReleaseType } from '@/domain/models/financial-release';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateFinancialReleaseDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  description: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  value: number;

  @IsDefined()
  @IsEnum(FinancialReleaseType)
  type: FinancialReleaseType;

  @IsDefined()
  @IsDateString()
  date: string;
}
