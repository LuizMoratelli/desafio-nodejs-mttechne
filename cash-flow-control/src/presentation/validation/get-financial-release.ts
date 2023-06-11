import { IsDefined, IsString } from 'class-validator';

export class GetFinancialReleaseDto {
  @IsDefined()
  @IsString()
  id: string;
}
