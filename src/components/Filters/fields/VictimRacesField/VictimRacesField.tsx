import * as React from "react";
import { FiltersContext, Filters } from "../../../../contexts/Filters";
import { DGVField } from "../../../../types";
import MultiSelectField from "../../common/MultiSelectField/MultiSelectField";

export default function VictimRacesField() {

    const ctx: Filters = React.useContext(FiltersContext);

    return (
        <MultiSelectField 
            label="Victim Races"
            options={ctx.defaultValues.victimRaces}
            selectProps={{
                value: ctx.values.victimRaces,
                onChange: e => ctx.setters.victimRaces(e.target.value as DGVField.VictimRace[])
            }}
        />
    );

}