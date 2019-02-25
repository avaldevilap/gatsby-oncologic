import * as moment from "moment";
import * as React from "react";
import { Query } from "react-apollo";
import { AutoSizer, List, ListRowProps } from "react-virtualized";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import allSubjectsQuery from "../graphql/allSubjectsQuery.graphql";
import { ListItemAvatar, Avatar } from "@material-ui/core";

export default React.memo(function SubjectList(props: any) {
  return (
    <Query query={allSubjectsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Cargando...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        return (
          <AutoSizer>
            {({ width, height }) => (
              <List
                rowCount={data.subjects.nodes.length}
                width={width}
                height={height}
                rowHeight={66}
                rowRenderer={({ key, index, style }: ListRowProps) => {
                  const {
                    id,
                    first_name,
                    last_name,
                    age_at_diagnosis
                  } = data.subjects.nodes[index];

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
                        <Avatar>{`${first_name.charAt(0)}${last_name.charAt(
                          0
                        )}`}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${first_name} ${last_name}`}
                        // secondary={moment(age_at_diagnosis).fromNow(true)}
                      />
                    </ListItem>
                  );
                }}
              />
            )}
          </AutoSizer>
        );
      }}
    </Query>
  );
});
