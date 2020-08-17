/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, EntryType, Patient } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseString = (input: any): string => {
  if (!input || !isString(input)) {
    throw new Error(`Incorrect or missing name: ${input}`);
  }
  return input;
};

const parseDate = (date: any): string => {
  if (!date || !isString || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseEntryType = (entryType: any): string => {
  if (!entryType || !isEntryType(entryType.type)) {
    throw new Error(`Incorrect or missing entry type: ${entryType}`);
  }
  return entryType.toString();
}

export const toPatient = (object: any): Patient => {
  const entries = object.entries;
  let newEntries: Array<string> = [];
  entries.forEach((entry: any) => {
    const newEntry = parseEntryType(entry);
    newEntries = newEntries.concat(newEntry);
  });
  const patient: Patient = {
    ...object,
    entries: newEntries,
  };
  return patient;
}

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };
  return newEntry;
};