import * as React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { raceColormap } from "../../../../colors";
import VisContainer from "../../VisContainer/VisContainer";
import { FiltersContext } from "../../../../contexts/Filters";
import { fillYearsArray, filterIncidents, groupBy } from "../../../../helpers";
import { WordpressContext } from "../../../../contexts/Wordpress";
import { FormattedIncident, DGVField } from "../../../../types/index";
import renderActiveShape from "./helpers";

export default function VictimsByRaceChart() {
    
    const [activeIndex, setActiveIndex] = React.useState(0); 

    const filters = React.useContext(FiltersContext);
    const { formatted: data } = React.useContext(WordpressContext);

    const title = "Victims by Race";
    const races = filters.values.victimRaces;

    const genders = [];
    const m = filters.values.maleCbox;
    const f = filters.values.femaleCbox;

    if (m) genders.push("Male");
    if (f) genders.push("Female");

    const filteredData = filterIncidents(data, {
        races: filters.values.victimRaces,
        genders,
        years: fillYearsArray(filters.values.startYear.toString(), filters.values.endYear.toString()).map(n => n.toString()),
        weapons: filters.values.weaponTypes
    });

    type ChartDatarow = {
        name: string;
        value: string;
    };

    function generateChartData(data: FormattedIncident[]): ChartDatarow[] {
        const grouped = groupBy(data, "victim_race");
        return Object.keys(grouped).map(race => ({
            name: race,
            value: grouped[race].length
        }))
    }

    const chartData = generateChartData(filteredData);

    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    const ChartJSX = (
        <PieChart height={250}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            innerRadius={30}
            outerRadius={50}
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
    );

    return <VisContainer chart={ChartJSX} title={title} />;

}
