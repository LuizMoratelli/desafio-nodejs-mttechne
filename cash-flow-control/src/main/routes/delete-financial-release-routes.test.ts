import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper';

describe('GetFinancialRelease Routes', () => {
  beforeEach(async () => {
    const financialReleaseCollection = await MongoHelper.getCollection('financial-releases');
    await financialReleaseCollection.deleteMany({});
  });

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 204 if does not exist', async () => {
    await request(app).delete('/api/financial-release/6485f4f0bbd5f17ad0e52017').expect(204);
  });

  test('Should return 204 if deleted', async () => {
    const response = await request(app).post('/api/financial-release').send({
      description: 'Venda',
      type: 'Entrada',
      value: 100.0,
      date: '2023-06-10',
    });

    await request(app).delete(`/api/financial-release/${response.body.id}`).expect(204);
  });
});
