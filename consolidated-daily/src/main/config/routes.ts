import { Express, Router } from 'express';
import reportFinancialReleaseRoutes from '@/main/routes/report-financial-release-routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  reportFinancialReleaseRoutes(router);
};
