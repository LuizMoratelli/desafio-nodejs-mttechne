import { AddFinancialReleaseController } from './add-financial-release';

describe('AddFinancialRelease Controller', () => {
  test('Should return 400 if no value is provided', () => {
    const sut = new AddFinancialReleaseController();
    const httpRequest = {
      body: {
        description: 'Venda',
        type: 'Entrada',
        date: '2023-06-10',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: value'));
  });
});
