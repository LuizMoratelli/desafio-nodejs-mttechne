import { ReportModel, FinancialReleaseType } from '@/domain/models/financial-release';
import { MongoID } from '../helpers/id';
import { MongoHelper } from '../helpers/mongodb-helper';
import { ReportFinancialRelease } from '@/domain/usecases/report-financial-release';

export class FinancialReleaseMongoRepository implements ReportFinancialRelease {
  private getCollection = async () => {
    const collection = await MongoHelper.getCollection('financial-releases');

    return collection;
  };

  async report(): Promise<ReportModel[]> {
    const collection = await this.getCollection();
    const all = [] as ReportModel[];

    const financialReleasesCursor = collection.aggregate<MongoID<ReportModel>>([
      {
        $project: {
          convertedDate: { $dateFromString: { dateString: '$date', format: '%Y-%m-%d' } },
          value: {
            $cond: {
              if: { $eq: ['$type', FinancialReleaseType.ENTRADA] },
              then: '$value',
              else: { $multiply: ['$value', -1] },
            },
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$convertedDate' },
            month: { $month: '$convertedDate' },
            year: { $year: '$convertedDate' },
          },
          total: {
            $sum: '$value',
          },
        },
      },
      {
        $project: {
          _id: 0,
          day: '$_id.day',
          month: '$_id.month',
          year: '$_id.year',
          total: '$total',
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
          day: 1,
        },
      },
      {
        $project: {
          date: {
            $dateToString: {
              date: { $dateFromParts: { year: '$year', month: '$month', day: '$day' } },
              format: '%Y-%m-%d',
            },
          },
          total: '$total',
        },
      },
    ]);

    while (await financialReleasesCursor.hasNext()) {
      const nextItem = await financialReleasesCursor.next();

      if (nextItem) {
        all.push(nextItem);
      }
    }

    return all;
  }
}
