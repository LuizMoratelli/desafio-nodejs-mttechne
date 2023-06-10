import { FinancialReleaseModel } from '../models/financial-release';
import { FinancialReleaseType } from '../models/financial-release-type';

export interface AddFinancialReleaseModel {
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
}

export interface AddFinancialRelease {
  add: (
    financialRelease: AddFinancialReleaseModel
  ) => Promise<FinancialReleaseModel>;
}
