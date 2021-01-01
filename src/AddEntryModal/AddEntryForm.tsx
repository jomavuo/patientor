import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";

/*
 * use type Entry, but omit id
 */
export type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: HealthCheckFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                healthCheckRating: 0,
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: []
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const valueError = "Rating should be between 0-3";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (values.healthCheckRating !== 0 && values.healthCheckRating !==1 && values.healthCheckRating !==2 && values.healthCheckRating !==3) {
                    errors.healthCheckRating = valueError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            errorMessage="invalid rating"
                            min={0}
                            max={3}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add Entry
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;