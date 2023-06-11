import { DbDeleteFinancialRelease } from '@/data/usecases/delete-financial-release/db-delete-financial-release';
import { FinancialReleaseMongoRepository } from '@/infra/db/mongodb/financial-release-repository/financial-release';
import { DeleteFinancialReleaseController } from '@/presentation/controllers/delete-financial-release/delete-financial-release';
import { DtoValidator } from '@/infra/validation/class-validator';

export const makeDeleteFinancialReleaseController = (): DeleteFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();
  const dtoValidator = new DtoValidator();

  const dbAddFinancialRelease = new DbDeleteFinancialRelease(financialReleaseMongoRepository);

  return new DeleteFinancialReleaseController(dbAddFinancialRelease, dtoValidator);
};
