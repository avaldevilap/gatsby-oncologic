import * as React from "react";

export default function ICD({ icd }: any) {
  if (icd) {
    return `${icd.code} - ${icd.description}`;
  }
  return "No existe";
}
