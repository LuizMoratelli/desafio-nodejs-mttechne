import { MissingParamError } from '../../errors/missing-param';
import { badRequest } from '../../helpers/http';
import { HttpRequest, HttpResponse } from './add-financial-release.protocols';

export class AddFinancialReleaseController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['value', 'type', 'date'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(`Missing param: ${field}`));
      }
    }

    return { statusCode: 200, body: {} };
  }
}
