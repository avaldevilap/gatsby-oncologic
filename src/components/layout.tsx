import { graphql, Link, useStaticQuery } from "gatsby";
import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import logo from "../images/ribbon.svg";

const styles = (theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none"
    },
    content: {
      marginTop: "4%",
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    }
  });

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(({ children, classes }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Avatar alt="logo" src={logo} />
          {/* <img src={logo} alt="logo" width={40} height={40} /> */}
          <Link to="/" className={classes.link}>
            <Typography variant="h6" style={{ color: "white" }}>
              {data.site.siteMetadata.title}
            </Typography>
          </Link>
          <div style={{ flex: 1 }} />
          <Button component={Link} to="/subjects" color="inherit">
            Pacientes
          </Button>
          <Button component={Link} to="/reports" color="inherit">
            Reportes
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Grid container spacing={8}>
          {children}
        </Grid>
      </main>
    </React.Fragment>
  );
});
