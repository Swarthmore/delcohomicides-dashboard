import * as React from "react";
import { FiltersContext } from "../../../../contexts/Filters";
import YearSelectField from "../../common/YearSelectField/YearSelectField";

export default function EndYearField() {

    const ctx = React.useContext(FiltersContext);

    return (
        <YearSelectField 
            label="End Year"
            selectProps={{
                value: ctx.values.endYear,
                onChange: (e => ctx.setters.endYear(parseInt(e.target.value as string)))
            }}
        />
    );

}