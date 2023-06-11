import { DbGetFinancialRelease } from './db-get-financial-release';
import {
  GetFinancialReleaseModel,
  GetFinancialReleaseRepository,
  FinancialReleaseModel,
  FinancialReleaseType,
} from './db-get-financial-release.protocols';

type SutTypes = {
  sut: DbGetFinancialRelease;
  getFinancialReleaseRepository: GetFinancialReleaseRepository;
};

const makeSut = (): SutTypes => {
  const getFinancialReleaseRepository = makeGetFinancialReleaseRepository();
  const sut = new DbGetFinancialRelease(getFinancialReleaseRepository);

  return {
    sut,
    getFinancialReleaseRepository,
  };
};

const makeGetFinancialReleaseRepository = (): GetFinancialReleaseRepository => {
  class GetFinancialReleaseRepositoryStub implements GetFinancialReleaseRepository {
    async get(_: GetFinancialReleaseModel): Promise<FinancialReleaseModel> {
      const fakeFinancialRelease = {
        id: 'valid_id',
        description: 'valid_description',
        value: 100.0,
        type: FinancialReleaseType.ENTRADA,
        date: '2023-06-10',
      };
      return new Promise((resolve) => resolve(fakeFinancialRelease));
    }
  }
  return new GetFinancialReleaseRepositoryStub();
};

describe('DbGetFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const { sut } = makeSut();
    const financialReleaseData = {
      id: 'valid_id',
    };

    expect(sut.get(financialReleaseData)).resolves;
  });

  test('Should call GetFinancialReleaseRepository with correct values', async () => {
    const { sut, getFinancialReleaseRepository } = makeSut();
    const addSpy = jest.spyOn(getFinancialReleaseRepository, 'get');
    const data = {
      id: 'valid_id',
    };
    await sut.get(data);
    expect(addSpy).toHaveBeenCalledWith(data);
  });

  test('Should return an financial release on success', async () => {
    const { sut } = makeSut();
    const data = {
      id: 'valid_id',
    };
    const financialRelease = await sut.get(data);
    expect(financialRelease).toMatchObject({
      id: 'valid_id',
      description: 'valid_description',
      value: 100.0,
      type: FinancialReleaseType.ENTRADA,
      date: '2023-06-10',
    });
  });
});
