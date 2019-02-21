import * as React from "react";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import subjectByIdQuery from "../graphql/subjectByIdQuery.graphql";
import ChemotherapyList from "./ChemotherapyList";
import NeoplasmList from "./NeoplasmList";
import SurgeryList from "./SurgeryList";
import Address from "./UI/Address";
import Date from "./UI/Date";
import FullName from "./UI/FullName";
import Gender from "./UI/Gender";

interface Props {
  /**
   * Patient id
   */
  id: number;
}

export default function PatientDetail(props: Props) {
  const { id } = props;

  return (
    <Query query={subjectByIdQuery} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Cargando...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }

        const {
          ic,
          first_name,
          last_name,
          medical_record,
          gender,
          race,
          date_of_birth,
          address,
          municipality,
          neoplasms,
          chemotherapies,
          surgeries
        } = data.subject;

        return (
          <>
            <Grid item xs={12}>
              <FullName
                firstName={first_name}
                lastName={last_name}
                variant="title"
                align="center"
                // color="secondary"
              />
              <Date
                date={date_of_birth}
                fromNow
                variant="subtitle1"
                align="center"
                color="textSecondary"
              />
            </Grid>
            <Grid
              container
              item
              spacing={16}
              style={{
                padding: "0 10px 0 10px",
                height: "90%",
                overflow: "auto"
              }}
            >
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Carné de Identidad</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{ic}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Historia Clínica</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{medical_record}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Género</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Gender gender={gender} />
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Raza</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{race.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Fecha de Nacimiento</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Date date={date_of_birth} />
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Dirección</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Address address={address} municipality={municipality} />
              </Grid>
              <Grid item xs={12}>
                <NeoplasmList {...props} neoplasms={neoplasms} />
              </Grid>
              <Grid item xs={12}>
                <SurgeryList {...props} surgeries={surgeries} />
              </Grid>
              <Grid item xs={12}>
                <ChemotherapyList {...props} chemotherapies={chemotherapies} />
              </Grid>
            </Grid>
          </>
        );
      }}
    </Query>
  );
}
