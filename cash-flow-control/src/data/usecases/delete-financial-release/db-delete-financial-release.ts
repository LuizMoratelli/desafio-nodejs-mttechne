import {
  DeleteFinancialRelease,
  DeleteFinancialReleaseModel,
  DeleteFinancialReleaseRepository,
} from './db-delete-financial-release.protocols';

export class DbDeleteFinancialRelease implements DeleteFinancialRelease {
  constructor(private readonly deleteFinancialReleaseRepository: DeleteFinancialReleaseRepository) {}

  async delete(data: DeleteFinancialReleaseModel): Promise<void> {
    return this.deleteFinancialReleaseRepository.delete(data);
  }
}
