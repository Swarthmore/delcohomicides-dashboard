import * as React from "react";
import { FormControl, FormControlProps, InputLabel, InputLabelProps, Select, SelectProps, Input, InputProps, Chip, MenuItem, MenuItemProps } from "@material-ui/core";

interface Props {
    label: string
    options: string[]
    formControlProps?: FormControlProps 
    inputLabelProps?: InputLabelProps
    selectProps?: SelectProps
    inputProps?: InputProps
    menuItemProps?: MenuItemProps
}

export default function MultiSelectField(props: Props) {

    return (
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple
                {...props.selectProps}
                input={<Input {...props.inputProps} />}
                renderValue={(values: string[]) => values.map((str: string) => <Chip key={str} label={str} size="small" variant="outlined" />)}
            >
                {props.options.map(o => <MenuItem key={o} value={o} {...props.menuItemProps} button={true}>{o}</MenuItem>)}
            </Select>
        </FormControl>
    );

}
