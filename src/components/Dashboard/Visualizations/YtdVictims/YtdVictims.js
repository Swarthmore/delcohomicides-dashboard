import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useStyles as useVisStyles } from '../VisContainer/styles'

export const YtdVictims = ({ incidents, toYear, fromYear, ...rest }) => {

  const [toYearIncidents, setToYearIncidents] = useState(0);
  const [fromYearIncidents, setFromYearIncidents] = useState(0);
  const [pctChange, setPctChange] = useState(undefined);

  const classes = useVisStyles()

  /**
   * Calculates in percent, the change between 2 numbers.
   * e.g from 1000 to 500 = 50%
   *
   * @param oldNumber The initial value
   * @param newNumber The value that changed
   */
  const getPercentageChange = (oldNumber, newNumber) => {
    const decreaseValue = oldNumber - newNumber;
    const num = ((decreaseValue / oldNumber) * 100).toFixed(2);
    return parseFloat(num * -1);
  };

  useEffect(() => {
    const fromIncidents = incidents.filter(
      (incident) => incident.year === fromYear.toString()
    ).length;
    const toIncidents = incidents.filter(
      (incident) => incident.year === toYear.toString()
    ).length;
    const pctChange = getPercentageChange(fromIncidents, toIncidents);
    setFromYearIncidents(fromIncidents);
    setToYearIncidents(toIncidents);
    setPctChange(pctChange);
  }, [incidents, fromYear, toYear]);

  return (
    <Typography>
      % Change: {pctChange >= 0 && "+"}
      {pctChange}%
    </Typography>
  );
};

YtdVictims.propTypes = {
  incidents: PropTypes.array.isRequired,
  fromYear: PropTypes.number.isRequired,
  toYear: PropTypes.number.isRequired,
};
