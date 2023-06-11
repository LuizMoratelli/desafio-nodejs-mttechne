import { DbReportFinancialRelease } from '@/data/usecases/report-financial-release/db-report-financial-release';
import { FinancialReleaseMongoRepository } from '@/infra/db/mongodb/financial-release-repository/financial-release';
import { ReportFinancialReleaseController } from '@/presentation/controllers/report-financial-release/report-financial-release';

export const makeReportFinancialReleaseController = (): ReportFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();

  const dbAddFinancialRelease = new DbReportFinancialRelease(financialReleaseMongoRepository);

  return new ReportFinancialReleaseController(dbAddFinancialRelease);
};
