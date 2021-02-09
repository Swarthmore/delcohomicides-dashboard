import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  filterGroupedByAgeData,
  groupIncidentsByAgeGroups,
  victimsByAgeBarChartData,
} from "../../../../processors";
import { colors } from "../../../../colors";
import PropTypes from "prop-types";
import { VisContainer } from '../VisContainer/VisContainer'
import { DefaultPlaceholder } from "../DefaultPlaceholder";

const purple = colors[2][500];

export const VictimsByAge = ({
  incidents,
  years,
  races,
  weapons,
  genders,
  title = 'Victims by Age',
  isDarkMode
}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const grouped = groupIncidentsByAgeGroups(incidents);
    const filtered = filterGroupedByAgeData({
      groupedData: grouped,
      years: years,
      races: races,
      weapons: weapons,
      genders: genders,
    });
    const victimsByAge = victimsByAgeBarChartData(filtered);
    setChartData(victimsByAge);
  }, [incidents, years, races, weapons, genders]);

  return (
    <VisContainer
      title={title}
      chart={
        <BarChart data={chartData}>
          <CartesianGrid strokeDashArray={"3 3"} />
          <XAxis dataKey={"name"} />
          <YAxis />
          <Tooltip labelStyle={{ color: '#000', fontWeight: 'bold' }} />
          <Legend />
          <Bar dataKey={"victims"} fill={purple} stackId={"a"} />
        </BarChart>
      }
      isLoaded={incidents.length > 0}
      placeholder={<DefaultPlaceholder/>}
    />
  );
};

VictimsByAge.defaultProps = {
  years: [],
  races: [],
  weapons: [],
  genders: [],
};

VictimsByAge.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  years: PropTypes.array,
  races: PropTypes.array,
  weapons: PropTypes.array,
  genders: PropTypes.array,
  isDarkMode: PropTypes.bool
};
