import * as React from "react";
import { useStyles } from "./styles";
import { Typography } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

interface Props {
    title: string
    chart: any 
}

export default function VisContainer(props: Props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>{props.title}</Typography>
            <ResponsiveContainer width="100%" height={300}>
                {props.chart}
            </ResponsiveContainer>
        </div>
    );
}