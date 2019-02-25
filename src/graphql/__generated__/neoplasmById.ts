/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: neoplasmById
// ====================================================

export interface neoplasmById_neoplasm_topography {
  __typename: "icd_o_topography";
  code: string;
  description: string;
}

export interface neoplasmById_neoplasm_morphology {
  __typename: "icd_o_morphology";
  code: string;
  description: string;
}

export interface neoplasmById_neoplasm_diagnostic_confirmation {
  __typename: "neoplasms_diagnosticconfirmation";
  name: string;
}

export interface neoplasmById_neoplasm_differentiation_grade {
  __typename: "neoplasms_differentiationgrade";
  name: string;
}

export interface neoplasmById_neoplasm_clinical_extension {
  __typename: "neoplasms_clinicalextension";
  name: string;
}

export interface neoplasmById_neoplasm_clinical_stage {
  __typename: "neoplasms_clinicalstage";
  name: string;
}

export interface neoplasmById_neoplasm_source {
  __typename: "neoplasms_source";
  name: string;
}

export interface neoplasmById_neoplasm_medic_that_report {
  __typename: "employees_employees";
  first_name: string;
  last_name: string;
}

export interface neoplasmById_neoplasm {
  __typename: "neoplasms_neoplasm";
  id: number;
  /**
   * An object relationship
   */
  topography: neoplasmById_neoplasm_topography | null;
  /**
   * An object relationship
   */
  morphology: neoplasmById_neoplasm_morphology | null;
  date_of_diagnosis: any;
  laterality: string;
  /**
   * An object relationship
   */
  diagnostic_confirmation: neoplasmById_neoplasm_diagnostic_confirmation | null;
  /**
   * An object relationship
   */
  differentiation_grade: neoplasmById_neoplasm_differentiation_grade | null;
  /**
   * An object relationship
   */
  clinical_extension: neoplasmById_neoplasm_clinical_extension | null;
  /**
   * An object relationship
   */
  clinical_stage: neoplasmById_neoplasm_clinical_stage | null;
  /**
   * An object relationship
   */
  source: neoplasmById_neoplasm_source | null;
  date_of_report: any;
  /**
   * An object relationship
   */
  medic_that_report: neoplasmById_neoplasm_medic_that_report | null;
}

export interface neoplasmById {
  /**
   * fetch data from the table: "neoplasms_neoplasm" using primary key columns
   */
  neoplasm: neoplasmById_neoplasm | null;
}

export interface neoplasmByIdVariables {
  id: number;
}
