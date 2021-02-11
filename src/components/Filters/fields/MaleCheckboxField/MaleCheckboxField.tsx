import * as React from "react";
import CheckboxField from "../../common/CheckboxField/CheckboxField";
import { FiltersContext, Filters } from "../../../../contexts/Filters";

export default function MaleCheckboxField() {

    const ctx: Filters = React.useContext(FiltersContext);

    return (
        <CheckboxField
            label="M"
            checked={ctx.values.maleCbox}
            onChange={e => ctx.setters.maleCbox((e.target as HTMLInputElement).checked)} 
        />
    );

}