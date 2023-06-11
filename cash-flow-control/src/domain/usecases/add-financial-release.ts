import { FinancialReleaseModel, FinancialReleaseType } from '@/domain/models/financial-release';

export interface AddFinancialReleaseModel {
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
}

export interface AddFinancialRelease {
  add: (financialRelease: AddFinancialReleaseModel) => Promise<FinancialReleaseModel>;
}
