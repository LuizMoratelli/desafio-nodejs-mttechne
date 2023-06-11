import { ReportModel } from '@/domain/models/financial-release';

export interface ReportFinancialRelease {
  report: () => Promise<ReportModel[]>;
}
