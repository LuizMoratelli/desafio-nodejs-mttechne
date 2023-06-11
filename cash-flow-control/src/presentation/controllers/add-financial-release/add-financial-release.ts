import { AddFinancialRelease } from '@/domain/usecases/add-financial-release';
import { badRequest, ok, serverError } from '@/presentation/helpers/http';
import { Controller, HttpRequest, HttpResponse } from './add-financial-release.protocols';
import { AddFinancialReleaseDto } from '@/presentation/validation/add-financial-release';
import { Validator } from '@/infra/validation/class-validator/validator';
import { adaptValidator } from '@/presentation/adapters/class-validator-adapter';

export class AddFinancialReleaseController implements Controller {
  constructor(private readonly addFinancialRelease: AddFinancialRelease, private readonly validator: Validator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { data, errors } = adaptValidator(
        await this.validator.validate(AddFinancialReleaseDto, httpRequest.body)
      )();

      if (errors) {
        return badRequest(errors);
      }

      const financialRelease = await this.addFinancialRelease.add(data);

      return ok(financialRelease);
    } catch (error) {
      return serverError();
    }
  }
}
