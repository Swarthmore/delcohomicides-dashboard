import * as React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";
import { raceColormap } from "../../../../colors";
import { FiltersContext } from "../../../../contexts/Filters";
import VisContainer from "../../VisContainer/VisContainer";
import { fillYearsArray, filterIncidents, groupBy } from "../../../../helpers";
import { WordpressContext } from "../../../../contexts/Wordpress";
import { FormattedIncident, DGVField } from "../../../../types/index";

export default function HomicidesOverTime() {
    
    const filters = React.useContext(FiltersContext); 
    const { formatted: data } = React.useContext(WordpressContext);
    
    const title = "Homicides Over Time";
    const races = filters.values.victimRaces

    const genders = [];
    const m = filters.values.maleCbox;
    const f = filters.values.femaleCbox;

    if (m) genders.push("Male");
    if (f) genders.push("Female");

    // filter the incidents
    const filteredData = filterIncidents(data, {
        races: filters.values.victimRaces,
        genders,
        years: fillYearsArray(filters.values.startYear.toString(), filters.values.endYear.toString()).map(i => i.toString()),
        weapons: filters.values.weaponTypes
    });

    type ChartDatarow = {
        [race in DGVField.VictimRace]: string;
    } & {
        name: string;
    };

    function generateChartData(data: FormattedIncident[]): ChartDatarow[] {
        const grouped = groupBy(data, "year");
        return Object.keys(grouped).map(year => ({
            name: year,
            "Black": grouped[year].filter(o => o.victim_race === "Black").length.toString(),
            "Asian/Pacific Islander": grouped[year].filter(o => o.victim_race === "Asian/Pacific Islander").length.toString(),
            "Hispanic": grouped[year].filter(o => o.victim_race === "Hispanic").length.toString(),
            "Missing": grouped[year].filter(o => o.victim_race === "Missing").length.toString(),
            "Other": grouped[year].filter(o => o.victim_race === "Other").length.toString(),
            "Unknown": grouped[year].filter(o => o.victim_race === "Unknown").length.toString(),
            "White": grouped[year].filter(o => o.victim_race === "White").length.toString(),
            total: grouped[year].length
        }));
    }

    const chartData = generateChartData(filteredData);

    const ChartJSX = (
        <LineChart data={chartData}>
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
                name='Total'
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
    );
            
    return <VisContainer chart={ChartJSX} title={title} />;
                
}
