import * as React from "react";

import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {
  gender: number;
}

export default function Gender({ gender, ...props }: Props) {
  return (
    <Typography {...props}>
      {gender === 1 ? "Masculino" : "Femenino"}
    </Typography>
  );
}
