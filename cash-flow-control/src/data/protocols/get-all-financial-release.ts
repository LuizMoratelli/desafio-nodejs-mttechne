import { FinancialReleaseModel } from '@/domain/models/financial-release';

export interface GetAllFinancialReleaseRepository {
  getAll: () => Promise<FinancialReleaseModel[]>;
}
