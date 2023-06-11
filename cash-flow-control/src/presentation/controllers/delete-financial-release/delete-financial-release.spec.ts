import { DeleteFinancialReleaseModel } from '@/domain/usecases/delete-financial-release';
import { ServerError } from '@/presentation/errors';
import { DeleteFinancialReleaseController } from './delete-financial-release';
import { DtoValidator, Validator } from '@/infra/validation/class-validator';
import { DeleteFinancialRelease } from '@/domain/usecases/delete-financial-release';

type SutType = {
  sut: DeleteFinancialReleaseController;
  deleteFinancialRelease: DeleteFinancialRelease;
};

const makeSut = (): SutType => {
  const deleteFinancialRelease = makeDeleteFinancialRelease();
  const validator = makeValidator();
  const sut = new DeleteFinancialReleaseController(deleteFinancialRelease, validator);

  return {
    sut,
    deleteFinancialRelease,
  };
};

const makeDeleteFinancialRelease = (): DeleteFinancialRelease => {
  class DeleteFinancialReleaseStub implements DeleteFinancialRelease {
    async delete(_: DeleteFinancialReleaseModel): Promise<void> {}
  }

  return new DeleteFinancialReleaseStub();
};

const makeValidator = (): Validator => {
  return new DtoValidator();
};

describe('DeleteFinancialRelease Controller', () => {
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

  test('Should return 204 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'valid_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBeUndefined();
  });

  test('Should call DeleteFinancialRelease with correct values', async () => {
    const { sut, deleteFinancialRelease } = makeSut();
    const getSpy = jest.spyOn(deleteFinancialRelease, 'delete');
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

  test('Should return 500 if DeleteFinancialRelease throws', async () => {
    const { sut, deleteFinancialRelease } = makeSut();
    jest.spyOn(deleteFinancialRelease, 'delete').mockImplementationOnce(() => {
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

  test('Should return 204 if DeleteFinancialRelease does not throw', async () => {
    const { sut, deleteFinancialRelease } = makeSut();
    jest.spyOn(deleteFinancialRelease, 'delete').mockImplementationOnce(async () => {});

    const httpRequest = {
      params: {
        id: 'valid_id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBeUndefined();
  });
});
