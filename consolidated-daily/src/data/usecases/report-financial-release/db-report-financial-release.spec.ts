import { DbReportFinancialRelease } from './db-report-financial-release';
import {
  ReportFinancialReleaseRepository,
  ReportModel,
  FinancialReleaseType,
} from './db-report-financial-release.protocols';

type SutTypes = {
  sut: DbReportFinancialRelease;
  reportFinancialReleaseRepository: ReportFinancialReleaseRepository;
};

const makeSut = (): SutTypes => {
  const reportFinancialReleaseRepository = makeReportFinancialReleaseRepository();
  const sut = new DbReportFinancialRelease(reportFinancialReleaseRepository);

  return {
    sut,
    reportFinancialReleaseRepository,
  };
};

const makeReportFinancialReleaseRepository = (): ReportFinancialReleaseRepository => {
  class ReportFinancialReleaseRepositoryStub implements ReportFinancialReleaseRepository {
    async report(): Promise<ReportModel[]> {
      const fakeFinancialRelease = {
        date: '2023-06-10',
        total: 100,
      };
      return new Promise((resolve) => resolve([fakeFinancialRelease]));
    }
  }
  return new ReportFinancialReleaseRepositoryStub();
};

describe('DbReportFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const { sut } = makeSut();

    expect(sut.report()).resolves;
  });

  test('Should call ReportFinancialReleaseRepository with correct values', async () => {
    const { sut, reportFinancialReleaseRepository } = makeSut();
    const addSpy = jest.spyOn(reportFinancialReleaseRepository, 'report');
    await sut.report();
    expect(addSpy).toHaveBeenCalledWith();
  });

  test('Should return an financial release on success', async () => {
    const { sut } = makeSut();
    const financialRelease = await sut.report();
    expect(financialRelease).toHaveLength(1);
    expect(financialRelease[0]).toMatchObject({
      date: '2023-06-10',
      total: 100,
    });
  });
});
