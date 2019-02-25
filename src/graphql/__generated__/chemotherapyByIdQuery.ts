/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chemotherapyByIdQuery
// ====================================================

export interface chemotherapyByIdQuery_chemotherapy_protocol {
  __typename: "chemotherapies_protocol";
  name: string;
}

export interface chemotherapyByIdQuery_chemotherapy_prescribes {
  __typename: "employees_employee";
  first_name: string;
  last_name: string;
}

export interface chemotherapyByIdQuery_chemotherapy_sessions_meds_drug {
  __typename: "drugs_drug";
  name: string;
}

export interface chemotherapyByIdQuery_chemotherapy_sessions_meds_route_of_administration {
  __typename: "chemotherapies_routeofadministration";
  name: string;
}

export interface chemotherapyByIdQuery_chemotherapy_sessions_meds {
  __typename: "chemotherapies_medication";
  /**
   * An object relationship
   */
  drug: chemotherapyByIdQuery_chemotherapy_sessions_meds_drug;
  dose: any;
  days: string | null;
  /**
   * An object relationship
   */
  route_of_administration: chemotherapyByIdQuery_chemotherapy_sessions_meds_route_of_administration | null;
  prescribed_dose: any;
}

export interface chemotherapyByIdQuery_chemotherapy_sessions {
  __typename: "chemotherapies_chemotherapysession";
  date: any;
  assisted: boolean;
  observations_of_cytostats: string;
  observations_of_concomitants: string;
  /**
   * An array relationship
   */
  meds: chemotherapyByIdQuery_chemotherapy_sessions_meds[];
}

export interface chemotherapyByIdQuery_chemotherapy {
  __typename: "chemotherapies_chemotherapy";
  id: number;
  /**
   * An object relationship
   */
  protocol: chemotherapyByIdQuery_chemotherapy_protocol | null;
  date: any;
  current_weight: any | null;
  current_size: any | null;
  current_body_surface: any | null;
  cycles: number | null;
  /**
   * An object relationship
   */
  prescribes: chemotherapyByIdQuery_chemotherapy_prescribes | null;
  /**
   * An array relationship
   */
  sessions: chemotherapyByIdQuery_chemotherapy_sessions[];
}

export interface chemotherapyByIdQuery {
  /**
   * fetch data from the table: "chemotherapies_chemotherapy" using primary key columns
   */
  chemotherapy: chemotherapyByIdQuery_chemotherapy | null;
}

export interface chemotherapyByIdQueryVariables {
  id: number;
}
