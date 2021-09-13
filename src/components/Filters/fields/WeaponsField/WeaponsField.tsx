import * as React from "react";
import { FiltersContext, Filters } from "../../../../contexts/Filters";
import { DGVField } from "../../../../types";
import MultiSelectField from "../../common/MultiSelectField/MultiSelectField";

export default function WeaponsField() {

    const ctx: Filters = React.useContext(FiltersContext);

    return (
        <MultiSelectField 
            label="Weapon Types PA UCR"
            options={ctx.defaultValues.weaponTypes}
            selectProps={{
                value: ctx.values.weaponTypes,
                onChange: e => ctx.setters.weaponTypes(e.target.value as DGVField.WeaponType[]),
                disabled: ctx.values.allGunsCbox
            }}
        />
    );

}
