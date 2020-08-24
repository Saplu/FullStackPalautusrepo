import patientData from '../../data/patients';

import { Patient, PublicPatient, NewPatientEntry, Entry } from '../types';
import { Guid } from 'guid-typescript';
import { checkEntry } from '../utils';

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

const addEntryToPatient = ( entry: Entry, id: string) : Entry | undefined => {
  const patient = patients.find(p => p.id === id);
  if (!patient){
    throw new Error('Patient not found');
  };
  let newEntry : Entry;
  switch( entry.type ) {
    case "HealthCheck":
      newEntry = {
        type: "HealthCheck",
        description: entry.description,
        healthCheckRating: entry.healthCheckRating,
        id: Guid.create().toString(),
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes
      };
      const checkedHealthEntry = checkEntry(newEntry);
      console.log(checkedHealthEntry);
      patient.entries.push(newEntry);
      return newEntry;
    case "Hospital":
      newEntry = {
        type: "Hospital",
        description: entry.description,
        date: entry.date,
        id: Guid.create().toString(),
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        discharge: entry.discharge
      };
      const checkedHospitalEntry = checkEntry(newEntry);
      console.log(checkedHospitalEntry);
      patient.entries.push(newEntry);
      return newEntry;
    case "OccupationalHealthCare":
      newEntry = {
        type: "OccupationalHealthCare",
        description: entry.description,
        date: entry.date,
        id: Guid.create().toString(),
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        employerName: entry.employerName,
        sickLeave: entry.sickLeave
      };
      patient.entries.push(newEntry);
      return newEntry;
    default: throw new Error('Incorrect type');
  };
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientEntry,
  addEntryToPatient
};