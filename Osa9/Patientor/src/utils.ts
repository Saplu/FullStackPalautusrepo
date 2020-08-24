/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, EntryType, Patient, Entry, HealthCheckRating } from './types';

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

const isRatingType = (param: number): HealthCheckRating => {
  const valid: number = +param;
  switch(valid){
    case 0: return HealthCheckRating.Healthy;
    case 1: return HealthCheckRating.LowRisk;
    case 2: return HealthCheckRating.HighRisk;
    case 3: return HealthCheckRating.CriticalRisk;
    default: throw new Error('Value was out of bounds.');
  }
}

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

const parseType = (entryType: any): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error(`Incorrect or missing entry type: ${entryType}`);
  }
  return entryType;
}

const parseHealthRatingType = (ratingType: any): HealthCheckRating => {
  if (isNaN(ratingType)) {
    throw new Error(`Incorrect or missing rating type: ${ratingType}`);
  }
  const value : number = ratingType;
  const rating : HealthCheckRating = isRatingType(value);
  return rating;
};

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

export const checkEntry = (object: any): Entry => {
  const description = parseString(object.description);
  const date = parseDate(object.date);
  const specialist = parseString(object.specialist);
  const type = parseType(object.type);
  if (type === "Hospital"){
    const dischargeDate = parseDate(object.discharge.date);
    const criteria = parseString(object.discharge.criteria);
    const hospitalEntry : Entry = {
      id: '',
      description,
      date,
      specialist,
      type,
      discharge: {
        date: dischargeDate,
        criteria
      }
    };
    return hospitalEntry;
  };
  if (type === "HealthCheck"){
    const healthCheckRating = parseHealthRatingType(object.healthCheckRating);
    const healthCheckEntry : Entry = {
      id: '',
      description,
      date,
      specialist,
      type,
      healthCheckRating
    };
    return healthCheckEntry;
  };
  if (type === "OccupationalHealthCare"){
    const employerName = parseString(object.employerName);
    const occupationalEntry : Entry = {
      id: '',
      description,
      date,
      specialist,
      type,
      employerName
    };
    return occupationalEntry;
  }
  throw new Error('Incorrect type');
}