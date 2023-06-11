import { DbUpdateFinancialRelease } from '@/data/usecases/update-financial-release/db-update-financial-release';
import { FinancialReleaseMongoRepository } from '@/infra/db/mongodb/financial-release-repository/financial-release';
import { UpdateFinancialReleaseController } from '@/presentation/controllers/update-financial-release/update-financial-release';
import { DtoValidator } from '@/infra/validation/class-validator';

export const makeUpdateFinancialReleaseController = (): UpdateFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();
  const dtoValidator = new DtoValidator();

  const dbUpdateFinancialRelease = new DbUpdateFinancialRelease(financialReleaseMongoRepository);

  return new UpdateFinancialReleaseController(dbUpdateFinancialRelease, dtoValidator);
};
