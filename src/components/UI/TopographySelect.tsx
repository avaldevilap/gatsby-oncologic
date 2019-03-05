import { Field, FieldProps } from "formik";
import gql from "graphql-tag";
import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import { MultipleSelect } from "react-select-material-ui";

function TopographySelect() {
  const { data, loading } = useQuery(gql`
    query allTopographies {
      topographies: icd_o_topography {
        code
        description
      }
    }
  `);

  if (loading) {
    return null;
  }

  const options = data.topographies.map(item => ({
    value: item.code,
    label: `${item.code} - ${item.description}`
  }));

  return (
    <Field
      name="topography"
      render={({ field, form }: FieldProps) => {
        return (
          <MultipleSelect
            name={field.name}
            label="Sitio Primario"
            placeholder="Buscar topografías (ej. C509, Mama)"
            helperText="Buscar topografías (ej. C509, Mama)"
            variant="outlined"
            margin="normal"
            options={options}
            values={field.value}
            onChange={form.handleChange("topography")}
          />
        );
      }}
    />
  );
}

export default React.memo(TopographySelect);
