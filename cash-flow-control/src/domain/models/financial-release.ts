import { FinancialReleaseType } from './financial-release-type';

export interface FinancialReleaseModel {
  id: string;
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
}
