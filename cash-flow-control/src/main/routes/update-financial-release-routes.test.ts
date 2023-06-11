import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongodb-helper';

describe('UpdateFinancialRelease Routes', () => {
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

  test('Should return an financial release on success', async () => {
    const createdRelease = await request(app)
      .post('/api/financial-release')
      .send({
        description: 'Venda',
        type: 'Entrada',
        value: 100.0,
        date: '2023-06-10',
      })
      .expect(200);

    const response = await request(app)
      .put(`/api/financial-release/${createdRelease.body.id}`)
      .send({
        description: 'Venda atualizada',
        type: 'Saída',
        value: 120.0,
        date: '2023-06-11',
      })
      .expect(200);

    expect(response.body).toMatchObject({
      id: createdRelease.body.id,
      description: 'Venda atualizada',
      type: 'Saída',
      value: 120.0,
      date: '2023-06-11',
    });
  });
});
