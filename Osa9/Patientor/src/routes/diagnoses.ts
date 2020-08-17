import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnoseService.getEntries();
  res.json(data);
});

export default router;