import { DbUpdateFinancialRelease } from './db-update-financial-release';
import {
  UpdateFinancialReleaseModel,
  UpdateFinancialReleaseRepository,
  FinancialReleaseModel,
  FinancialReleaseType,
} from './db-update-financial-release.protocols';

type SutTypes = {
  sut: DbUpdateFinancialRelease;
  updateFinancialReleaseRepository: UpdateFinancialReleaseRepository;
};

const makeSut = (): SutTypes => {
  const updateFinancialReleaseRepository = makeUpdateFinancialReleaseRepository();
  const sut = new DbUpdateFinancialRelease(updateFinancialReleaseRepository);

  return {
    sut,
    updateFinancialReleaseRepository,
  };
};

const makeUpdateFinancialReleaseRepository = (): UpdateFinancialReleaseRepository => {
  class UpdateFinancialReleaseRepositoryStub implements UpdateFinancialReleaseRepository {
    async update(_: UpdateFinancialReleaseModel): Promise<FinancialReleaseModel> {
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
  return new UpdateFinancialReleaseRepositoryStub();
};

describe('DbUpdateFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const { sut } = makeSut();
    const financialReleaseData = {
      id: 'valid_id',
      description: 'valid_description',
      value: 100.0,
      type: FinancialReleaseType.ENTRADA,
      date: '2023-06-10',
    };

    expect(sut.update(financialReleaseData)).resolves;
  });

  test('Should call UpdateFinancialReleaseRepository with correct values', async () => {
    const { sut, updateFinancialReleaseRepository } = makeSut();
    const updateSpy = jest.spyOn(updateFinancialReleaseRepository, 'update');
    const data = {
      id: 'valid_id',
      description: 'valid_description',
      value: 100.0,
      type: FinancialReleaseType.ENTRADA,
      date: '2023-06-10',
    };
    await sut.update(data);
    expect(updateSpy).toHaveBeenCalledWith(data);
  });

  test('Should return an financial release on success', async () => {
    const { sut } = makeSut();
    const data = {
      id: 'valid_id',
      description: 'valid_description',
      value: 100.0,
      type: FinancialReleaseType.ENTRADA,
      date: '2023-06-10',
    };
    const financialRelease = await sut.update(data);
    expect(financialRelease).toEqual({ ...data, id: 'valid_id' });
  });
});
