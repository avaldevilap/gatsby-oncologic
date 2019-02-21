import * as React from "react";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import Conditions from "./conditions";
import Procedures from "./procedures";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    },
    paper: {
      height: "85vh",
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
  patient?: any;
  conditions?: any[];
  procedures?: any[];
}

function PatientInfo2(props: Props) {
  const [value, setValue] = React.useState(0);
  const { classes, patient, conditions, procedures } = props;

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if (patient.id != null) {
    return (
      <Paper className={classes.paper}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Condiciones" />
          <Tab label="Procedimientos" />
        </Tabs>
        <div className={classes.tabContent}>
          {value === 0 && <Conditions conditions={conditions} />}
          {value === 1 && <Procedures procedures={procedures} />}
        </div>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        item
        xs
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Typography variant="caption">Selecciona un paciente.</Typography>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(PatientInfo2);
