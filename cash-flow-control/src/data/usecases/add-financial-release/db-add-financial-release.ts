import {
  AddFinancialRelease,
  AddFinancialReleaseModel,
  AddFinancialReleaseRepository,
  FinancialReleaseModel,
} from './db-add-financial-release.protocols';

export class DbAddFinancialRelease implements AddFinancialRelease {
  constructor(
    private readonly addFinancialReleaseRepository: AddFinancialReleaseRepository
  ) {}

  async add(data: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
    await this.addFinancialReleaseRepository.add(data);

    return new Promise((resolve) =>
      resolve({} as unknown as FinancialReleaseModel)
    );
  }
}
