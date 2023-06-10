import {
  AddFinancialRelease,
  AddFinancialReleaseModel,
  FinancialReleaseModel,
} from './db-add-financial-release.protocols';

export class DbAddFinancialRelease implements AddFinancialRelease {
  constructor() {}

  async add({}: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
    return new Promise((resolve) =>
      resolve({} as unknown as FinancialReleaseModel)
    );
  }
}
