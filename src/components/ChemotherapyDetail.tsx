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

import Date from "../components/UI/Date";
import FullName from "../components/UI/FullName";
import { chemotherapyByIdQuery_chemotherapy } from "../graphql/__generated__/chemotherapyByIdQuery";
import ChemotherapySessionList from "./ChemotherapySessionList";
import Pluralize from "react-pluralize";
import Weight from "./UI/Weight";
import Height from "./UI/Height";
import gql from "graphql-tag";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    paper: {
      // height: "85vh",
      width: "100%"
    },
    paperContent: {
      padding: 10
    },
    tabContent: {
      height: "100%"
    }
  });

interface Props extends WithStyles<typeof styles> {
  /**
   * Neoplasm id
   */
  id: number;
}

function ChemotherapyDetail(props: Props) {
  const { id, classes } = props;
  return (
    <Query
      query={gql`
        query chemotherapyByIdQuery($id: Int!) {
          chemotherapy: chemotherapies_chemotherapy_by_pk(id: $id) {
            id
            protocol {
              name
            }
            date
            current_weight
            current_size
            current_body_surface
            cycles
            prescribes {
              first_name
              last_name
            }
            chemotherapySessions(order_by: { date: desc }) {
              date
              assisted
              observations_of_cytostats
              observations_of_concomitants
              meds: chemotherapiesMedicationsBysessionId {
                drug: drugsDrugBydrugId {
                  name
                }
                dose
                days
                route_of_administration: chemotherapiesRouteofadministrationByrouteOfAdministrationId {
                  name
                }
                prescribed_dose
              }
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
          id,
          protocol,
          date,
          current_weight,
          current_size,
          current_body_surface,
          cycles,
          prescribes,
          sessions
        }: chemotherapyByIdQuery_chemotherapy = data.chemotherapy;

        return (
          <Card>
            <CardHeader
              title={protocol.name}
              subheader={<Date value={date} color="inherit" />}
            />
            <CardContent style={{ overflowY: "auto" }}>
              <Grid container spacing={16}>
                <Grid item xs>
                  <Typography>
                    <strong>Peso</strong>
                  </Typography>
                  <Weight value={current_weight} />
                </Grid>

                <Grid item xs>
                  <Typography>
                    <strong>Talla</strong>
                  </Typography>
                  <Height value={current_size} />
                </Grid>

                <Grid item xs>
                  <Typography>
                    <strong>
                      <abbr title="Superficie Corporal">SC</abbr>
                    </strong>
                  </Typography>
                  <Weight value={current_body_surface} />
                </Grid>

                <Grid item xs>
                  <Typography>
                    <strong>Ciclos</strong>
                  </Typography>
                  <Typography>
                    <Pluralize singular="ciclo" count={cycles} />
                  </Typography>
                </Grid>

                <Grid item>
                  {prescribes ? (
                    <>
                      <Typography>
                        <strong>Prescribe</strong>
                      </Typography>
                      <FullName
                        firstName={prescribes.first_name}
                        lastName={prescribes.last_name}
                      />
                    </>
                  ) : null}
                </Grid>

                <Grid item style={{ overflow: "auto" }}>
                  <Typography gutterBottom variant="subtitle1">
                    Sesiones
                  </Typography>
                  {sessions.length > 0 ? (
                    <ChemotherapySessionList {...props} sessions={sessions} />
                  ) : null}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(ChemotherapyDetail);
