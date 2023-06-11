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

    financialReleaseCollection.insertMany([
      {
        date: '2023-06-10',
        description: 'valid_description',
        type: FinancialReleaseType.ENTRADA,
        value: 100.0,
      },
      {
        date: '2023-06-11',
        description: 'valid_description',
        type: FinancialReleaseType.ENTRADA,
        value: 50.0,
      },
      {
        date: '2023-06-10',
        description: 'valid_description',
        type: FinancialReleaseType.SAIDA,
        value: 25.0,
      },
      {
        date: '2023-06-11',
        description: 'valid_description',
        type: FinancialReleaseType.SAIDA,
        value: 22.5,
      },
    ]);
  });

  test('Should return an financialRelease on report', async () => {
    const sut = new FinancialReleaseMongoRepository();

    const financialRelease = await sut.report();

    expect(financialRelease).toBeDefined();
    expect(financialRelease).toHaveLength(2);
    expect(financialRelease[0]).toMatchObject({
      day: 10,
      month: 6,
      year: 2023,
      total: 75,
    });
    expect(financialRelease[1]).toMatchObject({
      day: 11,
      month: 6,
      year: 2023,
      total: 27.5,
    });
  });
});
