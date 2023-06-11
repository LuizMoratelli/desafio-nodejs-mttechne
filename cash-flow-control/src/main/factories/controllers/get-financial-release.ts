import { DbGetFinancialRelease } from '@/data/usecases/get-financial-release/db-get-financial-release';
import { FinancialReleaseMongoRepository } from '@/infra/db/mongodb/financial-release-repository/financial-release';
import { GetFinancialReleaseController } from '@/presentation/controllers/get-financial-release/get-financial-release';
import { DtoValidator } from '@/infra/validation/class-validator';

export const makeGetFinancialReleaseController = (): GetFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();
  const dtoValidator = new DtoValidator();

  const dbAddFinancialRelease = new DbGetFinancialRelease(financialReleaseMongoRepository);

  return new GetFinancialReleaseController(dbAddFinancialRelease, dtoValidator);
};
