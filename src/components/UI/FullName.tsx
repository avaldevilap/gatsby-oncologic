import * as React from "react";

import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {
  firstName: string;
  lastName: string;
}

export default function FullName({ firstName, lastName, ...props }: Props) {
  return <Typography {...props}>{`${firstName} ${lastName}`}</Typography>;
}
