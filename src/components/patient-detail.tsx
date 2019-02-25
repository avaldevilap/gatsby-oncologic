import * as moment from "moment";
import * as React from "react";
import { Query } from "react-apollo";

import { Card, CardHeader, CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { subjectByIdQuery_subject } from "../graphql/__generated__/subjectByIdQuery";
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
          age_at_diagnosis,
          gender,
          race,
          date_of_birth,
          address,
          municipality,
          neoplasms,
          chemotherapies,
          surgeries
        }: subjectByIdQuery_subject = data.subject;

        return (
          <Card>
            <CardHeader
              title={`${first_name} ${last_name}`}
              subheader={moment(date_of_birth).fromNow(true)}
            />
            <CardContent>
              <Grid container spacing={16}>
                <Grid container item xs={6}>
                  <Grid item>1</Grid>
                  <Grid item>2</Grid>
                </Grid>
                <Grid container item xs={6}>
                  <Grid item>1</Grid>
                  <Grid item>2</Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Carné de Identidad
                  </Typography>
                  <Typography>{ic}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Historia Clínica</strong>
                  </Typography>
                  <Typography>{medical_record}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>
                      <abbr title="Edad al momento del diagnóstico">Edad</abbr>
                    </strong>
                  </Typography>
                  <Date value={age_at_diagnosis} fromNow />
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>Género</strong>
                  </Typography>
                  <Gender gender={gender} />
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <strong>Raza</strong>
                  </Typography>
                  <Typography>{race.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Fecha de Nacimiento</strong>
                  </Typography>
                  <Date value={date_of_birth} />
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Dirección</strong>
                  </Typography>
                  <Address address={address} municipality={municipality} />
                </Grid>
                <Grid item xs={12}>
                  {neoplasms.length > 0 ? (
                    <NeoplasmList {...props} neoplasms={neoplasms} />
                  ) : null}
                  {surgeries.length > 0 ? (
                    <SurgeryList {...props} surgeries={surgeries} />
                  ) : null}
                  {chemotherapies.length > 0 ? (
                    <ChemotherapyList
                      {...props}
                      chemotherapies={chemotherapies}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      }}
    </Query>
  );
}
