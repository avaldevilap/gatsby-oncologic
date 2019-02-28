import { graphql, Link, StaticQuery,useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from '../images/ribbon.svg';

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
  const data = useStaticQuery(graphql`query {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "ribbon.svg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }`)
  return (<StaticQuery
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
                <Img fixed={data.file.childImageSharp.fixed} />
                {data.site.siteMetadata.title}
              </Typography>
            </Link>
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
    )}
  />)
};
