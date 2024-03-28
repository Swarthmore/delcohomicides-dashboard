import * as React from "react";
import { Filters, FiltersContext } from "../../../../contexts/Filters";
import { Button, ButtonProps } from "@mui/material";

export default function ClearAllButton(props: ButtonProps) {

    const ctx: Filters = React.useContext(FiltersContext);

    // clear any clearable filters  
    const clear = () => {
        ctx.setters.victimRaces([]);
        ctx.setters.femaleCbox(false);
        ctx.setters.maleCbox(false);
        ctx.setters.activeLayer("No active layer");
        ctx.setters.weaponTypes([]);
    }
    
    return (
        <Button {...props} onClick={clear}>Clear All</Button>        
    );

}