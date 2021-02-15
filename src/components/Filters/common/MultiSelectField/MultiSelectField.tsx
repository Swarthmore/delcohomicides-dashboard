import * as React from "react";
import { FormControl, FormControlProps, InputLabel, InputLabelProps, Select, SelectProps, Input, InputProps, Chip, MenuItem, MenuItemProps } from "@material-ui/core";
import { useStyles } from "./useStyles";

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
    
    const classes = useStyles();
    
    return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple
                {...props.selectProps}
                input={<Input {...props.inputProps} />}
                renderValue={(values: string[]) => <div className={classes.chipsContainer}>{values.map((str: string) => <Chip key={str} label={str} size="small" variant="outlined" />)}</div>}
            >
                {props.options.map(o => <MenuItem key={o} value={o} {...props.menuItemProps} button={true}>{o}</MenuItem>)}
            </Select>
        </FormControl>
        );
        
    }
    