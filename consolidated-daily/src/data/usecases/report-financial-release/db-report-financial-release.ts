import {
  ReportFinancialRelease,
  ReportFinancialReleaseRepository,
  ReportModel,
} from './db-report-financial-release.protocols';

export class DbReportFinancialRelease implements ReportFinancialRelease {
  constructor(private readonly getAllFinancialReleaseRepository: ReportFinancialReleaseRepository) {}

  async report(): Promise<ReportModel[]> {
    return this.getAllFinancialReleaseRepository.report();
  }
}
