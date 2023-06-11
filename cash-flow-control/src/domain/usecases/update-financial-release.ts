import { FinancialReleaseModel, FinancialReleaseType } from '@/domain/models/financial-release';

export type UpdateFinancialReleaseModel = {
  description: string;
  value: number;
  type: FinancialReleaseType;
  date: string;
  id: string;
};

export interface UpdateFinancialRelease {
  update: (financialRelease: UpdateFinancialReleaseModel) => Promise<FinancialReleaseModel>;
}
