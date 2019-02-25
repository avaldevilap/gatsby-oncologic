/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allSubjectsQuery
// ====================================================

export interface allSubjectsQuery_subjects_aggregate {
  __typename: "subjects_subject_aggregate_fields";
  count: number | null;
}

export interface allSubjectsQuery_subjects_nodes {
  __typename: "subjects_subject";
  id: number;
  first_name: string;
  last_name: string;
  age_at_diagnosis: any | null;
}

export interface allSubjectsQuery_subjects {
  __typename: "subjects_subject_aggregate";
  aggregate: allSubjectsQuery_subjects_aggregate | null;
  nodes: allSubjectsQuery_subjects_nodes[];
}

export interface allSubjectsQuery {
  /**
   * fetch aggregated fields from the table: "subjects_subject"
   */
  subjects: allSubjectsQuery_subjects;
}
