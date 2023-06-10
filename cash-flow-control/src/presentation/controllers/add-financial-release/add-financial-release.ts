import { MissingParamError } from '../../errors/missing-param';
import { badRequest } from '../../helpers/http';
import { HttpRequest, HttpResponse } from './add-financial-release.protocols';

export class AddFinancialReleaseController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const { value, type, date } = httpRequest.body;

    if (!value) {
      return badRequest(new MissingParamError('Missing param: value'));
    }

    if (!type) {
      return badRequest(new MissingParamError('Missing param: type'));
    }

    if (!date) {
      return badRequest(new MissingParamError('Missing param: date'));
    }

    return { statusCode: 200, body: {} };
  }
}
