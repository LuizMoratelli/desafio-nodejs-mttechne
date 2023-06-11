import { Router } from 'express';
import { makeGetFinancialReleaseController } from '@/main/factories/controllers';
import { adaptRoute } from '@/main/adapters/express-route-adapter';

export default (router: Router): void => {
  router.get('/financial-release/:id', adaptRoute(makeGetFinancialReleaseController()));
};
