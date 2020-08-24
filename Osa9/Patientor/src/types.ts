export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthCare',
  Hospital = 'Hospital'
}

export interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry{
  type: "OccupationalHealthCare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  };
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;