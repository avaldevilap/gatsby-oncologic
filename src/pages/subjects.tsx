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
import SubjectList from "../components/subject-list";

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
          <Paper className={classes.paper}>
            <SubjectList {...props} />
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={6} md={3}>
          {props.location.state && props.location.state.subjectId ? (
            <Grow in>
              <Paper className={classes.paper}>
                <PatientDetail {...props} id={props.location.state.subjectId} />
              </Paper>
            </Grow>
          ) : (
            ""
          )}
        </Grid>
        {props.location.state && props.location.state.neoplasmId > 0 ? (
          <Grid container item xs={12} sm={6} md={3}>
            <Grow in>
              <Paper className={classes.paper}>
                <NeoplasmDetail
                  {...props}
                  id={props.location.state.neoplasmId}
                />
              </Paper>
            </Grow>
          </Grid>
        ) : (
          ""
        )}
        {props.location.state && props.location.state.chemotherapyId > 0 ? (
          <Grid item xs={12} sm={6} md={3}>
            <Grow in>
              <Paper className={classes.paper}>
                <ChemotherapyDetail
                  {...props}
                  id={props.location.state.chemotherapyId}
                />
              </Paper>
            </Grow>
          </Grid>
        ) : (
          ""
        )}
      </Layout>
    );
  }
);
