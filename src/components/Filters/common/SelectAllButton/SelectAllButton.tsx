import * as React from "react";
import { Filters, FiltersContext } from "../../../../contexts/Filters";
import { Button, ButtonProps } from "@material-ui/core";

export default function SelectAllButton(props: ButtonProps) {

    const ctx: Filters = React.useContext(FiltersContext);

    // set the all filters. This assumes the default state has all the filters enabled 
    const setAll = () => {
        ctx.setters.startYear(ctx.defaultValues.startYear);
        ctx.setters.endYear(ctx.defaultValues.endYear);
        ctx.setters.victimRaces(ctx.defaultValues.victimRaces);
        ctx.setters.femaleCbox(ctx.defaultValues.femaleCbox);
        ctx.setters.maleCbox(ctx.defaultValues.maleCbox);
        ctx.setters.activeLayer(ctx.defaultValues.activeLayer);
        ctx.setters.weaponTypes(ctx.defaultValues.weaponTypes);
    }

    return (
        <Button {...props} onClick={setAll}>Select All</Button>        
    );

}