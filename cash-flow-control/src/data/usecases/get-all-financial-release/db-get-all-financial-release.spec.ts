import { DbGetAllFinancialRelease } from './db-get-all-financial-release';
import {
  GetAllFinancialReleaseRepository,
  FinancialReleaseModel,
  FinancialReleaseType,
} from './db-get-all-financial-release.protocols';

type SutTypes = {
  sut: DbGetAllFinancialRelease;
  addFinancialReleaseRepository: GetAllFinancialReleaseRepository;
};

const makeSut = (): SutTypes => {
  const addFinancialReleaseRepository = makeGetAllFinancialReleaseRepository();
  const sut = new DbGetAllFinancialRelease(addFinancialReleaseRepository);

  return {
    sut,
    addFinancialReleaseRepository,
  };
};

const makeGetAllFinancialReleaseRepository = (): GetAllFinancialReleaseRepository => {
  class GetAllFinancialReleaseRepositoryStub implements GetAllFinancialReleaseRepository {
    async getAll(): Promise<FinancialReleaseModel[]> {
      const fakeFinancialRelease = {
        id: 'valid_id',
        description: 'valid_description',
        value: 100.0,
        type: FinancialReleaseType.ENTRADA,
        date: '2023-06-10',
      };
      return new Promise((resolve) => resolve([fakeFinancialRelease]));
    }
  }
  return new GetAllFinancialReleaseRepositoryStub();
};

describe('DbGetAllFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const { sut } = makeSut();

    expect(sut.getAll()).resolves;
  });

  test('Should call GetAllFinancialReleaseRepository with correct values', async () => {
    const { sut, addFinancialReleaseRepository } = makeSut();
    const addSpy = jest.spyOn(addFinancialReleaseRepository, 'getAll');
    await sut.getAll();
    expect(addSpy).toHaveBeenCalledWith();
  });

  test('Should return an financial release on success', async () => {
    const { sut } = makeSut();
    const data = {
      id: 'valid_id',
    };
    const financialRelease = await sut.getAll();
    expect(financialRelease).toHaveLength(1);
    expect(financialRelease[0]).toMatchObject({
      id: 'valid_id',
      description: 'valid_description',
      value: 100.0,
      type: FinancialReleaseType.ENTRADA,
      date: '2023-06-10',
    });
  });
});
