import { GetAllFinancialRelease } from '@/domain/usecases/get-all-financial-release';
import { ok, serverError } from '@/presentation/helpers/http';
import { Controller, HttpRequest, HttpResponse } from './get-all-financial-release.protocols';
import { Validator } from '@/infra/validation/class-validator/validator';

export class GetAllFinancialReleaseController implements Controller {
  constructor(private readonly getAllFinancialRelease: GetAllFinancialRelease, private readonly validator: Validator) {}

  async handle(_: HttpRequest): Promise<HttpResponse> {
    try {
      const financialRelease = await this.getAllFinancialRelease.getAll();

      return ok(financialRelease);
    } catch (error) {
      return serverError();
    }
  }
}
