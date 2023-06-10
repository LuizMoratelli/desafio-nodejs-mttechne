import { MissingParamError } from '../../errors/missing-param';
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
    expect(httpResponse.body).toEqual(
      new MissingParamError('Missing param: value')
    );
  });

  test('Should return 400 if no type is provided', () => {
    const sut = new AddFinancialReleaseController();
    const httpRequest = {
      body: {
        description: 'Venda',
        value: 100.0,
        date: '2023-06-10',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('Missing param: type')
    );
  });

  test('Should return 400 if no date is provided', () => {
    const sut = new AddFinancialReleaseController();
    const httpRequest = {
      body: {
        description: 'Venda',
        type: 'Entrada',
        value: 100.0,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('Missing param: date')
    );
  });

  test('Should return 200 if valid data is provided', () => {
    const sut = new AddFinancialReleaseController();
    const httpRequest = {
      body: {
        description: 'Venda',
        type: 'Entrada',
        date: '2023-06-10',
        value: 100.0,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({});
  });
});
