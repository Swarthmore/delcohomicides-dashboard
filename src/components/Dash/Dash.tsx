import { Button } from "@material-ui/core";
import * as React from "react";
import { FiltersContext } from "../../contexts/Filters";
import { useStyles } from "./useStyles";
import HomicidesOverTime from "./Visualizations/HomicidesOverTime/HomicidesOverTime";
import VictimsByAge from "./Visualizations/VictimsByAge/VictimsByAge";

export default function Dash() {

    const ctx = React.useContext(FiltersContext);
    const classes = useStyles();

    return (
        <div className={classes.dashboard}>

            <div className={classes.flexRow}>
                <div className={classes.stats}>
                    Showing <span className={classes.bigStat}>500</span> total incidents from <span className={classes.bigStat}>{ctx.values.startYear}</span> to <span className={classes.bigStat}>{ctx.values.endYear}</span>
                </div>
            </div>

            <div className={classes.flexRow}>
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{ctx.values.startYear} Total Homicides</div>
                    <div className={classes.smallCardValue}>NA</div>
                </div>
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{ctx.values.endYear} Total Homicides</div>
                    <div className={classes.smallCardValue}>NA</div>
                </div>
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>% change from {ctx.values.startYear} to {ctx.values.endYear}</div>
                    <div className={classes.smallCardValue}>NA</div>
                </div>
                <div className={classes.actionsContainer}>
                    <Button>Click me</Button>
                </div>
            </div>

            <div className={classes.mainChart}>

            </div>

            <div className={classes.secondaryCharts}>
                <div className={classes.secondaryChart}>
                    <HomicidesOverTime />
                </div>
                <div className={classes.secondaryChart}>
                    <VictimsByAge />
                </div>
            </div>
            

        </div>
    );

}
