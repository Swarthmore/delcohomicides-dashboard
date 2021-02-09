import React from "react";
import { Button } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/Filter";

export const FilterButton = (props) => {
  return (
    <Button {...props} startIcon={<FilterIcon />}>
      Filter data
    </Button>
  );
};
