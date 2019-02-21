import * as Moment from "moment";
import * as React from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export default function Procedures(props: any) {
  function rowRenderer({ key, index, style }: ListRowProps) {
    const procedure = props.procedures[index].resource;

    const start = moment(procedure.performed.Period.start);
    const end = moment(procedure.performed.Period.end);
    const duration = moment.range(start, end).diff("minute");

    return (
      <ListItem key={key} style={style} button divider>
        <ListItemText
          primary={procedure.code.text}
          secondary={`${start.format("h:mm a")} - ${end.format(
            "h:mm a"
          )} ${duration} minutos`}
        />
      </ListItem>
    );
  }

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          rowCount={props.procedures.length}
          width={width}
          height={height - 66}
          rowHeight={66}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
}
