import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import ICD from "./UI/ICD";

export default function NeoplasmList(props: any) {
  const { neoplasms, navigate, location } = props;

  return (
    <List
      dense
      subheader={<ListSubheader component="div">Neoplasias</ListSubheader>}
    >
      {neoplasms.map(({ id, topography, morphology }, index) => (
        <ListItem
          key={index}
          button
          divider
          onClick={() =>
            navigate("/subjects", {
              state: { ...location.state, neoplasmId: id }
            })
          }
        >
          <ListItemText
            primary={<ICD icd={topography} />}
            secondary={<ICD icd={morphology} />}
          />
        </ListItem>
      ))}
    </List>
  );
}
