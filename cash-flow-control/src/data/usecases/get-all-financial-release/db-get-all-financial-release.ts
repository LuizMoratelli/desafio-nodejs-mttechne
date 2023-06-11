import {
  GetAllFinancialRelease,
  GetAllFinancialReleaseRepository,
  FinancialReleaseModel,
} from './db-get-all-financial-release.protocols';

export class DbGetAllFinancialRelease implements GetAllFinancialRelease {
  constructor(private readonly getAllFinancialReleaseRepository: GetAllFinancialReleaseRepository) {}

  async getAll(): Promise<FinancialReleaseModel[]> {
    return this.getAllFinancialReleaseRepository.getAll();
  }
}
