import React from "react";

import { storiesOf } from "@storybook/react";
import { wInfo } from "../utils";
import FilterForm from "../src/components/FilterForm";

storiesOf("Welcome", module).addWithJSX(
  "to your new Storybook🎊",
  wInfo(`


    ### Notes

    Hello world!:

    ### Usage
    ~~~js
    <div>This is an example component</div>
    ~~~

    ### To use this Storybook

    Explore the panels on the left.
  `)(() => <FilterForm />)
);
