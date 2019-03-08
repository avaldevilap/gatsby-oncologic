import gql from "graphql-tag";
import queryString from "query-string";
import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import Pluralize from "react-pluralize";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, FixedSizeList, ListChildComponentProps } from "react-window";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "@reach/router";

import { allSubjectsQuery as queryData } from "../graphql/__generated__/allSubjectsQuery";
import SubjectSearchForm, { FilterFormValues } from "./SubjectSearchForm";

export interface SubjectListProps {
  filters?: FilterFormValues;
  onLoad?: (count: number) => void;
}

function SubjectList({
  navigate,
  location
}: SubjectListProps & RouteComponentProps) {
  const { search } = queryString.parse(location.search);

  const { data, error, loading } = useQuery<queryData>(
    gql`
      query allSubjectsQuery($value: String) {
        subjects: subjects_subject_aggregate(
          where: {
            _or: [
              { ic: { _ilike: $value } }
              { medical_record: { _ilike: $value } }
              { first_name: { _ilike: $value } }
              { last_name: { _ilike: $value } }
            ]
          }
        ) {
          aggregate {
            count
          }
          nodes {
            id
            ic
            first_name
            last_name
            age_at_diagnosis
          }
        }
      }
    `,
    {
      variables: { value: search }
    }
  );

  const { subjects } = data;

  if (error) {
    return `Error! ${error.message}`;
  }

  if (loading) {
    return <LinearProgress />;
  }

  const Row = React.memo(({ index, style }: ListChildComponentProps) => {
    const { id, first_name, last_name } = subjects.nodes[index];

    return (
      <ListItem
        style={style}
        button
        divider
        onClick={() => {
          navigate(`/subjects${location.search}`, {
            state: { subjectId: id }
          });
        }}
      >
        <ListItemAvatar>
          <Avatar>{`${first_name.charAt(0)}${last_name.charAt(0)}`}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${first_name} ${last_name}`}
          // secondary={moment(age_at_diagnosis).fromNow(true)}
        />
      </ListItem>
    );
  }, areEqual);

  return (
    <>
      <SubjectSearchForm navigate={navigate} location={location} />
      <Divider />
      {data.subjects.nodes.length > 0 ? (
        <AutoSizer>
          {({ height, width }) => {
            return (
              <>
                <FixedSizeList
                  width={width}
                  height={height - 68}
                  itemCount={data.subjects.nodes.length}
                  itemSize={66}
                >
                  {Row}
                </FixedSizeList>
                <Typography style={{ width }}>
                  <Pluralize
                    singular="paciente"
                    count={subjects.aggregate.count}
                  />
                </Typography>
              </>
            );
          }}
        </AutoSizer>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "90%" }}
        >
          <Grid item>
            <Typography variant="caption">Sin resultados</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default SubjectList;
