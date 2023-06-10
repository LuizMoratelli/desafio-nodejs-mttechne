import { FinancialReleaseModel } from '../../../domain/models/financial-release';
import {
  AddFinancialRelease,
  AddFinancialReleaseModel,
} from '../../../domain/usecases/add-financial-release';

export class DbAddFinancialRelease implements AddFinancialRelease {
  constructor() {}

  async add({}: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
    return new Promise((resolve) =>
      resolve({} as unknown as FinancialReleaseModel)
    );
  }
}
