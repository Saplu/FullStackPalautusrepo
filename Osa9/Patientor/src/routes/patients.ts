import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

export default router;