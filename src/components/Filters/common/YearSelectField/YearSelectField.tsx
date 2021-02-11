import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectProps, MenuItemProps, InputLabelProps } from '@material-ui/core'
import { FiltersContext } from "../../../../contexts/Filters";

interface Props {
    label: string
    selectProps?: SelectProps
    inputLabelProps?: InputLabelProps
    menuItemProps?: MenuItemProps 
}

export default function YearSelectField(props: Props) {

    const [options, setOptions] = React.useState([]);
    
    const ctx = React.useContext(FiltersContext);

    // effect to generate year options on component mount
    React.useEffect(() => {
        const options = [];
        // this assumes that the default value for end year is the latest
        let yearIndex = ctx.defaultValues.endYear;
        do {
            options.push(yearIndex.toString());
            yearIndex--;
        } while (yearIndex >= ctx.defaultValues.startYear);
        setOptions(options);
    }, [ctx.defaultValues.endYear, ctx.defaultValues.startYear]);

    return (
        <FormControl>
            <InputLabel {...props.inputLabelProps}>{props.label}</InputLabel>
            <Select {...props.selectProps}>
                {options.map(o => <MenuItem key={o} value={o} {...props.menuItemProps} button={true}>{o}</MenuItem>)}
            </Select>
        </FormControl>
    );

}