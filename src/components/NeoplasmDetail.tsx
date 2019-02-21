import * as React from "react";
import { Query } from "react-apollo";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import neoplasmByIdQuery from "../graphql/neoplasmByIdQuery.graphql";
import Date from "./UI/Date";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    }
  });

interface Props extends WithStyles<typeof styles> {
  /**
   * Neoplasm id
   */
  id: number;
}

function NeoplasmDetail(props: Props) {
  const { id, classes } = props;
  return (
    <Query query={neoplasmByIdQuery} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Cargando...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        const {
          id,
          topography,
          morphology,
          date_of_diagnosis,
          laterality,
          diagnostic_confirmation,
          differentiation_grade,
          clinical_extension,
          clinical_stage,
          source_of_info,
          date_of_report,
          medic_that_report
        } = data.neoplasm;

        return (
          <Grid container spacing={16} className={classes.root}>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Sitio primario</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${topography.code} - ${
                topography.description
              }`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Tipo histológico</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${morphology.code} - ${
                morphology.description
              }`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Fecha de Diagnóstico</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{<Date date={date_of_diagnosis} />}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Lateralidad</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{laterality}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Confirmación del Diagnóstico</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{diagnostic_confirmation}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Grado de Diferenciación</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{differentiation_grade}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Extensión Clínica</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{clinical_extension}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Etapa Clínica</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{clinical_stage}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Fuente de Información</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{source_of_info}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Fecha de Reporte</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{<Date date={date_of_report} />}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                <strong>Reportó</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{medic_that_report}</Typography>
            </Grid>
          </Grid>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(NeoplasmDetail);
