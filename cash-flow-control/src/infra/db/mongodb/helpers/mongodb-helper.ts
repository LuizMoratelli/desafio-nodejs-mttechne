import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
    this.uri = uri;
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }

    return this.client.db().collection(name);
  },

  map<T>(data: any): T {
    const { _id, ...dataWithoutId } = data;

    return {
      ...dataWithoutId,
      id: _id.toString(),
    };
  },
};
