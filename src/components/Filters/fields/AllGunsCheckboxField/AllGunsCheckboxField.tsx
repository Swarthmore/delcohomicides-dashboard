import * as React from "react";
import CheckboxField from "../../common/CheckboxField/CheckboxField";
import { FiltersContext, Filters } from "../../../../contexts/Filters";

export default function AllGunsCheckboxField() {

    const ctx: Filters = React.useContext(FiltersContext);

    return (
        <CheckboxField
            label="Select all Firearms"
            checked={ctx.values.allGunsCbox}
            onChange={e => ctx.setters.allGunsCbox((e.target as HTMLInputElement).checked)} 
        />
    );

}