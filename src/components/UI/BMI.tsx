import * as React from "react";

import Typography from "@material-ui/core/Typography";

export interface BMIProps {
  stature: number;
  weight: number;
}

const BMI: React.FC<BMIProps> = ({ stature, weight, ...rest }) => {
  const bmi: number = weight / Math.pow(stature / 100, 2);
  let color: string = "";
  if (bmi < 18.5) {
    color = "yellow";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    color = "green";
  }
  if (bmi >= 25 && bmi <= 29.9) {
    color = "orange";
  }
  if (bmi >= 30) {
    color = "red";
  }
  return (
    <Typography {...rest} style={{ color }}>
      {bmi.toFixed(2)}
    </Typography>
  );
};

export default BMI;
