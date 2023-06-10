import { Express, Router } from 'express';
import addFinancialReleaseRoutes from '../routes/add-financial-release-routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  addFinancialReleaseRoutes(router);
};
