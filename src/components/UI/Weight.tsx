import * as React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface Props {
  value: number;
  kg2lb?: boolean;
  kg2oz?: boolean;
  kg2g?: boolean;
}

export default function Weight(
  { value, kg2lb, kg2oz, kg2g }: Props,
  ...props: TypographyProps[]
) {
  if (kg2lb) {
    return <Typography {...props}>{`${value * 2.2046} lb`}</Typography>;
  }
  if (kg2oz) {
    return <Typography {...props}>{`${value * 35.274} oz`}</Typography>;
  }
  if (kg2g) {
    return <Typography {...props}>{`${value * 1000} g`}</Typography>;
  }
  return <Typography {...props}>{`${value} kg`}</Typography>;
}
