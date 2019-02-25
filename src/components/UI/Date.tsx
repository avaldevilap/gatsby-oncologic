import * as moment from "moment";
import * as React from "react";

import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {
  value: string;
  fromNow?: boolean;
}

export default function Date({ value, fromNow, ...props }: Props) {
  if (fromNow) {
    return <Typography {...props}>{moment(value).fromNow(true)}</Typography>;
  }
  return <Typography {...props}>{moment(value).format("LL")}</Typography>;
}
