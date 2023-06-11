import { UpdateFinancialRelease } from '@/domain/usecases/update-financial-release';
import { badRequest, ok, serverError } from '@/presentation/helpers/http';
import { Controller, HttpRequest, HttpResponse } from './update-financial-release.protocols';
import { UpdateFinancialReleaseDto } from '@/presentation/validation/update-financial-release';
import { Validator } from '@/infra/validation/class-validator/validator';
import { adaptValidator } from '@/presentation/adapters/class-validator-adapter';

export class UpdateFinancialReleaseController implements Controller {
  constructor(private readonly updateFinancialRelease: UpdateFinancialRelease, private readonly validator: Validator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { data, errors } = adaptValidator(
        await this.validator.validate(UpdateFinancialReleaseDto, {
          ...httpRequest.body,
          ...httpRequest.params,
        })
      )();

      if (errors) {
        return badRequest(errors);
      }

      const financialRelease = await this.updateFinancialRelease.update(data);

      return ok(financialRelease);
    } catch (error) {
      return serverError();
    }
  }
}
