import { AddFinancialRelease } from '../../../domain/usecases/add-financial-release';
import { MissingParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './add-financial-release.protocols';

export class AddFinancialReleaseController implements Controller {
  constructor(private readonly addFinancialRelease: AddFinancialRelease) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['value', 'type', 'date'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(`Missing param: ${field}`));
        }
      }

      const { value, type, date, description } = httpRequest.body;

      const financialRelease = await this.addFinancialRelease.add({
        value,
        type,
        date,
        description,
      });

      return ok(financialRelease);
    } catch (error) {
      return serverError();
    }
  }
}
