import { ReportModel, FinancialReleaseType } from '@/domain/models/financial-release';
import { ReportFinancialRelease } from '@/domain/usecases/report-financial-release';
import { ServerError } from '@/presentation/errors';
import { ReportFinancialReleaseController } from './report-financial-release';

type SutType = {
  sut: ReportFinancialReleaseController;
  reportFinancialRelease: ReportFinancialRelease;
};

const makeSut = (): SutType => {
  const reportFinancialRelease = makeReportFinancialRelease();
  const sut = new ReportFinancialReleaseController(reportFinancialRelease);

  return {
    sut,
    reportFinancialRelease,
  };
};

const makeReportFinancialRelease = (): ReportFinancialRelease => {
  class ReportFinancialReleaseStub implements ReportFinancialRelease {
    async report(): Promise<ReportModel[]> {
      const fakeFinancialRelease = {
        day: 10,
        month: 6,
        year: 2023,
        total: 100.0,
      };

      return [fakeFinancialRelease];
    }
  }

  return new ReportFinancialReleaseStub();
};

describe('ReportFinancialRelease Controller', () => {
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
      {
        day: 10,
        month: 6,
        total: 100,
        year: 2023,
      },
    ]);
  });

  test('Should call ReportFinancialRelease with correct values', async () => {
    const { sut, reportFinancialRelease } = makeSut();
    const getSpy = jest.spyOn(reportFinancialRelease, 'report');

    await sut.handle({});
    expect(getSpy).toHaveBeenCalled();
  });

  test('Should return 500 if ReportFinancialRelease throws', async () => {
    const { sut, reportFinancialRelease } = makeSut();
    jest.spyOn(reportFinancialRelease, 'report').mockImplementationOnce(() => {
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

  test('Should return 404 if ReportFinancialRelease returns null', async () => {
    const { sut, reportFinancialRelease } = makeSut();
    jest.spyOn(reportFinancialRelease, 'report').mockImplementationOnce(async () => {
      return [];
    });

    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([]);
  });
});
