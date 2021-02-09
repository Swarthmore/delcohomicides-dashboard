import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, Legend } from "recharts";
import { raceColormap } from "../../../../colors";
import { DefaultPlaceholder } from "../DefaultPlaceholder";
import {VisContainer} from '../VisContainer/VisContainer'

const renderActiveShape = (props, isDarkMode) => {

  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={isDarkMode ? '#fff' : fill}>
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />

      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={isDarkMode ? '#fff' : '#000'}
      >{`${value}`}</text>

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={isDarkMode ? '#fff' : '#000'}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const VictimsByRaceChart = ({
  incidents,
  years,
  races,
  weapons,
  genders,
  title = 'Victims by Race',
  isDarkMode
}) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState([]);

  const groupByRace = (data) => {
    const o = {};
    data.forEach(({ victim_race: race }) => {
      o[race] ? o[race]++ : (o[race] = 1);
    });
    return o;
  };

  // Generate the pie chart data
  const generateData = () => {
    const byRace = groupByRace(incidents);
    const d = Object.keys(byRace).map((k) => ({
      name: k,
      value: byRace[k],
    }));
    setChartData(d);
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    generateData();
  }, [incidents, years, races, weapons, genders]);

  return (
    <VisContainer
      title={title}
      chart={
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={props => renderActiveShape(props, isDarkMode)}
            data={chartData}
            innerRadius={60}
            outerRadius={80}
            fill="#f00"
            onMouseEnter={onPieEnter}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={raceColormap[entry.name] || "#ccc"}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      }
      isLoaded={incidents.length > 0}
      placeholder={<DefaultPlaceholder/>}
    />
    )
};
