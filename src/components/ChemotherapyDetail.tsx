import * as React from "react";
import { Query } from "react-apollo";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import chemotherapyByIdQuery from "../graphql/chemotherapyByIdQuery.graphql";

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
  /**
   * Neoplasm id
   */
  id: number;
}

function ChemotherapyDetail(props: Props) {
  const { id } = props;
  return (
    <Query query={chemotherapyByIdQuery} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Cargando...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        const { id } = data.chemotherapy;

        return <div>{id}</div>;
      }}
    </Query>
  );
}

export default withStyles(styles)(ChemotherapyDetail);
