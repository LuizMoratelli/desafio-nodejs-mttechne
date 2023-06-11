import { ReportFinancialRelease } from '@/domain/usecases/report-financial-release';
import { ok, serverError } from '@/presentation/helpers/http';
import { Controller, HttpRequest, HttpResponse } from './report-financial-release.protocols';

export class ReportFinancialReleaseController implements Controller {
  constructor(private readonly reportFinancialRelease: ReportFinancialRelease) {}

  async handle(_: HttpRequest): Promise<HttpResponse> {
    try {
      const financialRelease = await this.reportFinancialRelease.report();

      return ok(financialRelease);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
