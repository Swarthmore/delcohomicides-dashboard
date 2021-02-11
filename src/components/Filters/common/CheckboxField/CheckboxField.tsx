import * as React from "react";
import { FormControlLabel, FormControlLabelProps, Checkbox, CheckboxProps } from "@material-ui/core";

interface Props {
    label: string
    formControlLabelProps?: FormControlLabelProps 
    checkboxProps?: CheckboxProps
    checked: boolean
    onChange: (event: React.FormEvent<HTMLInputElement>) => {} | void 
}

export default function CheckboxField(props: Props) {

    return (
        <FormControlLabel
            control={
            <Checkbox
                {...props.checkboxProps}
                checked={props.checked}
                onChange={props.onChange}
            />
            }
            label={props.label}
        />
    );

}
