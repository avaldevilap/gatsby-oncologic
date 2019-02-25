import * as React from "react";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import { RouteComponentProps } from "@reach/router";

import ChemotherapyDetail from "../components/ChemotherapyDetail";
import Layout from "../components/layout";
import NeoplasmDetail from "../components/NeoplasmDetail";
import PatientDetail from "../components/patient-detail";
import SEO from "../components/SEO";
import SubjectList from "../components/SubjectList";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      height: "85vh",
      // ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    paperWithPadding: {
      height: "85vh",
      padding: "0 10px 0 10px"
    }
  });

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(
  ({ classes, ...props }: Props & RouteComponentProps) => {
    return (
      <Layout>
        <SEO title="Pacientes" />
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ height: "85vh" }}>
            <SubjectList {...props} />
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={6} md={3}>
          {props.location.state && props.location.state.subjectId ? (
            <PatientDetail {...props} id={props.location.state.subjectId} />
          ) : null}
        </Grid>
        {props.location.state && props.location.state.neoplasmId > 0 ? (
          <Grid container item xs={12} sm={6} md={3}>
            <NeoplasmDetail {...props} id={props.location.state.neoplasmId} />
          </Grid>
        ) : null}
        {props.location.state && props.location.state.chemotherapyId > 0 ? (
          <Grid container item xs={12} sm={6} md={3}>
            <ChemotherapyDetail
              {...props}
              id={props.location.state.chemotherapyId}
            />
          </Grid>
        ) : null}
      </Layout>
    );
  }
);
