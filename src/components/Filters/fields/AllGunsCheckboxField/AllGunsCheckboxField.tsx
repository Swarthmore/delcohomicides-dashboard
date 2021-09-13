import * as React from "react";
import CheckboxField from "../../common/CheckboxField/CheckboxField";
import { FiltersContext, Filters } from "../../../../contexts/Filters";
import { DGVField } from "../../../../types";

export default function AllGunsCheckboxField() {

    const ctx: Filters = React.useContext(FiltersContext);

    
    const allGunsList: DGVField.WeaponType[] = ["Firearm", "Handgun", "Other Gun", "Rifle", "Shotgun"]; 

    // pass in the current form value for weapon types and ADD all guns to it
    // duplicates will not be returned
    function selectAllGuns(): DGVField.WeaponType[] {
        return Array.from(new Set([...allGunsList]))
    }
    
    // pass in the current form value for weapon types and REMOVE all guns to it
    // duplicates will not be returned
    function removeAllGuns(arr: DGVField.WeaponType[]): DGVField.WeaponType[] {
        return arr.filter(item => !allGunsList.includes(item)).filter(i => i === i)
    }

    // when all guns checkbox is changed, set the fields accordingly
    React.useEffect(() => {

        ctx.values.allGunsCbox ? (
            ctx.setters.weaponTypes(selectAllGuns())
        ) : (
            ctx.setters.weaponTypes(removeAllGuns(ctx.values.weaponTypes))
        )

    }, [ctx.values.allGunsCbox])

    return (
        <CheckboxField
            label="Select Firearms Only"
            checked={ctx.values.allGunsCbox}
            onChange={e => ctx.setters.allGunsCbox((e.target as HTMLInputElement).checked)} 
        />
    );

}
