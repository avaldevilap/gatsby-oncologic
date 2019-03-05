import { Field, FieldProps } from "formik";
import gql from "graphql-tag";
import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import { MultipleSelect, SelectOption } from "react-select-material-ui";

import { allClinicalStages_clinicalStage } from "./__generated__/allClinicalStages";

function ClinicalStageOption() {
  const { data, loading } = useQuery(gql`
    query allClinicalStages {
      clinicalStage: neoplasms_clinicalstage {
        id
        name
      }
    }
  `);

  if (loading) {
    return null;
  }

  const options: SelectOption[] = data.clinicalStage.map(
    (item: allClinicalStages_clinicalStage) => ({
      value: item.id,
      label: item.name
    })
  );

  return (
    <Field
      name="clinical_stage_id"
      render={({ field, form }: FieldProps) => {
        return (
          <MultipleSelect
            name={field.name}
            label="Etapa Clínica"
            placeholder="Buscar etapa clínica (ej. II, IIb)"
            helperText="Buscar etapa clínica (ej. II, IIb)"
            margin="normal"
            options={options}
            values={field.value}
            onChange={form.handleChange("clinical_stage_id")}
          />
        );
      }}
    />
  );
}

export default React.memo(ClinicalStageOption);
