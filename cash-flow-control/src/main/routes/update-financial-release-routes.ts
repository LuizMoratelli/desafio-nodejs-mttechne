import { Router } from 'express';
import { makeUpdateFinancialReleaseController } from '@/main/factories/controllers';
import { adaptRoute } from '@/main/adapters/express-route-adapter';

export default (router: Router): void => {
  router.put('/financial-release/:id', adaptRoute(makeUpdateFinancialReleaseController()));
};
