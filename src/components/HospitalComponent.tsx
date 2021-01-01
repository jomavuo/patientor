import React from 'react';
import { Diagnosis, HospitalEntry } from "../types";
import { Icon, Card, List } from "semantic-ui-react";

import { getCodeNames } from "../PatientDetails/EntryDetails";

interface HospitalComponentProps {
    entry: HospitalEntry;
    diagnoseList: Array<Diagnosis>;
    diagnosisCodes: string[] | undefined;
}

const HospitalComponent: React.FC<HospitalComponentProps> = ({ entry, diagnoseList, diagnosisCodes }) => {

    return (
        <div>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{entry.date} <Icon className="hospital" /></Card.Header>
                        <Card.Meta>{entry.specialist}</Card.Meta>
                        <Card.Description>{entry.description}</Card.Description>
                        {diagnosisCodes &&
                            <List as="ul">{diagnosisCodes.map(code =>
                                <List.Item as="li" key={code}>{code} {getCodeNames(code, diagnoseList)}</List.Item>)}
                            </List>
                        }
                        <Card.Description>discharge {entry.discharge.date}: {entry.discharge.criteria}</Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
};

export default HospitalComponent;
