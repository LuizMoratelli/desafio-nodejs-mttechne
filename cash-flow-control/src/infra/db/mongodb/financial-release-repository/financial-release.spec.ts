import { FinancialReleaseType } from '@/domain/models/financial-release';
import { MongoHelper } from '../helpers/mongodb-helper';
import { FinancialReleaseMongoRepository } from './financial-release';

describe('FinancialRelease Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const financialReleaseCollection = await MongoHelper.getCollection('financial-releases');
    await financialReleaseCollection.deleteMany({});
  });

  test('Should return an financialRelease on add', async () => {
    const sut = new FinancialReleaseMongoRepository();
    const financialRelease = await sut.add({
      date: '2023-06-10',
      description: 'valid_description',
      type: FinancialReleaseType.ENTRADA,
      value: 100.0,
    });
    expect(financialRelease).toBeTruthy();
    expect(financialRelease.id).toBeTruthy();
    expect(financialRelease.date).toBe('2023-06-10');
    expect(financialRelease.description).toBe('valid_description');
    expect(financialRelease.type).toBe(FinancialReleaseType.ENTRADA);
    expect(financialRelease.value).toBe(100.0);
  });

  test('Should return an financialRelease on get', async () => {
    const sut = new FinancialReleaseMongoRepository();

    const createdFinancialRelease = await sut.add({
      date: '2023-06-10',
      description: 'valid_description',
      type: FinancialReleaseType.ENTRADA,
      value: 100.0,
    });

    const financialRelease = await sut.get({
      id: createdFinancialRelease.id,
    });

    expect(financialRelease).toBeTruthy();
    expect(financialRelease.id).toBeTruthy();
    expect(financialRelease.date).toBe('2023-06-10');
    expect(financialRelease.description).toBe('valid_description');
    expect(financialRelease.type).toBe(FinancialReleaseType.ENTRADA);
    expect(financialRelease.value).toBe(100.0);
  });
});
