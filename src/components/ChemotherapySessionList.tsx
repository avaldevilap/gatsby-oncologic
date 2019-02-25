import * as React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ChemotherapySessionDetail from "./ChemotherapySessionDetail";
import Date from "./UI/Date";

const styles = () =>
  createStyles({
    root: {
      border: "1px solid rgba(0,0,0,.125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0
      },
      "&:before": {
        display: "none"
      }
    }
  });

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(function ChemotherapySessionList(
  props: Props
) {
  const { sessions } = props;

  return sessions.map(({ date, ...rest }, index) => (
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Date value={date} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: 0 }}>
        <ChemotherapySessionDetail session={rest} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
});
