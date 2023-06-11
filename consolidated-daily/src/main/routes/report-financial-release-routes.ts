import { Router } from 'express';
import { makeReportFinancialReleaseController } from '@/main/factories/controllers';
import { adaptRoute } from '@/main/adapters/express-route-adapter';

export default (router: Router): void => {
  router.get('/report', adaptRoute(makeReportFinancialReleaseController()));
};
