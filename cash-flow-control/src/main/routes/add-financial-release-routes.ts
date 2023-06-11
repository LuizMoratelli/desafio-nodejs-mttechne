import { Router } from 'express';
import { makeAddFinancialReleaseController } from '@/main/factories/controllers';
import { adaptRoute } from '@/main/adapters/express-route-adapter';

export default (router: Router): void => {
  router.post('/financial-release', adaptRoute(makeAddFinancialReleaseController()));
};
