import { AddFinancialReleaseRepository } from '@/data/protocols/add-financial-release';
import { FinancialReleaseModel } from '@/domain/models/financial-release';
import { AddFinancialReleaseModel } from '@/domain/usecases/add-financial-release';
import { MongoID } from '../helpers/id';
import { MongoHelper } from '../helpers/mongodb-helper';

export class FinancialReleaseMongoRepository implements AddFinancialReleaseRepository {
  async add(data: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
    const collection = await MongoHelper.getCollection('financial-releases');

    const result = await collection.insertOne(data);

    const financialRelease = await collection.findOne<MongoID<FinancialReleaseModel>>({ _id: result.insertedId });

    return MongoHelper.map<FinancialReleaseModel>(financialRelease);
  }
}
