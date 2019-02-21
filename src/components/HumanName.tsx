import * as React from "react";

export default function HumanName({ names }: { names: HumanName[] }) {
  names.map(({ use, text, prefix }) => {
    if (use === "official") {
      if (text !== "") {
        if (prefix.length > 0) {
          return `${prefix[0]} ${text}`;
        }
        return `${text}`;
      } else if () {
          
      }
    }
  });
  return <></>;
}
