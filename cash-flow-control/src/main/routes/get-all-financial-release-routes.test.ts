import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper';

describe('GetAllFinancialRelease Routes', () => {
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

  test('Should return 200 if there are no releases', async () => {
    await request(app).get('/api/financial-release').expect(200);
  });

  test('Should return 200 if there are releases', async () => {
    await request(app).post('/api/financial-release').send({
      description: 'Venda',
      type: 'Entrada',
      value: 100.0,
      date: '2023-06-10',
    });

    await request(app).get(`/api/financial-release`).expect(200);
  });
});
