import {
  UpdateFinancialRelease,
  UpdateFinancialReleaseModel,
  UpdateFinancialReleaseRepository,
  FinancialReleaseModel,
} from './db-update-financial-release.protocols';

export class DbUpdateFinancialRelease implements UpdateFinancialRelease {
  constructor(private readonly updateFinancialReleaseRepository: UpdateFinancialReleaseRepository) {}

  async update(data: UpdateFinancialReleaseModel): Promise<FinancialReleaseModel> {
    return this.updateFinancialReleaseRepository.update(data);
  }
}
