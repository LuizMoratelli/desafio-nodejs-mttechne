import { AddFinancialReleaseRepository } from '../../../../data/protocols/add-financial-release';
import { FinancialReleaseModel } from '../../../../domain/models/financial-release';
import { AddFinancialReleaseModel } from '../../../../domain/usecases/add-financial-release';
import { MongoHelper } from '../helpers/mongodb-helper';
import { ObjectId } from 'mongodb';

export class FinancialReleaseMongoRepository
  implements AddFinancialReleaseRepository
{
  async add(data: AddFinancialReleaseModel): Promise<FinancialReleaseModel> {
    const collection = MongoHelper.getCollection('financial-releases');

    const result = await collection.insertOne(data);

    const financialRelease = await collection.findOne<
      Omit<FinancialReleaseModel, 'id'> & { _id: ObjectId }
    >({ _id: result.insertedId });

    if (!financialRelease) throw new Error('Error while inserting');

    const { _id, ...financialReleaseWithoutId } = financialRelease;

    return {
      ...financialReleaseWithoutId,
      id: _id.toString(),
    };
  }
}
