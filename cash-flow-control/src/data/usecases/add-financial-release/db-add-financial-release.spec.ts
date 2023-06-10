import { FinancialReleaseType } from '../../../domain/models/financial-release-type';
import { DbAddFinancialRelease } from './db-add-financial-release';

const makeSut = (): DbAddFinancialRelease => {
  return new DbAddFinancialRelease();
};

describe('DbAddFinancialRelease Usecase', () => {
  test('Should resolves', async () => {
    const sut = makeSut();
    const financialReleaseData = {
      description: 'valid_description',
      value: 100.0,
      type: 'Entrada' as FinancialReleaseType,
      date: '2023-06-10',
    };

    expect(sut.add(financialReleaseData)).resolves;
  });
});
