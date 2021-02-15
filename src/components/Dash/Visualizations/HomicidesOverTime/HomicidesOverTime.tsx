import * as React from "react";
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
import { WordpressContext } from "../../../../contexts/Wordpress";
import { FiltersContext } from "../../../../contexts/Filters";
import VisContainer from "../../VisContainer/VisContainer";
import { fillYearsArray } from "../../../../helpers";

export default function HomicidesOverTime() {
    
    const data = React.useContext(WordpressContext);
    const filters = React.useContext(FiltersContext); 
    
    const title = "Homicides Over Time";
    const races = filters.values.victimRaces
    const years = fillYearsArray(filters.values.startYear, filters.values.endYear); 
    
    if (!data.isLoaded) return <div>Loading data...</div>

    const groupedData = groupIncidentsByYearAndVictimRace({
        incidents: data.formatted,
        years,
        races,
    });
    
    const chartData = victimsByRaceByYearChartData({ grouped: groupedData });    
    
    const ChartJSX = (
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
            