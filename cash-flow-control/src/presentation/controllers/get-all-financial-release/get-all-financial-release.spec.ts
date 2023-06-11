import { FinancialReleaseModel, FinancialReleaseType } from '@/domain/models/financial-release';
import { GetAllFinancialRelease } from '@/domain/usecases/get-all-financial-release';
import { ServerError } from '@/presentation/errors';
import { GetAllFinancialReleaseController } from './get-all-financial-release';
import { DtoValidator, Validator } from '@/infra/validation/class-validator';

type SutType = {
  sut: GetAllFinancialReleaseController;
  getAllFinancialRelease: GetAllFinancialRelease;
};

const makeSut = (): SutType => {
  const getAllFinancialRelease = makeGetAllFinancialRelease();
  const validator = makeValidator();
  const sut = new GetAllFinancialReleaseController(getAllFinancialRelease, validator);

  return {
    sut,
    getAllFinancialRelease,
  };
};

const makeGetAllFinancialRelease = (): GetAllFinancialRelease => {
  class GetAllFinancialReleaseStub implements GetAllFinancialRelease {
    async getAll(): Promise<FinancialReleaseModel[]> {
      const fakeFinancialRelease = {
        id: 'valid_id',
        description: 'valid_description',
        value: 100.0,
        type: FinancialReleaseType.ENTRADA,
        date: '2023-06-10',
      };

      return [fakeFinancialRelease];
    }
  }

  return new GetAllFinancialReleaseStub();
};

const makeValidator = (): Validator => {
  return new DtoValidator();
};

describe('GetAllFinancialRelease Controller', () => {
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'valid_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
      {
        id: 'valid_id',
        description: 'valid_description',
        type: 'Entrada',
        date: '2023-06-10',
        value: 100.0,
      },
    ]);
  });

  test('Should call GetAllFinancialRelease with correct values', async () => {
    const { sut, getAllFinancialRelease } = makeSut();
    const getSpy = jest.spyOn(getAllFinancialRelease, 'getAll');

    await sut.handle({});
    expect(getSpy).toHaveBeenCalled();
  });

  test('Should return 500 if GetAllFinancialRelease throws', async () => {
    const { sut, getAllFinancialRelease } = makeSut();
    jest.spyOn(getAllFinancialRelease, 'getAll').mockImplementationOnce(() => {
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

  test('Should return 404 if GetAllFinancialRelease returns null', async () => {
    const { sut, getAllFinancialRelease } = makeSut();
    jest.spyOn(getAllFinancialRelease, 'getAll').mockImplementationOnce(async () => {
      return [];
    });

    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([]);
  });
});
