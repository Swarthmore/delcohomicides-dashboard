import { Button, Grid, Typography, Paper } from "@mui/material";
import * as React from "react";
import { FiltersContext } from "../../contexts/Filters";
import { WordpressContext } from "../../contexts/Wordpress";
import { useStyles } from "./useStyles";
import HomicidesOverTime from "./Visualizations/HomicidesOverTime/HomicidesOverTime";
import VictimsByAge from "./Visualizations/VictimsByAge/VictimsByAge";
import VictimsByRace from "./Visualizations/VictimsByRace/VictimsByRace";
import VictimsMap from "./Visualizations/VictimsMap/VictimsMap";
import { filterIncidents, fillYearsArray } from "../../helpers";
import CountUp from "react-countup";
import { CountUpChart } from "./CountUpChart";

export default function Dash({ onOpen, filtersOpen }) {

    const filters = React.useContext(FiltersContext);
    const data = React.useContext(WordpressContext);

    const classes = useStyles();

    // return the array of incidents occuring in given year
    const incidentsInYear = (arr, yr) => arr.filter(
        (inc) => inc.year === yr.toString()
    ).length;

    /**
     * Calculates in percent, the change between 2 numbers.
     * e.g from 1000 to 500 = 50%
     *
     * @param oldNumber The initial value
     * @param newNumber The value that changed
     */
    function getPctChange(oldNumber, newNumber) {
        const decreaseValue = oldNumber - newNumber;
        const num = +((decreaseValue / oldNumber) * 100).toFixed(2);
        return parseFloat((num * -1).toString());
    };

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

    //console.log({ filteredData });

    const startHomicides = incidentsInYear(data.formatted, filters.values.startYear);
    const endHomicides = incidentsInYear(data.formatted, filters.values.endYear);
    const pctChange = getPctChange(startHomicides, endHomicides);

    return (

        <>
            <Grid container>

                <Grid item xs={12} className={classes.row} spacing={1}>
                    <Paper elevation={2}>
                        <Typography variant="subtitle2" style={{ float: 'left', paddingLeft: '10px' }}>
                            Showing <span className={classes.bigStat}><CountUp start={0} end={filteredData.length} /></span> total incidents from <span className={classes.bigStat}>{filters.values.startYear}</span> to <span className={classes.bigStat}>{filters.values.endYear}</span>
                        </Typography>
                    </Paper>
                    <Button style={{ float: 'right', marginRight: '10px' }} onClick={onOpen} size="large" color="primary" variant="contained">Click to filter incidents</Button>
                </Grid>

                <Grid container className={classes.row} spacing={1}>
                    <Grid item xs={12} md={6}>
                        <VictimsMap filtersOpen={filtersOpen} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <HomicidesOverTime />
                        <Grid container spacing={1} className={classes.row}>
                            <Grid item xs={12} md={6}>
                                <VictimsByAge />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <VictimsByRace />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.row} spacing={1}>
                    <Grid item xs={4}>
                        <CountUpChart
                            desc={`Homicides in ${filters.values.startYear}`}
                            end={startHomicides}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CountUpChart
                            desc={`Homicides in ${filters.values.endYear}`}
                            end={endHomicides}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={2} style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <Typography align="center" variant="h3" component="p" color="secondary">{pctChange > 0 && "+"}{pctChange}%</Typography>
                            <Typography align="center" variant="caption" component="p">% change from {filters.values.startYear} to {filters.values.endYear}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );

}
