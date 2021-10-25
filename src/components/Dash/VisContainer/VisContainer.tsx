import * as React from "react";
import { Typography } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";

interface Props {
    title: string
    chart: any 
}

export default function VisContainer(props: Props) {
    return (
        <div>
            <Typography variant="h6" align="center" gutterBottom={true}>{props.title}</Typography>
            <ResponsiveContainer width="100%" minHeight={250} maxHeight={300}>
                {props.chart}
            </ResponsiveContainer>
        </div>
    );
}