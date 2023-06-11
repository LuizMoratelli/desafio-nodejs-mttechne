import { DeleteFinancialRelease } from '@/domain/usecases/delete-financial-release';
import { badRequest, noContent, notFound, ok, serverError } from '@/presentation/helpers/http';
import { Controller, HttpRequest, HttpResponse } from './delete-financial-release.protocols';
import { DeleteFinancialReleaseDto } from '@/presentation/validation/delete-financial-release';
import { Validator } from '@/infra/validation/class-validator/validator';
import { adaptValidator } from '@/presentation/adapters/class-validator-adapter';

export class DeleteFinancialReleaseController implements Controller {
  constructor(private readonly deleteFinancialRelease: DeleteFinancialRelease, private readonly validator: Validator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { data, errors } = adaptValidator(
        await this.validator.validate(DeleteFinancialReleaseDto, httpRequest.params)
      )();

      if (errors) {
        return badRequest(errors);
      }

      await this.deleteFinancialRelease.delete(data);

      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}
