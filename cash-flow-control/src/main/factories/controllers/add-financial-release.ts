import { DbAddFinancialRelease } from '../../../data/usecases/add-financial-release/db-add-financial-release';
import { FinancialReleaseMongoRepository } from '../../../infra/db/mongodb/financial-release-repository/financial-release';
import { AddFinancialReleaseController } from '../../../presentation/controllers/add-financial-release/add-financial-release';

export const makeAddFinancialReleaseController = (): AddFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();

  const dbAddFinancialRelease = new DbAddFinancialRelease(financialReleaseMongoRepository);

  return new AddFinancialReleaseController(dbAddFinancialRelease);
};
