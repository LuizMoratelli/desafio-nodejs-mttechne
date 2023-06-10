import { DbAddFinancialRelease } from './db-add-financial-release';
import {
  AddFinancialReleaseModel,
  AddFinancialReleaseRepository,
  FinancialReleaseModel,
  FinancialReleaseType,
} from './db-add-financial-release.protocols';

interface SutTypes {
  sut: DbAddFinancialRelease;
  addFinancialReleaseRepository: AddFinancialReleaseRepository;
}

const makeSut = (): SutTypes => {
  const addFinancialReleaseRepository = makeAddFinancialReleaseRepository();
  const sut = new DbAddFinancialRelease(addFinancialReleaseRepository);

  return {
    sut,
    addFinancialReleaseRepository,
  };
};

const makeAddFinancialReleaseRepository = (): AddFinancialReleaseRepository => {
  class AddFinancialReleaseRepositoryStub
    implements AddFinancialReleaseRepository
  {
    async add(_: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
      const fakeFinancialRelease = {
        id: 'valid_id',
        description: 'valid_description',
        value: 100.0,
        type: 'Entrada' as FinancialReleaseType,
        date: '2023-06-10',
      };
      return new Promise((resolve) => resolve(fakeFinancialRelease));
    }
  }
  return new AddFinancialReleaseRepositoryStub();
};

describe('DbAddFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const { sut } = makeSut();
    const financialReleaseData = {
      description: 'valid_description',
      value: 100.0,
      type: 'Entrada' as FinancialReleaseType,
      date: '2023-06-10',
    };

    expect(sut.add(financialReleaseData)).resolves;
  });

  test('Should call AddFinancialReleaseRepository with correct values', async () => {
    const { sut, addFinancialReleaseRepository } = makeSut();
    const addSpy = jest.spyOn(addFinancialReleaseRepository, 'add');
    const data = {
      description: 'valid_description',
      value: 100.0,
      type: 'Entrada' as FinancialReleaseType,
      date: '2023-06-10',
    };
    await sut.add(data);
    expect(addSpy).toHaveBeenCalledWith(data);
  });

  test('Should return an financial release on success', async () => {
    const { sut } = makeSut();
    const data = {
      description: 'valid_description',
      value: 100.0,
      type: 'Entrada' as FinancialReleaseType,
      date: '2023-06-10',
    };
    const financialRelease = await sut.add(data);
    expect(financialRelease).toEqual({ ...data, id: 'valid_id' });
  });
});
