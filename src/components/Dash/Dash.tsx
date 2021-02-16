import { Button } from "@material-ui/core";
import * as React from "react";
import { FiltersContext } from "../../contexts/Filters";
import { WordpressContext } from "../../contexts/Wordpress";
import { useStyles } from "./useStyles";
import HomicidesOverTime from "./Visualizations/HomicidesOverTime/HomicidesOverTime";
import VictimsByAge from "./Visualizations/VictimsByAge/VictimsByAge";
import VictimsByRace from "./Visualizations/VictimsByRace/VictimsByRace";
import VictimsMap from "./Visualizations/VictimsMap/VictimsMap";
import { filterIncidents, fillYearsArray } from "../../helpers";

export default function Dash({ onOpen }) {

    const filters = React.useContext(FiltersContext);
    const data = React.useContext(WordpressContext);

    const classes = useStyles();

    const genders = [];
    const m = filters.values.maleCbox;
    const f = filters.values.femaleCbox;

    if (m) genders.push("Male");
    if (f) genders.push("Female");

    // filter the incidents
    const filteredData = filterIncidents(data.formatted, {
        races: filters.values.victimRaces,
        genders,
        years: fillYearsArray(filters.values.startYear.toString(), filters.values.endYear.toString()).map(i => i.toString()),
        weapons: filters.values.weaponTypes
    });

    return (
        <div className={classes.dashboard}>
            
            <div className={classes.flexRow}>
                <div className={classes.stats}>
                    Showing <span className={classes.bigStat}>{filteredData.length}</span> total incidents from <span className={classes.bigStat}>{filters.values.startYear}</span> to <span className={classes.bigStat}>{filters.values.endYear}</span>
                </div>
            </div>

            <div className={classes.flexRow}>
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{filters.values.startYear} Total Homicides</div>
                    <div className={classes.smallCardValue}>NA</div>
                </div>
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{filters.values.endYear} Total Homicides</div>
                    <div className={classes.smallCardValue}>NA</div>
                </div>
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>% change from {filters.values.startYear} to {filters.values.endYear}</div>
                    <div className={classes.smallCardValue}>NA</div>
                </div>
                <div className={classes.actionsContainer}>
                    <Button onClick={onOpen}>Filter</Button>
                </div>
            </div>

            <div className={classes.mainChart}>
                <VictimsMap />
            </div>

            <div className={classes.secondaryCharts}>
                <div className={classes.secondaryChart}>
                    <HomicidesOverTime />
                </div>
                <div className={classes.secondaryChart}>
                    <VictimsByAge />
                </div>
                <div className={classes.secondaryChart}>
                    <VictimsByRace />
                </div>
            </div>

        </div>
    );

}
