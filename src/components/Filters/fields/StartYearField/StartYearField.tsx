import * as React from "react";
import { FiltersContext } from "../../../../contexts/Filters";
import YearSelectField from "../../common/YearSelectField/YearSelectField";

export default function StartYearField() {

    const ctx = React.useContext(FiltersContext);

    return (
        <YearSelectField 
            label="Start Year"
            selectProps={{
                value: ctx.values.startYear,
                onChange: (e => ctx.setters.startYear(parseInt(e.target.value as string)))
            }}
        />
    );

}
