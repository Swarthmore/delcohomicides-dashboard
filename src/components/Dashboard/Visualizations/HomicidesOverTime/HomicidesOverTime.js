import React, { useState, useEffect } from "react";
import {
  groupIncidentsByYearAndVictimRace,
  victimsByRaceByYearChartData,
} from "../../../../processors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { raceColormap } from "../../../../colors";
import { VisContainer } from '../VisContainer/VisContainer'
import { DefaultPlaceholder } from "../DefaultPlaceholder";

export const HomicidesOverTime = ({
  incidents,
  years,
  races,
  genders,
  weapons,
  title = 'Homicides over Time',
  isDarkMode
}) => {

  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const grouped = groupIncidentsByYearAndVictimRace({
      incidents,
      years,
      races,
    });
    const data = victimsByRaceByYearChartData({ grouped });    
    setChartData(data);
  }, [incidents, years, races]);

  return (
    <VisContainer 
      title={title}
      chart={
          <LineChart data={chartData}>
            <CartesianGrid strokeDashArray={"3 3"} />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip labelStyle={{ color: '#000', fontWeight: 'bold' }} />
            <Legend />

            {/* Add a line to show the total number of homicides */}
            <Line
              type="monotone"
              dataKey='total'
              stroke='#f00'
              dot={false}
              activeDot={false}
              name='Total Incidents'
            />

            {races.map((race, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={race}
                stroke={raceColormap[race] || "black"}
                dot={{ 'stroke': raceColormap[race], strokeWidth: '3' }}
              />
            ))}
          </LineChart>
      }
      isLoaded={incidents.length > 0}
      placeholder={<DefaultPlaceholder/>}
    />
  );
};