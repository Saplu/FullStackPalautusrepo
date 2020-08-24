import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry  } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const data = patientService.getPatientEntry(req.params.id);
  if (!data){
    res.status(404).send("Patient was not found");
  } else res.json(data);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch(e){
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const addedEntry = patientService.addEntryToPatient(req.body, req.params.id);
    console.log(addedEntry);
    res.json(addedEntry);
  } catch(e){
    res.status(400).send(e.message);
  }
});

export default router;