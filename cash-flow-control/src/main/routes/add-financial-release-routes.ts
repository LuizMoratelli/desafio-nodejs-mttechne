import { Router } from 'express';

export default (router: Router): void => {
  router.post('/financial-release', (req, res) => {
    res.json({ ok: true });
  });
};
