import { Router } from 'express';
import { makeDeleteFinancialReleaseController } from '@/main/factories/controllers';
import { adaptRoute } from '@/main/adapters/express-route-adapter';

export default (router: Router): void => {
  router.delete('/financial-release/:id', adaptRoute(makeDeleteFinancialReleaseController()));
};
