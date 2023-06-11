import { FinancialReleaseModel, FinancialReleaseType } from '@/domain/models/financial-release';
import { UpdateFinancialRelease, UpdateFinancialReleaseModel } from '@/domain/usecases/update-financial-release';
import { ServerError } from '@/presentation/errors';
import { UpdateFinancialReleaseController } from './update-financial-release';
import { DtoValidator, Validator } from '@/infra/validation/class-validator';

type SutType = {
  sut: UpdateFinancialReleaseController;
  updateFinancialRelease: UpdateFinancialRelease;
};

const makeSut = (): SutType => {
  const updateFinancialRelease = makeUpdateFinancialRelease();
  const validator = makeValidator();
  const sut = new UpdateFinancialReleaseController(updateFinancialRelease, validator);

  return {
    sut,
    updateFinancialRelease,
  };
};

const makeUpdateFinancialRelease = (): UpdateFinancialRelease => {
  class UpdateFinancialReleaseStub implements UpdateFinancialRelease {
    async update(_: UpdateFinancialReleaseModel): Promise<FinancialReleaseModel> {
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

  return new UpdateFinancialReleaseStub();
};

const makeValidator = (): Validator => {
  return new DtoValidator();
};

describe('UpdateFinancialRelease Controller', () => {
  test('Should return 400 if no value is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        id: 'valid_id',
        description: 'Venda',
        type: 'Entrada',
        date: '2023-06-10',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toMatchObject({
      invalidParams: [
        {
          value: [
            'value should not be null or undefined',
            'value must be a positive number',
            'value must be a number conforming to the specified constraints',
          ],
        },
      ],
    });
  });

  test('Should return 400 if no type is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        id: 'valid_id',
        description: 'Venda',
        value: 100.0,
        date: '2023-06-10',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toMatchObject({
      invalidParams: [
        {
          type: ['type should not be null or undefined', 'type must be one of the following values: Entrada, Saída'],
        },
      ],
    });
  });

  test('Should return 400 if no date is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        id: 'valid_id',
        description: 'Venda',
        type: 'Entrada',
        value: 100.0,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toMatchObject({
      invalidParams: [
        {
          date: ['date should not be null or undefined', 'date must be a valid ISO 8601 date string'],
        },
      ],
    });
  });

  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        description: 'Venda',
        type: 'Entrada',
        value: 100.0,
        date: '2023-06-10',
      },
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
      body: {
        id: 'valid_id',
        description: 'valid_description',
        type: 'Entrada',
        date: '2023-06-10',
        value: 100.0,
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

  test('Should call UpdateFinancialRelease with correct values', async () => {
    const { sut, updateFinancialRelease } = makeSut();
    const updateSpy = jest.spyOn(updateFinancialRelease, 'update');
    const httpRequest = {
      body: {
        id: 'valid_id',
        description: 'Venda',
        type: 'Entrada',
        date: '2023-06-10',
        value: 100.0,
      },
    };
    await sut.handle(httpRequest);
    expect(updateSpy).toHaveBeenCalledWith({
      id: httpRequest.body.id,
      description: httpRequest.body.description,
      type: httpRequest.body.type,
      date: httpRequest.body.date,
      value: httpRequest.body.value,
    });
  });

  test('Should return 500 if UpdateFinancialRelease throws', async () => {
    const { sut, updateFinancialRelease } = makeSut();
    jest.spyOn(updateFinancialRelease, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        id: 'valid_id',
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
});
