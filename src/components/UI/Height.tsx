import * as React from "react";
import Typography from "@material-ui/core/Typography";

export default function Height({ value }: { value: number }, ...props) {
  return <Typography {...props}>{`${value} cm`}</Typography>;
}
