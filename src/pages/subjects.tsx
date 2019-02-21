import * as React from "react";

import { Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";

import ChemotherapyDetail from "../components/ChemotherapyDetail";
import Layout from "../components/layout";
import NeoplasmDetail from "../components/NeoplasmDetail";
import PatientDetail from "../components/patient-detail";
import SubjectList from "../components/subject-list";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      height: "85vh"
    },
    paperWithPadding: {
      height: "85vh",
      padding: "0 10px 0 10px"
    }
  });

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(({ classes, ...props }: Props) => {
  const { subjectId, neoplasmId, chemotherapyId } = props.location.state;
  console.log("TCL: props.location.state", props.location.state);

  return (
    <Layout>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.paper}>
          <SubjectList {...props} />
        </Paper>
      </Grid>
      <Grid container item xs={12} sm={6} md={3}>
        {subjectId > 0 ? (
          <Grow in>
            <Paper className={classes.paper}>
              <PatientDetail {...props} id={subjectId} />
            </Paper>
          </Grow>
        ) : (
          ""
        )}
      </Grid>
      {neoplasmId > 0 ? (
        <Grid item xs={12} sm={6} md={3}>
          <Grow in>
            <Paper className={classes.paper}>
              <NeoplasmDetail {...props} id={neoplasmId} />
            </Paper>
          </Grow>
        </Grid>
      ) : (
        ""
      )}
      {chemotherapyId > 0 ? (
        <Grid item xs={12} sm={6} md={3}>
          <Grow in>
            <Paper className={classes.paper}>
              <ChemotherapyDetail {...props} id={chemotherapyId} />
            </Paper>
          </Grow>
        </Grid>
      ) : (
        ""
      )}
    </Layout>
  );
});
