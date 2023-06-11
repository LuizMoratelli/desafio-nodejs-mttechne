import { DeleteFinancialReleaseModel } from '@/domain/usecases/delete-financial-release';

export interface DeleteFinancialReleaseRepository {
  delete: (financialReleaseData: DeleteFinancialReleaseModel) => Promise<void>;
}
