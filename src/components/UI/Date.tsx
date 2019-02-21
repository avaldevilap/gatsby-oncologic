import * as moment from "moment";
import * as React from "react";

import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {
  date: string;
  fromNow?: boolean;
}

export default function Date({ date, fromNow, ...props }: Props) {
  if (fromNow) {
    return <Typography {...props}>{moment(date).fromNow(true)}</Typography>;
  }
  return <Typography {...props}>{moment(date).format("LL")}</Typography>;
}
