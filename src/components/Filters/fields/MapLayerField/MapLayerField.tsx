import * as React from "react";
import { FiltersContext } from "../../../../contexts/Filters";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { ActiveMapLayer } from "../../../../types";

export default function MapLayerField() {

    const ctx = React.useContext(FiltersContext);

    const options = [
        "No active layer", 
        "Median income",
        "Homicide rates",
        "% non-white",
        "Pop. density",
        "Municipalities"
    ];

    return (
        <FormControl fullWidth>
            <InputLabel>Map Overlay</InputLabel>
            <Select onChange={e => ctx.setters.activeLayer(e.target.value as ActiveMapLayer)} value={ctx.values.activeLayer}>
                {options.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
        </FormControl>
    );

}