import { Express, Router } from 'express';
import addFinancialReleaseRoutes from '@/main/routes/add-financial-release-routes';
import getFinancialReleaseRoutes from '@/main/routes/get-financial-release-routes';
import getAllFinancialReleaseRoutes from '@/main/routes/get-all-financial-release-routes';
import deleteFinancialReleaseRoutes from '@/main/routes/delete-financial-release-routes';
import updateFinancialReleaseRoutes from '@/main/routes/update-financial-release-routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  addFinancialReleaseRoutes(router);
  getFinancialReleaseRoutes(router);
  getAllFinancialReleaseRoutes(router);
  deleteFinancialReleaseRoutes(router);
  updateFinancialReleaseRoutes(router);
};
