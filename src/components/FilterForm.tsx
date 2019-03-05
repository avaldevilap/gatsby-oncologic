import { Field, Form, Formik, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import ClinicalStageSelect from "./UI/ClinicalStageSelect";
import DatePickerField from "./UI/DatePickerField";
import TopographySelect from "./UI/TopographySelect";
import MorphologySelect from "./UI/MorphologySelect";

interface FilterFormProps {
  onSubmit?: (values: FilterFormValues) => void;
}
interface FilterFormValues {
  ic: string;
  age_at_diagnosis: number | string;
  clinical_stage_id: number[];
  date_of_diagnosis: string;
  topography: string[];
}

function FilterForm(props: FilterFormProps) {
  return (
    <Formik
      initialValues={{
        ic: "",
        age_at_diagnosis: "",
        clinical_stage_id: [],
        date_of_diagnosis: "",
        topography: []
      }}
      onSubmit={(
        values: FilterFormValues,
        actions: FormikActions<FilterFormValues>
      ) => {
        props.onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item xs={3}>
            <Field
              name="ic"
              label="CI"
              margin="normal"
              fullWidth
              // variant="outlined"
              autoComplete="off"
              component={TextField}
            />
          </Grid>

          <Grid item xs={3}>
            <Field
              name="age_at_diagnosis"
              type="number"
              label="Edad"
              margin="normal"
              fullWidth
              // variant="outlined"
              component={TextField}
            />
          </Grid>

          <Grid item xs={3}>
            <ClinicalStageSelect />
          </Grid>

          <Grid item xs={3}>
            <Field
              name="date_of_diagnosis"
              label="Fecha de Diagnóstico"
              margin="normal"
              fullWidth
              // variant="outlined"
              component={DatePickerField}
            />
          </Grid>

          <Grid item xs={6}>
            <TopographySelect />
          </Grid>

          <Grid item xs={6}>
            <MorphologySelect />
          </Grid>

          <Grid item xs>
            <Button type="submit" variant="contained" color="primary">
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default FilterForm;
