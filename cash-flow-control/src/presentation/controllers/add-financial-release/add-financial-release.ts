export class AddFinancialReleaseController {
  handle(httpRequest: any): any {
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
  }
}
