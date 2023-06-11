import { DbGetAllFinancialRelease } from '@/data/usecases/get-all-financial-release/db-get-all-financial-release';
import { FinancialReleaseMongoRepository } from '@/infra/db/mongodb/financial-release-repository/financial-release';
import { GetAllFinancialReleaseController } from '@/presentation/controllers/get-all-financial-release/get-all-financial-release';
import { DtoValidator } from '@/infra/validation/class-validator';

export const makeGetAllFinancialReleaseController = (): GetAllFinancialReleaseController => {
  const financialReleaseMongoRepository = new FinancialReleaseMongoRepository();
  const dtoValidator = new DtoValidator();

  const dbAddFinancialRelease = new DbGetAllFinancialRelease(financialReleaseMongoRepository);

  return new GetAllFinancialReleaseController(dbAddFinancialRelease, dtoValidator);
};
