import * as React from "react";
import { Query } from "react-apollo";

import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  List,
  ListSubheader,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  chemotherapyByIdQuery_chemotherapy,
  chemotherapyByIdQuery_chemotherapy_sessions
} from "../graphql/__generated__/chemotherapyByIdQuery";
import chemotherapyByIdQuery from "../graphql/chemotherapyByIdQuery.graphql";
import ChemotherapySessionList from "./ChemotherapySessionList";
import Date from "./UI/Date";
import FullName from "./UI/FullName";
import Pluralize from "react-pluralize";

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
  session: chemotherapyByIdQuery_chemotherapy_sessions;
}

export default withStyles(styles)(function ChemotherapySessionDetail(
  props: Props
) {
  const { classes, session } = props;
  return (
    <Grid container item>
      {session.observations_of_cytostats ? (
        <>
          <Grid item xs={6}>
            <Typography align="right">
              <strong>Observaciones</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{session.observations_of_cytostats}</Typography>
          </Grid>
        </>
      ) : null}

      {session.observations_of_concomitants ? (
        <>
          <Grid item xs={6}>
            <Typography align="right">
              <strong>Observaciones</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{session.observations_of_concomitants}</Typography>
          </Grid>
        </>
      ) : null}

      <Grid container spacing={8} xs={12}>
        <Grid item style={{ overflowX: "auto" }}>
          <Table padding="dense">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Dosis</TableCell>
                <TableCell>Días</TableCell>
                <TableCell>Vía de administración</TableCell>
                <TableCell>Dosis prescrita</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {session.meds.map(
                ({
                  drug,
                  dose,
                  days,
                  route_of_administration,
                  prescribed_dose
                }) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {drug.name}
                    </TableCell>
                    <TableCell>{`${dose} mg`}</TableCell>
                    <TableCell>
                      <Pluralize singular="día" count={days} />
                    </TableCell>
                    <TableCell>{route_of_administration.name}</TableCell>
                    <TableCell>{`${prescribed_dose} mg`}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Grid>
  );
});
