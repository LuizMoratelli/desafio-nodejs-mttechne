import { DbDeleteFinancialRelease } from './db-delete-financial-release';
import {
  DeleteFinancialReleaseModel,
  DeleteFinancialReleaseRepository,
  FinancialReleaseType,
} from './db-delete-financial-release.protocols';

type SutTypes = {
  sut: DbDeleteFinancialRelease;
  deleteFinancialReleaseRepository: DeleteFinancialReleaseRepository;
};

const makeSut = (): SutTypes => {
  const deleteFinancialReleaseRepository = makeDeleteFinancialReleaseRepository();
  const sut = new DbDeleteFinancialRelease(deleteFinancialReleaseRepository);

  return {
    sut,
    deleteFinancialReleaseRepository,
  };
};

const makeDeleteFinancialReleaseRepository = (): DeleteFinancialReleaseRepository => {
  class DeleteFinancialReleaseRepositoryStub implements DeleteFinancialReleaseRepository {
    async delete(_: DeleteFinancialReleaseModel): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new DeleteFinancialReleaseRepositoryStub();
};

describe('DbDeleteFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const { sut } = makeSut();
    const financialReleaseData = {
      id: 'valid_id',
    };

    expect(sut.delete(financialReleaseData)).resolves;
  });

  test('Should call DeleteFinancialReleaseRepository with correct values', async () => {
    const { sut, deleteFinancialReleaseRepository } = makeSut();
    const addSpy = jest.spyOn(deleteFinancialReleaseRepository, 'delete');
    const data = {
      id: 'valid_id',
    };
    await sut.delete(data);
    expect(addSpy).toHaveBeenCalledWith(data);
  });

  test('Should return an financial release on success', async () => {
    const { sut } = makeSut();
    const data = {
      id: 'valid_id',
    };
    const financialRelease = await sut.delete(data);
    expect(financialRelease).toBeUndefined();
  });
});
