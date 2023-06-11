import { FinancialReleaseModel } from '../../domain/models/financial-release';
import { AddFinancialReleaseModel } from '../../domain/usecases/add-financial-release';

export interface AddFinancialReleaseRepository {
  add: (financialReleaseData: AddFinancialReleaseModel) => Promise<FinancialReleaseModel>;
}
