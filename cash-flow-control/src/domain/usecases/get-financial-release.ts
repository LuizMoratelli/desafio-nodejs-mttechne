import { FinancialReleaseModel } from '@/domain/models/financial-release';

export type GetFinancialReleaseModel = {
  id: string;
};

export interface GetFinancialRelease {
  get: (financialRelease: GetFinancialReleaseModel) => Promise<FinancialReleaseModel | null>;
}
