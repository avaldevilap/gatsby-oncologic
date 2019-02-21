import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
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

const styles = (theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none"
    },
    content: {
      marginTop: 70,
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    }
  });

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(({ children, classes }: Props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/" style={{ flex: 1 }} className={classes.link}>
              <Typography variant="h6" style={{ color: "white" }}>
                {data.site.siteMetadata.title}
              </Typography>
            </Link>
            <Button component={Link} to="/subjects" color="inherit">
              Pacientes
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Grid container spacing={16}>
            {children}
          </Grid>
        </main>
      </React.Fragment>
    )}
  />
));
