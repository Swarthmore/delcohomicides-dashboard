import { Paper, Typography } from "@mui/material";
import * as React from "react";
import CountUp from "react-countup";

export const CountUpChart = ({desc,end,start=0}) => {
    return (
        <Paper elevation={2} style={{paddingTop: '10px', paddingBottom: '10px'}}>
            <Typography align="center" variant="h3" component="p" color="secondary">
                <CountUp start={start} end={end} />
            </Typography>
            <Typography align="center" variant="caption" component="p">
                {desc}
            </Typography>
        </Paper>
    );
}