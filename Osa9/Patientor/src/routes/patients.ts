import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });
  res.json(newPatientEntry);
})

export default router;