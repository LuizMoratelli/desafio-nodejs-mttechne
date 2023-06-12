import { ReportModel } from '@/domain/models/financial-release';

export interface ReportFinancialReleaseRepository {
  report: () => Promise<ReportModel[]>;
}
