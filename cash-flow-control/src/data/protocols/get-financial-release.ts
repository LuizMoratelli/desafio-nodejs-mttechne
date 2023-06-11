import { FinancialReleaseModel } from '@/domain/models/financial-release';
import { GetFinancialReleaseModel } from '@/domain/usecases/get-financial-release';

export interface GetFinancialReleaseRepository {
  get: (financialReleaseData: GetFinancialReleaseModel) => Promise<FinancialReleaseModel | null>;
}
