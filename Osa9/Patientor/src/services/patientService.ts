import patientData from '../../data/patients.json';

import { Patient, PublicPatient, NewPatientEntry } from '../types';
import { Guid } from 'guid-typescript';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientEntry = (id: string): Patient | undefined => {
  console.log(patients.find(p => p.id === id));
  return patients.find(p => p.id === id);
}

const addPatient = ( entry: NewPatientEntry) : Patient => {
  const newPatientEntry = {
    id: Guid.create().toString(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientEntry
};