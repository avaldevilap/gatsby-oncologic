import * as React from "react";

import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {
  value: string;
}

export default function Laterality({ value, ...props }: Props) {
  switch (value) {
    case "2":
      return (
        <Typography {...props} component="div">
          Derecho
        </Typography>
      );
    case "3":
      return (
        <Typography {...props} component="div">
          Derecho
        </Typography>
      );

    default:
      return null;
  }
}
