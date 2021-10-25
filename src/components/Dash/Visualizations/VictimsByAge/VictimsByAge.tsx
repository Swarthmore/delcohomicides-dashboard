import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import {
  filterGroupedByAgeData,
  groupIncidentsByAgeGroups,
  victimsByAgeBarChartData,
} from "../../../../processors";
import { colors } from "../../../../colors";
import { WordpressContext } from "../../../../contexts/Wordpress";
import { FiltersContext } from "../../../../contexts/Filters";
import VisContainer from "../../VisContainer/VisContainer";
import { fillYearsArray } from "../../../../helpers";

const purple = colors[2][500];

export default function VictimsByAge() {
    const data = React.useContext(WordpressContext);
    const filters = React.useContext(FiltersContext); 

    const title = "Victims by Age";
    const races = filters.values.victimRaces
    const years = fillYearsArray(filters.values.startYear.toString(), filters.values.endYear.toString()); 
    const weapons = filters.values.weaponTypes;
    const genders = [];
    
    const m = filters.values.maleCbox;
    const f = filters.values.femaleCbox;

    if (m) genders.push("Male");
    if (f) genders.push("Female");

    const groupedData = groupIncidentsByAgeGroups(data.formatted);
    const filteredData = filterGroupedByAgeData({
      groupedData, years, races, weapons, genders,
    });

    const chartData = victimsByAgeBarChartData(filteredData);

    const ChartJSX = (
        <BarChart data={chartData}>
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip labelStyle={{ color: '#000' }} />
            <Legend />
            <Bar dataKey={"victims"} fill={purple} stackId={"a"} />
        </BarChart>
    );
    
    return <VisContainer chart={ChartJSX} title={title} />;

}
