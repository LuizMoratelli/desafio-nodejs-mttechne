import { DbAddFinancialRelease } from '@/data/usecases/add-financial-release/db-add-financial-release';
import { FinancialReleaseMongoRepository } from '@/infra/db/mongodb/financial-release-repository/financial-release';
import { AddFinancialReleaseController } from '@/presentation/controllers/add-financial-release/add-financial-release';
import { DtoValidator } from '@/infra/validation/class-validator';

export const makeAddFinancialReleaseController = (): AddFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();
  const dtoValidator = new DtoValidator();

  const dbAddFinancialRelease = new DbAddFinancialRelease(financialReleaseMongoRepository);

  return new AddFinancialReleaseController(dbAddFinancialRelease, dtoValidator);
};
