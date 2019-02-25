/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectByIdQuery
// ====================================================

export interface subjectByIdQuery_subject_race {
  __typename: "subjects_race";
  name: string;
}

export interface subjectByIdQuery_subject_municipality_county {
  __typename: "subjects_county";
  name: string;
}

export interface subjectByIdQuery_subject_municipality {
  __typename: "subjects_municipality";
  name: string;
  /**
   * An object relationship
   */
  county: subjectByIdQuery_subject_municipality_county;
}

export interface subjectByIdQuery_subject_neoplasms_topography {
  __typename: "icd_o_topography";
  code: string;
  description: string;
}

export interface subjectByIdQuery_subject_neoplasms_morphology {
  __typename: "icd_o_morphology";
  code: string;
  description: string;
}

export interface subjectByIdQuery_subject_neoplasms {
  __typename: "subjects_descriptionofthisneoplasm";
  id: number;
  /**
   * An object relationship
   */
  topography: subjectByIdQuery_subject_neoplasms_topography | null;
  /**
   * An object relationship
   */
  morphology: subjectByIdQuery_subject_neoplasms_morphology | null;
}

export interface subjectByIdQuery_subject_chemotherapies_protocol {
  __typename: "chemotherapies_protocol";
  name: string;
}

export interface subjectByIdQuery_subject_chemotherapies {
  __typename: "chemotherapies_chemotherapy";
  id: number;
  /**
   * An object relationship
   */
  protocol: subjectByIdQuery_subject_chemotherapies_protocol | null;
  date: any;
}

export interface subjectByIdQuery_subject_surgeries {
  __typename: "surgeries_surgery";
  id: number;
  date: any;
}

export interface subjectByIdQuery_subject {
  __typename: "subjects_subject";
  id: number;
  ic: string;
  first_name: string;
  last_name: string;
  medical_record: string;
  age_at_diagnosis: any | null;
  gender: number;
  /**
   * An object relationship
   */
  race: subjectByIdQuery_subject_race | null;
  date_of_birth: any;
  address: string;
  /**
   * An object relationship
   */
  municipality: subjectByIdQuery_subject_municipality | null;
  /**
   * An array relationship
   */
  neoplasms: subjectByIdQuery_subject_neoplasms[];
  /**
   * An array relationship
   */
  chemotherapies: subjectByIdQuery_subject_chemotherapies[];
  /**
   * An array relationship
   */
  surgeries: subjectByIdQuery_subject_surgeries[];
}

export interface subjectByIdQuery {
  /**
   * fetch data from the table: "subjects_subject" using primary key columns
   */
  subject: subjectByIdQuery_subject | null;
}

export interface subjectByIdQueryVariables {
  id: number;
}
