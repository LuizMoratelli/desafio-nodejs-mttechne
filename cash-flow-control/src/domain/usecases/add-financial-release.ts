import { FinancialReleaseModel } from '../models/financial-release';

export interface AddFinancialReleaseModel {
  description: string;
  value: number;
  type: FinancialReleaseModel;
  date: string;
}

export interface AddFinancialRelease {
  add: (financialRelease: AddFinancialReleaseModel) => FinancialReleaseModel;
}
