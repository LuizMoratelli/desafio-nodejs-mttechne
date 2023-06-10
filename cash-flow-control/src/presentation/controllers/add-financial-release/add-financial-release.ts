import { MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './add-financial-release.protocols';

export class AddFinancialReleaseController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['value', 'type', 'date'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(`Missing param: ${field}`));
        }
      }

      return { statusCode: 200, body: {} };
    } catch (error) {
      return serverError();
    }
  }
}
