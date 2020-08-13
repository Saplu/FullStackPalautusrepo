import patientData from '../../data/patients.json';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { Guid } from 'guid-typescript';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry) : PatientEntry => {
  const newPatientEntry = {
    id: Guid.create().toString(),
    ...entry
  };
  patients.push(newPatientEntry);
  console.log(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};