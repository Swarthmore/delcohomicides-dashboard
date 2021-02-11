import * as React from "react";
import CheckboxField from "../../common/CheckboxField/CheckboxField";
import { FiltersContext, Filters } from "../../../../contexts/Filters";

export default function FemaleCheckboxField() {

    const ctx: Filters = React.useContext(FiltersContext);

    return (
        <CheckboxField
            label="F"
            checked={ctx.values.femaleCbox}
            onChange={e => ctx.setters.femaleCbox((e.target as HTMLInputElement).checked)} 
        />
    );

}