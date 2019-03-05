import { Field, FieldProps } from "formik";
import gql from "graphql-tag";
import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import { MultipleSelect } from "react-select-material-ui";

function MorphologySelect() {
  const { data, loading } = useQuery(gql`
    query allTopographies {
      morphologies: icd_o_morphology {
        code
        description
      }
    }
  `);

  if (loading) {
    return null;
  }

  const options = data.morphologies.map(item => ({
    value: item.code,
    label: `${item.code} - ${item.description}`
  }));

  return (
    <Field
      name="morphology"
      render={({ field, form }: FieldProps) => {
        return (
          <MultipleSelect
            name={field.name}
            label="Tipo Histológico"
            placeholder="Buscar morfologías (ej. 8000/3, Neoplasia maligna)"
            helperText="Buscar morfologías (ej. 8000/3, Neoplasia maligna)"
            margin="normal"
            options={options}
            values={field.value}
            onChange={form.handleChange("morphology")}
          />
        );
      }}
    />
  );
}

export default React.memo(MorphologySelect);
