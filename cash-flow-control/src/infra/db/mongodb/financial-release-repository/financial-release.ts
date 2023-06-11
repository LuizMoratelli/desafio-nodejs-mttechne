import { AddFinancialReleaseRepository } from '@/data/protocols/add-financial-release';
import { FinancialReleaseModel } from '@/domain/models/financial-release';
import { AddFinancialReleaseModel } from '@/domain/usecases/add-financial-release';
import { MongoID } from '../helpers/id';
import { MongoHelper } from '../helpers/mongodb-helper';
import { GetFinancialReleaseModel } from '@/domain/usecases/get-financial-release';
import { ObjectId } from 'mongodb';
import { GetFinancialReleaseRepository } from '@/data/protocols/get-financial-release';

export class FinancialReleaseMongoRepository implements AddFinancialReleaseRepository, GetFinancialReleaseRepository {
  private getCollection = async () => {
    const collection = await MongoHelper.getCollection('financial-releases');

    return collection;
  };

  async add(data: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
    const collection = await this.getCollection();

    const result = await collection.insertOne(data);

    const financialRelease = await collection.findOne<MongoID<FinancialReleaseModel>>({ _id: result.insertedId });

    return MongoHelper.map<FinancialReleaseModel>(financialRelease);
  }

  async get({ id }: GetFinancialReleaseModel): Promise<FinancialReleaseModel | null> {
    const collection = await this.getCollection();

    const financialRelease = await collection.findOne<MongoID<FinancialReleaseModel>>({ _id: new ObjectId(id) });

    return financialRelease && MongoHelper.map<FinancialReleaseModel>(financialRelease);
  }
}
