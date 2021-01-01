import React from 'react';
import { Diagnosis, Entry } from "../types";
import HospitalComponent from "../components/HospitalComponent";
import OccupationalHealthCareEntry from "../components/OccupationalHealthCareComponent";
import HealthCheckEntry from "../components/HealthCheckEntryComponent";

type EntriesProps = {
    entry: Entry;
    diagnoses: Diagnosis[];
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled entry-type: ${JSON.stringify(value)}`
    );
};

export const getCodeNames = (code: string, diagnoseList: Array<Diagnosis>): string | undefined => {
    const diagnose: Diagnosis | undefined = diagnoseList.find(d => d.code === code.toString());
    return diagnose?.name;
};

const EntryDetails: React.FC<EntriesProps> = ({ entry, diagnoses }) => {
    const diagnoseList: Array<Diagnosis> = Object.values(diagnoses);
    const diagnosisCodes: string[] | undefined = entry.diagnosisCodes;

    switch (entry.type) {
        case "Hospital":
            return <HospitalComponent entry={entry} diagnoseList={diagnoseList} diagnosisCodes={diagnosisCodes} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntry entry={entry} diagnoseList={diagnoseList} diagnosisCodes={diagnosisCodes} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoseList={diagnoseList} diagnosisCodes={diagnosisCodes} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
