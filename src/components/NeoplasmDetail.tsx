import * as React from "react";
import { Query } from "react-apollo";

import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Card,
  CardHeader,
  CardContent
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Date from "./UI/Date";
import Laterality from "./UI/Laterality";
import gql from "graphql-tag";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    }
  });

interface Props extends WithStyles<typeof styles> {
  id: number;
}

function NeoplasmDetail(props: Props) {
  const { id } = props;
  return (
    <Query
      query={gql`
        query neoplasmById($id: Int!) {
          neoplasm: neoplasms_neoplasm_by_pk(id: $id) {
            id
            topography {
              code
              description
            }
            morphology: icdOMorphologyByhistologicTypeId {
              code
              description
            }
            date_of_diagnosis
            laterality
            diagnostic_confirmation: neoplasmsDiagnosticconfirmationBydiagnosticConfirmationId {
              name
            }
            differentiation_grade: neoplasmsDifferentiationgradeBydifferentiationGradeId {
              name
            }
            clinical_extension: neoplasmsClinicalextensionByclinicalExtensionId {
              name
            }
            clinical_stage: neoplasmsClinicalstageByclinicalStageId {
              name
            }
            source: neoplasmsSourceBysourceId {
              name
            }
            date_of_report
            medic_that_report: employeesEmployeesBymedicThatReportId {
              first_name
              last_name
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return "Cargando...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        const {
          topography,
          morphology,
          date_of_diagnosis,
          laterality,
          diagnostic_confirmation,
          differentiation_grade,
          clinical_extension,
          clinical_stage,
          source,
          date_of_report,
          medic_that_report
        } = data.neoplasm;

        const title: string = topography
          ? `${topography.code} - ${topography.description}`
          : "No definido";
        const subheader: string = morphology
          ? `${morphology.code} - ${morphology.description}`
          : "No definido";

        return (
          <Card>
            <CardHeader title={title} subheader={subheader} />
            <CardContent>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Typography>
                            <strong>Fecha de Diagnóstico</strong>
                          </Typography>
                        </td>
                        <td>
                          <Date value={date_of_diagnosis} />
                        </td>
                      </tr>
                      {laterality !== "1" ? (
                        <tr>
                          <td>
                            <Typography>
                              <strong>Lateralidad</strong>
                            </Typography>
                          </td>
                          <td>
                            <Laterality value={laterality} />
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <td>
                          <Typography>
                            <strong>Confirmación del Diagnóstico</strong>
                          </Typography>
                        </td>
                        <td>
                          <Typography>
                            {diagnostic_confirmation.name}
                          </Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>
                            <strong>Grado de Diferenciación</strong>
                          </Typography>
                        </td>
                        <td>
                          <Typography>{differentiation_grade.name}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>
                            <strong>Extensión Clínica</strong>
                          </Typography>
                        </td>
                        <td>
                          <Typography>{clinical_extension.name}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>
                            <strong>Etapa Clínica</strong>
                          </Typography>
                        </td>
                        <td>
                          <Typography>{clinical_stage.name}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>
                            <strong>Fuente</strong>
                          </Typography>
                        </td>
                        <td>
                          <Typography>{source.name}</Typography>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography>
                            <strong>Fecha de Reporte</strong>
                          </Typography>
                        </td>
                        <td>
                          <Date value={date_of_report} />
                        </td>
                      </tr>
                      {medic_that_report ? (
                        <tr>
                          <td>
                            <Typography>
                              <strong>Reportó</strong>
                            </Typography>
                          </td>
                          <td>
                            <Typography>{medic_that_report}</Typography>
                          </td>
                        </tr>
                      ) : null}
                      {medic_that_report ? (
                        <tr>
                          <td>
                            <Typography>
                              <strong>Tumor(T)</strong>
                            </Typography>
                          </td>
                          <td>
                            <Typography>{medic_that_report}</Typography>
                          </td>
                        </tr>
                      ) : null}
                      {medic_that_report ? (
                        <tr>
                          <td>
                            <Typography>
                              <strong>Ganglios Linfáticos(N)</strong>
                            </Typography>
                          </td>
                          <td>
                            <Typography>{medic_that_report}</Typography>
                          </td>
                        </tr>
                      ) : null}
                      {medic_that_report ? (
                        <tr>
                          <td>
                            <Typography>
                              <strong>Metástasis(M)</strong>
                            </Typography>
                          </td>
                          <td>
                            <Typography>{medic_that_report}</Typography>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(NeoplasmDetail);
