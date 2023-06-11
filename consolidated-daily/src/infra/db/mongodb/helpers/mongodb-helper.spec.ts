import { MongoHelper as sut } from './mongodb-helper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let financialReleaseCollection = await sut.getCollection('financial-releases');
    expect(financialReleaseCollection).toBeTruthy();

    await sut.disconnect();

    financialReleaseCollection = await sut.getCollection('financial-releases');
    expect(financialReleaseCollection).toBeTruthy();
  });
});
