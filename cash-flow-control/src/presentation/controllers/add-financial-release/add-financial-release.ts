import { HttpRequest, HttpResponse } from './add-financial-release.protocols';

export class AddFinancialReleaseController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const { value, type, date } = httpRequest.body;

    if (!value) {
      return {
        statusCode: 400,
        body: new Error('Missing param: value'),
      };
    }

    if (!type) {
      return {
        statusCode: 400,
        body: new Error('Missing param: type'),
      };
    }

    if (!date) {
      return {
        statusCode: 400,
        body: new Error('Missing param: date'),
      };
    }

    return { statusCode: 200, body: {} };
  }
}
