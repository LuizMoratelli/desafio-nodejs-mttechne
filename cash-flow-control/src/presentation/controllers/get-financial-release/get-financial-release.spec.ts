import { FinancialReleaseModel, FinancialReleaseType } from '@/domain/models/financial-release';
import { GetFinancialRelease, GetFinancialReleaseModel } from '@/domain/usecases/get-financial-release';
import { ServerError } from '@/presentation/errors';
import { GetFinancialReleaseController } from './get-financial-release';
import { DtoValidator, Validator } from '@/infra/validation/class-validator';

type SutType = {
  sut: GetFinancialReleaseController;
  getFinancialRelease: GetFinancialRelease;
};

const makeSut = (): SutType => {
  const getFinancialRelease = makeGetFinancialRelease();
  const validator = makeValidator();
  const sut = new GetFinancialReleaseController(getFinancialRelease, validator);

  return {
    sut,
    getFinancialRelease,
  };
};

const makeGetFinancialRelease = (): GetFinancialRelease => {
  class GetFinancialReleaseStub implements GetFinancialRelease {
    async get(_: GetFinancialReleaseModel): Promise<FinancialReleaseModel> {
      const fakeFinancialRelease = {
        id: 'valid_id',
        description: 'valid_description',
        value: 100.0,
        type: FinancialReleaseType.ENTRADA,
        date: '2023-06-10',
      };

      return fakeFinancialRelease;
    }
  }

  return new GetFinancialReleaseStub();
};

const makeValidator = (): Validator => {
  return new DtoValidator();
};

describe('GetFinancialRelease Controller', () => {
  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toMatchObject({
      invalidParams: [
        {
          id: ['id should not be null or undefined', 'id must be a string'],
        },
      ],
    });
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'valid_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      description: 'valid_description',
      type: 'Entrada',
      date: '2023-06-10',
      value: 100.0,
    });
  });

  test('Should call GetFinancialRelease with correct values', async () => {
    const { sut, getFinancialRelease } = makeSut();
    const getSpy = jest.spyOn(getFinancialRelease, 'get');
    const httpRequest = {
      params: {
        id: 'valid_id',
      },
    };
    await sut.handle(httpRequest);
    expect(getSpy).toHaveBeenCalledWith({
      id: httpRequest.params.id,
    });
  });

  test('Should return 500 if GetFinancialRelease throws', async () => {
    const { sut, getFinancialRelease } = makeSut();
    jest.spyOn(getFinancialRelease, 'get').mockImplementationOnce(() => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 404 if GetFinancialRelease returns null', async () => {
    const { sut, getFinancialRelease } = makeSut();
    jest.spyOn(getFinancialRelease, 'get').mockImplementationOnce(async () => {
      return null;
    });

    const httpRequest = {
      params: {
        id: 'valid_id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toMatchObject({
      message: expect.stringMatching(`cannot be found`),
    });
  });
});
