import { GetFinancialRelease } from '@/domain/usecases/get-financial-release';
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http';
import { Controller, HttpRequest, HttpResponse } from './get-financial-release.protocols';
import { GetFinancialReleaseDto } from '@/presentation/validation/get-financial-release';
import { Validator } from '@/infra/validation/class-validator/validator';
import { adaptValidator } from '@/presentation/adapters/class-validator-adapter';
import { NotFoundError } from '@/presentation/errors';

export class GetFinancialReleaseController implements Controller {
  constructor(private readonly getFinancialRelease: GetFinancialRelease, private readonly validator: Validator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { data, errors } = adaptValidator(
        await this.validator.validate(GetFinancialReleaseDto, httpRequest.params)
      )();

      if (errors) {
        return badRequest(errors);
      }

      const financialRelease = await this.getFinancialRelease.get(data);

      if (!financialRelease) {
        return notFound(new NotFoundError(data.id));
      }

      console.log(financialRelease);

      return ok(financialRelease);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
