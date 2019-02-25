import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Date from "./UI/Date";
import ListSubheader from "@material-ui/core/ListSubheader";

export default function ChemotherapyList(props: any) {
  const { chemotherapies, navigate, location } = props;

  return (
    <List
      dense
      subheader={<ListSubheader component="div">Quimioterapias</ListSubheader>}
    >
      {chemotherapies.map(({ id, protocol, date }, index) => (
        <ListItem
          key={index}
          button
          divider
          onClick={() =>
            navigate("/subjects", {
              state: { ...location.state, chemotherapyId: id }
            })
          }
        >
          <ListItemText
            primary={protocol.name}
            secondary={<Date value={date} variant="caption" component="span" />}
          />
        </ListItem>
      ))}
    </List>
  );
}
