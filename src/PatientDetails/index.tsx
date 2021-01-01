import React from "react";
import axios from "axios";
import { useParams, useRouteMatch } from "react-router-dom";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import { setPatient } from "../state/reducer";
import { apiBaseUrl } from "../constants";
import { Patient, MatchParams, Entry } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { HealthCheckFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetails: React.FC = () => {
    const [{ patientsViewed, diagnoses }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const { id } = useParams<{ id: string }>();

    const match: MatchParams | null = useRouteMatch("/patients/:id");

    const patient: Patient | null | undefined = match
    ? Object.values(patientsViewed).find((patient: Patient) => patient.id === id)
    : null;

    const submitNewEntry = async (values: HealthCheckFormValues) => {
        try {
          const { data: modifiedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(setPatient(modifiedPatient));
          closeModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
      };


    React.useEffect(() => {
        const patientFoundInState: Patient | null | undefined = Object.values(patientsViewed)
            .find((patient: Patient) => patient.id === id);

        if (!patientFoundInState && match) {
            const getPatient = async () => {
                try {
                    const { data: patientFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${match.params.id}`);
                    dispatch(setPatient(patientFromApi));
                } catch (e) {
                    console.error(e);
                    setError(e);
                }
            };
            getPatient();
        }
        //eslint-disable-next-line
    }, [dispatch]);

    const genderIcon = () => {
        if (patient?.gender === "male") {
            return (<Icon name="man" />);
        } else if (patient?.gender === "female") {
            return (<Icon name="woman" />);
        } else {
            return (<Icon name="other gender" />);
        }
    };

    if (!patient) {
        return (
            <div>
                <p>patient not found</p>
            </div>
        );
    } else {
        const patientEntries: Entry[] = patient.entries;

        return (
            <div className="App">
                <Container textAlign="left">
                    <Header as="h2">{patient.name}{genderIcon()}</Header>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <h3>entries</h3>
                    {patientEntries.map(entry =>
                        <EntryDetails key={entry.id} entry={entry} diagnoses={Object.values(diagnoses)} />
                    )}
                    <br />
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button onClick={() => openModal()}>Add a new healthcheck entry</Button>
                </Container>
            </div>
        );
    }
};

export default PatientDetails;