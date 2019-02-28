import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import { AutoSizer, List, ListRowProps } from "react-virtualized";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "@reach/router";

import { allSubjectsQuery as queryData } from "../graphql/__generated__/allSubjectsQuery";
import allSubjectsQuery from "../graphql/allSubjectsQuery.graphql";
import SubjectSearchForm, { FilterFormValues } from "./SubjectSearchForm";
import Pluralize from "react-pluralize";
import queryString from "query-string";

export interface SubjectListProps {
  filters?: FilterFormValues;
  onLoad?: (count: number) => void;
}

function SubjectList(props: SubjectListProps & RouteComponentProps) {
  const [filters, setFilters] = React.useState({});

  const { search } = queryString.parse(props.location.search);

  const { data, error, loading } = useQuery(allSubjectsQuery, {
    variables: { value: search }
  });

  const { subjects }: queryData = data;

  if (error) {
    return `Error! ${error.message}`;
  }

  if (loading) {
    return <span>Cargando...</span>;
  }

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const { id, first_name, last_name } = subjects.nodes[index];

    return (
      <ListItem
        key={key}
        style={style}
        button
        divider
        onClick={() => {
          props.navigate("/subjects", {
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
  };

  return (
    <>
      <SubjectSearchForm {...props} onSubmit={values => setFilters(values)} />
      <Divider />
      {data.subjects.nodes.length > 0 ? (
        <AutoSizer>
          {({ width, height }) => (
            <>
              <List
                rowCount={data.subjects.nodes.length}
                width={width}
                height={height - 66}
                rowHeight={66}
                rowRenderer={rowRenderer}
              />
              <Typography style={{ width }}>
                <Pluralize
                  singular="paciente"
                  count={subjects.aggregate.count}
                />
              </Typography>
            </>
          )}
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
