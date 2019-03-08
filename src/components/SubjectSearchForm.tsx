import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps
} from "formik";
import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { RouteComponentProps } from "@reach/router";
import queryString from "query-string";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";

export interface FilterFormValues {
  value?: string | string[];
}

export interface FilterFormProps {}

function SubjectSearchForm({
  navigate,
  location
}: FilterFormProps & RouteComponentProps) {
  const { search } = queryString.parse(location.search ? location.search : "");

  return (
    <Formik
      initialValues={{ value: search }}
      onSubmit={(
        values: FilterFormValues,
        actions: FormikActions<FilterFormValues>
      ) => {
        navigate(`/subjects?search=${values.value}`);
        actions.setSubmitting(false);
      }}
      render={(formikBag: FormikProps<FilterFormValues>) => (
        <Form style={{ height: 66, display: "flex", alignItems: "center" }}>
          <Field
            name="value"
            render={({ field, form }: FieldProps<FilterFormValues>) => (
              <InputBase
                {...field}
                name="value"
                placeholder="Buscar paciente (ej. Juan Pérez)"
                style={{ marginLeft: 8, flex: 1 }}
                autoComplete="off"
                endAdornment={
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      form.resetForm({ value: "" });
                      navigate("/subjects");
                    }}
                  >
                    <IconButton aria-label="Toggle password visibility">
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
          <IconButton
            aria-label="Buscar"
            disabled={formikBag.isSubmitting}
            onClick={formikBag.handleSubmit}
            style={{ padding: 10, marginRight: 8 }}
          >
            <SearchIcon />
          </IconButton>
        </Form>
      )}
    />
  );
}

export default SubjectSearchForm;
