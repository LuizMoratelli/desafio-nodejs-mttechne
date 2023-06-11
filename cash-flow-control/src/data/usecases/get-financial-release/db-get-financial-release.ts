import {
  GetFinancialRelease,
  GetFinancialReleaseModel,
  GetFinancialReleaseRepository,
  FinancialReleaseModel,
} from './db-get-financial-release.protocols';

export class DbGetFinancialRelease implements GetFinancialRelease {
  constructor(private readonly addFinancialReleaseRepository: GetFinancialReleaseRepository) {}

  async get(data: GetFinancialReleaseModel): Promise<FinancialReleaseModel | null> {
    return this.addFinancialReleaseRepository.get(data);
  }
}
