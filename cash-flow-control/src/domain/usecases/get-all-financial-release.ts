import { FinancialReleaseModel } from '@/domain/models/financial-release';

export interface GetAllFinancialRelease {
  getAll: () => Promise<FinancialReleaseModel[]>;
}
