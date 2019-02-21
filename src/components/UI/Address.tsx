import * as React from "react";

import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {
  address: string;
  municipality: { name: string; county: { name: string } };
}

export default function Address({ address, municipality, ...props }: Props) {
  return (
    <Typography {...props} component="div">
      <address>{`${address
        .toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase())}, ${municipality.name}, ${
        municipality.county.name
      }`}</address>
    </Typography>
  );
}
