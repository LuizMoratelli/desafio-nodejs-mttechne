import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongodb-helper';

describe('AddFinancialRelease Routes', () => {
  beforeEach(async () => {
    const financialReleaseCollection = await MongoHelper.getCollection(
      'financial-releases'
    );
    await financialReleaseCollection.deleteMany({});
  });

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return an financial release on success', async () => {
    await request(app)
      .post('/api/financial-release')
      .send({
        description: 'Venda',
        type: 'Entrada',
        value: 100.0,
        date: '2023-06-10',
      })
      .expect(200);
  });
});
