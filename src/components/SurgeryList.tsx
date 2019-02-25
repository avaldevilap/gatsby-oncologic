import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Date from "./UI/Date";
import ListSubheader from "@material-ui/core/ListSubheader";

export default function SurgeryList(props: any) {
  const { surgeries } = props;

  if (surgeries.length > 0) {
    return (
      <List subheader={<ListSubheader component="div">Cirugías</ListSubheader>}>
        {surgeries.map(({ date }, index) => (
          <ListItem key={index} button divider>
            <ListItemText
              // primary={protocol.name}
              secondary={<Date value={date} />}
            />
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <List subheader={<ListSubheader component="div">Cirugías</ListSubheader>}>
      <ListItem>
        <ListItemText primary="No existe" />
      </ListItem>
    </List>
  );
}
