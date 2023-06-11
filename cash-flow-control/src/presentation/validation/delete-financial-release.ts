import { IsDefined, IsString } from 'class-validator';

export class DeleteFinancialReleaseDto {
  @IsDefined()
  @IsString()
  id: string;
}
