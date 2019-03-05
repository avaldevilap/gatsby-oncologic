import { gql } from "apollo-boost";
import * as React from "react";
import { useQuery } from "react-apollo-hooks";

import Grid from "@material-ui/core/Grid";

import FilterForm from "../components/FilterForm";
import Layout from "../components/layout";
import SEO from "../components/SEO";

export default React.memo(() => {
  const [filters, setFilters] = React.useState({});
  console.log("TCL: filters", filters);
  const { data } = useQuery(gql`
    query filteredSubjects(
      $ic: String
      $age_at_diagnosis: smallint
      $clinical_stage_id: Int # $date_of_diagnosis: String # $topography: [String]
    ) {
      filteredSubjects: subjects_subject_aggregate(
        where: {
          ic: { _eq: $ic }
          age_at_diagnosis: { _eq: $age_at_diagnosis }
          neoplasms: { clinical_stage_id: { _eq: $clinical_stage_id } }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  `);
  // if (data) {
  //   console.log(data);
  // }
  return (
    <Layout>
      <SEO title="Reportes" />
      {/* <Grid
        container
        item
        xs={12}
        spacing={16}
        justify="center"
        alignItems="center"
      > */}
      <FilterForm onSubmit={values => setFilters(values)} />
      {/* </Grid> */}
    </Layout>
  );
});
