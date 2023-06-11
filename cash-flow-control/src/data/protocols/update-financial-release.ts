import { FinancialReleaseModel } from '@/domain/models/financial-release';
import { UpdateFinancialReleaseModel } from '@/domain/usecases/update-financial-release';

export interface UpdateFinancialReleaseRepository {
  update: (financialReleaseData: UpdateFinancialReleaseModel) => Promise<FinancialReleaseModel>;
}
