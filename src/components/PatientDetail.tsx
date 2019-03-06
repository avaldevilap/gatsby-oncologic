import * as moment from "moment";
import * as React from "react";
import { Query } from "react-apollo";

import { Card, CardHeader, CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { subjectByIdQuery_subject as Patient } from "../graphql/__generated__/subjectByIdQuery";
import ChemotherapyList from "./ChemotherapyList";
import NeoplasmList from "./NeoplasmList";
import SurgeryList from "./SurgeryList";
import Address from "./UI/Address";
import DateFormat from "./UI/Date";
import Gender from "./UI/Gender";
import gql from "graphql-tag";
import {
  formatRelative,
  format,
  subYears,
  differenceInYears,
  formatDistance
} from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  id: number;
}

export default function PatientDetail(props: Props) {
  const { id } = props;

  return (
    <Query
      query={gql`
        query subjectByIdQuery($id: Int!) {
          subject: subjects_subject_by_pk(id: $id) {
            id
            ic
            first_name
            last_name
            medical_record
            age_at_diagnosis
            gender
            race: subjectsRaceByraceLinkId {
              name
            }
            date_of_birth
            address
            municipality: subjectsMunicipalityBymunicipalityId {
              name
              county: subjectsCountyBycountyId {
                name
              }
            }
            neoplasms: subjectsDescriptionofthisneoplasmsBysubjectId {
              id
              topography: icdOTopographyByprimarySiteId {
                code
                description
              }
              morphology: icdOMorphologyByhistologicTypeId {
                code
                description
              }
            }
            chemotherapies {
              id
              protocol {
                name
              }
              date
            }
            surgeries: surgeriesSurgerysBysubjectId {
              id
              date
            }
          }
        }
      `}
      variables={{ id }}
    >
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
        }: Patient = data.subject;

        const age = differenceInYears(new Date(), new Date(date_of_birth));
        return (
          <Card>
            <CardHeader
              title={`${first_name} ${last_name}`}
              subheader={`${age} años`}
            />
            <CardContent style={{ overflow: "auto" }}>
              {/* <Grid container spacing={16}> */}
              {/* </Grid> */}
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td>
                      <Typography style={{ fontWeight: "bold" }}>
                        Carné de Identidad
                      </Typography>
                    </td>
                    <td>
                      <Typography>{ic}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography style={{ fontWeight: "bold" }}>
                        Historia Clínica
                      </Typography>
                    </td>
                    <td>
                      <Typography>{medical_record}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography>
                        <strong>
                          <abbr title="Edad al momento del diagnóstico">
                            Edad
                          </abbr>
                        </strong>
                      </Typography>
                    </td>
                    <td>
                      <DateFormat value={age_at_diagnosis} fromNow />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography>
                        <strong>Género</strong>
                      </Typography>
                    </td>
                    <td>
                      <Gender gender={gender} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography>
                        <strong>Raza</strong>
                      </Typography>
                    </td>
                    <td>
                      <Typography>{race.name}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography>
                        <strong>Fecha de nacimiento</strong>
                      </Typography>
                    </td>
                    <td>
                      <DateFormat value={date_of_birth} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography>
                        <strong>Dirección</strong>
                      </Typography>
                    </td>
                    <td style={{ width: "50%" }}>
                      <Address address={address} municipality={municipality} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Grid container spacing={16}>
                {/* <Grid container item xs={6}>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Carné de Identidad
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Historia Clínica
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>
                        <abbr title="Edad al momento del diagnóstico">
                          Edad
                        </abbr>
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Género</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Raza</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Fecha de nacimiento</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Dirección</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                  <Grid item xs={12}>
                    <Typography>{ic}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{medical_record}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <DateFormat value={age_at_diagnosis} fromNow />
                  </Grid>
                  <Grid item xs={12}>
                    <Gender gender={gender} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{race.name}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <DateFormat value={date_of_birth} />
                  </Grid>
                  <Grid item xs={12}>
                    <Address address={address} municipality={municipality} />
                  </Grid>
                </Grid> */}
                {/* <Grid item xs={6}>
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
                  <DateFormat value={age_at_diagnosis} fromNow />
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
                  <DateFormat value={date_of_birth} />
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Dirección</strong>
                  </Typography>
                  <Address address={address} municipality={municipality} />
                </Grid> */}
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
