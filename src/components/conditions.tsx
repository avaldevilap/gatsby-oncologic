import * as moment from "moment";
import * as React from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function Conditions(props: any) {
  function rowRenderer({ key, index, style }: ListRowProps) {
    const condition = props.conditions[index].resource;
    return (
      <ListItem key={key} style={style} button divider>
        <ListItemText
          primary={condition.code.text}
          secondary={moment(condition.onset.dateTime).format("LL")}
        />
      </ListItem>
    );
  }

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          rowCount={props.conditions.length}
          width={width}
          height={height}
          rowHeight={66}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
}
