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
    return this.addFinancialReleaseRepository.add(data);
  }
}
