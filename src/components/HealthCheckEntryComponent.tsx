import React from 'react';
import { Diagnosis, HealthCheckEntry } from "../types";
import { Card, Icon, List } from "semantic-ui-react";
import { getCodeNames } from "../PatientDetails/EntryDetails";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    diagnoseList: Array<Diagnosis>;
    diagnosisCodes: string[] | undefined;
}

const getRatingDescription = (rating: number): string | null => {
    switch (rating) {
        case 0:
            return "Healthy";
        case 1:
            return "Low risk";

        case 2:
            return "High risk";

        case 3:
            return "Critical risk";
        default:
            return null;
    }
};


const HealthCheckEntryComponent: React.FC<HealthCheckEntryProps> = ({ entry, diagnoseList, diagnosisCodes }) => {
    let heartStyle: Record<string, string>;

    switch (entry.healthCheckRating) {
        case 0:
            heartStyle = { color: "red" };
            break;

        case 1:
            heartStyle = { color: "yellow" };
            break;

        case 2:
            heartStyle = { color: "blue" };
            break;

        case 3:
            heartStyle = { color: "black" };
            break;
        default:
            heartStyle = {};
            break;
    }

    return (
        <div>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header as="h1">{entry.date} <Icon className="heartbeat" /></Card.Header>
                        <Card.Meta>{entry.specialist}</Card.Meta>
                        <Card.Description>{entry.description}</Card.Description>
                        {diagnosisCodes &&
                            <List as="ul">{diagnosisCodes.map(code =>
                                <List.Item as="li" key={code}>{code} {getCodeNames(code, diagnoseList)}</List.Item>)}
                            </List>
                        }
                        <Card.Content>Health Rating {entry.healthCheckRating}: <Icon style={heartStyle} className="heart" />{getRatingDescription(entry.healthCheckRating)}</Card.Content>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
};

export default HealthCheckEntryComponent;