import { Router } from 'express';
import { makeAddFinancialReleaseController } from '../factories/controllers';
import { adaptRoute } from '../adapters/express-route-adapter';

export default (router: Router): void => {
  router.post('/financial-release', adaptRoute(makeAddFinancialReleaseController()));
};
