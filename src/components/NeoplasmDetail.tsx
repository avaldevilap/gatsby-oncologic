import * as React from "react";
import { Query } from "react-apollo";

import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Card,
  CardHeader,
  CardContent
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import neoplasmByIdQuery from "../graphql/neoplasmByIdQuery.graphql";
import Date from "./UI/Date";
import Laterality from "./UI/Laterality";

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
          source,
          date_of_report,
          medic_that_report
        } = data.neoplasm;

        return (
          <Card>
            <CardHeader
              title={`${topography.code} - ${topography.description}`}
              subheader={`${morphology.code} - ${morphology.description}`}
            />
            <CardContent>
              <Grid container spacing={16}>
                <Grid item xs>
                  <Typography>
                    <strong>Fecha de Diagnóstico</strong>
                  </Typography>
                  <Date value={date_of_diagnosis} />
                </Grid>
                {laterality !== "1" ? (
                  <Grid item xs>
                    <Typography>
                      <strong>Lateralidad</strong>
                    </Typography>
                    <Laterality value={laterality} />
                  </Grid>
                ) : null}
                <Grid item xs>
                  <Typography>
                    <strong>Confirmación del Diagnóstico</strong>
                  </Typography>
                  <Typography>{diagnostic_confirmation.name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    <strong>Grado de Diferenciación</strong>
                  </Typography>
                  <Typography>{differentiation_grade.name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    <strong>Extensión Clínica</strong>
                  </Typography>
                  <Typography>{clinical_extension.name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    <strong>Etapa Clínica</strong>
                  </Typography>
                  <Typography>{clinical_stage.name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    <strong>Fuente</strong>
                  </Typography>
                  <Typography>{source.name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>
                    <strong>Fecha de Reporte</strong>
                  </Typography>
                  <Date value={date_of_report} />
                </Grid>
                {medic_that_report ? (
                  <Grid item xs>
                    <Typography>
                      <strong>Reportó</strong>
                    </Typography>
                    <Typography>{medic_that_report}</Typography>
                  </Grid>
                ) : null}
                {medic_that_report ? (
                  <Grid item xs>
                    <Typography>
                      <strong>Tumor(T)</strong>
                    </Typography>
                    <Typography>{medic_that_report}</Typography>
                  </Grid>
                ) : null}
                {medic_that_report ? (
                  <Grid item xs>
                    <Typography>
                      <strong>Ganglios Linfáticos(N)</strong>
                    </Typography>
                    <Typography>{medic_that_report}</Typography>
                  </Grid>
                ) : null}
                {medic_that_report ? (
                  <Grid item xs>
                    <Typography>
                      <strong>Metástasis(M)</strong>
                    </Typography>
                    <Typography>{medic_that_report}</Typography>
                  </Grid>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
          // <Grid container spacing={16} className={classes.root}>
          //   <Grid item xs={12}>
          //     <Typography variant="title" align="center">{`${
          //       topography.code
          //     } - ${topography.description}`}</Typography>
          //     <Typography
          //       variant="subtitle1"
          //       color="textSecondary"
          //       align="center"
          //     >{`${morphology.code} - ${morphology.description}`}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Fecha de Diagnóstico</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Date date={date_of_diagnosis} />
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Lateralidad</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Laterality value={laterality} />
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Confirmación del Diagnóstico</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{diagnostic_confirmation.name}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Grado de Diferenciación</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{differentiation_grade.name}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Extensión Clínica</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{clinical_extension.name}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Etapa Clínica</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{clinical_stage.name}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Fuente</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{source.name}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Fecha de Reporte</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Date date={date_of_report} />
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Reportó</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{medic_that_report}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Tumor(T)</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{medic_that_report}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Ganglios Linfáticos(N)</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{medic_that_report}</Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography align="right">
          //       <strong>Metástasis(M)</strong>
          //     </Typography>
          //   </Grid>
          //   <Grid item xs={6}>
          //     <Typography>{medic_that_report}</Typography>
          //   </Grid>
          // </Grid>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(NeoplasmDetail);
