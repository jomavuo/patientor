import React from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from "../types";
import { Icon, Card, List } from "semantic-ui-react";

import { getCodeNames } from "../PatientDetails/EntryDetails";

interface OccupationalHealthCareEntryProps {
    entry: OccupationalHealthcareEntry;
    diagnoseList: Array<Diagnosis>;
    diagnosisCodes: string[] | undefined;
}

const OccupationalHealthCareComponent: React.FC<OccupationalHealthCareEntryProps> = ({ entry, diagnoseList, diagnosisCodes }) => {

    return (
        <div>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{entry.date} <Icon className="doctor" /></Card.Header>
                        <Card.Meta>{entry.specialist}/{entry.employerName}</Card.Meta>
                        <Card.Description>{entry.description}</Card.Description>
                        {diagnosisCodes &&
                            <List as="ul">{diagnosisCodes.map(code =>
                                <List.Item as="li" key={code}>{code} {getCodeNames(code, diagnoseList)}</List.Item>)}
                            </List>
                        }
                        <Card.Description>Sickleave: {entry.sickLeave?.startDate}-{entry.sickLeave?.endDate}</Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
};

export default OccupationalHealthCareComponent;