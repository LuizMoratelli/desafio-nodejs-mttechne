import { FinancialReleaseModel } from '../../../domain/models/financial-release';
import { FinancialReleaseType } from '../../../domain/models/financial-release-type';
import {
  AddFinancialRelease,
  AddFinancialReleaseModel,
} from '../../../domain/usecases/add-financial-release';
import { MissingParamError, ServerError } from '../../errors';
import { AddFinancialReleaseController } from './add-financial-release';

interface SutType {
  sut: AddFinancialReleaseController;
  addFinancialRelease: AddFinancialRelease;
}

const makeSut = (): SutType => {
  const addFinancialRelease = makeAddFinancialRelease();
  const sut = new AddFinancialReleaseController(addFinancialRelease);

  return {
    sut,
    addFinancialRelease,
  };
};

const makeAddFinancialRelease = (): AddFinancialRelease => {
  class AddFinancialReleaseStub implements AddFinancialRelease {
    add(_: AddFinancialReleaseModel): FinancialReleaseModel {
      const fakeFinancialRelease = {
        id: 'valid_id',
        description: 'valid_description',
        value: 100.0,
        type: 'Entrada' as FinancialReleaseType,
        date: '2023-06-10',
      };

      return fakeFinancialRelease;
    }
  }

  return new AddFinancialReleaseStub();
};

describe('AddFinancialRelease Controller', () => {
  test('Should return 400 if no value is provided', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  test('Should call AddFinancialRelease with correct values', () => {
    const { sut, addFinancialRelease } = makeSut();
    const addSpy = jest.spyOn(addFinancialRelease, 'add');
    const httpRequest = {
      body: {
        description: 'Venda',
        type: 'Entrada',
        date: '2023-06-10',
        value: 100.0,
      },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      description: httpRequest.body.description,
      type: httpRequest.body.type,
      date: httpRequest.body.date,
      value: httpRequest.body.value,
    });
  });

  test('Should return 500 if AddFinancialRelease throws', () => {
    const { sut, addFinancialRelease } = makeSut();
    jest.spyOn(addFinancialRelease, 'add').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        description: 'Venda',
        type: 'Entrada',
        date: '2023-06-10',
        value: 100.0,
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
