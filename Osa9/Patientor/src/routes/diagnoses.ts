import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('diagnoses here');
  const data = diagnoseService.getEntries();
  console.log(data);
  res.json(data);
})

export default router;