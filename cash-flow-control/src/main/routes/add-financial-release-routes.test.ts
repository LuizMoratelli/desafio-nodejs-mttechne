import request from 'supertest';
import app from '../config/app';

describe('AddFinancialRelease Routes', () => {
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
