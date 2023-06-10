import { MongoHelper } from '../helpers/mongodb-helper';
import { FinancialReleaseMongoRepository } from './financial-release';
import { Collection, Document } from 'mongodb';

describe('FinancialRelease Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return an financialRelease on success', async () => {
    const sut = new FinancialReleaseMongoRepository();
    const financialRelease = await sut.add({
      date: '2023-06-10',
      description: 'valid_description',
      type: 'Entrada',
      value: 100.0,
    });
    expect(financialRelease).toBeTruthy();
    expect(financialRelease.id).toBeTruthy();
    expect(financialRelease.date).toBe('2023-06-10');
    expect(financialRelease.description).toBe('valid_description');
    expect(financialRelease.type).toBe('Entrada');
    expect(financialRelease.value).toBe(100.0);
  });
});
