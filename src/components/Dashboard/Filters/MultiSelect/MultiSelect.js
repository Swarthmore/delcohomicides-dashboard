import React from 'react'
import { FormControl, InputLabel, Select, Chip, MenuItem, Input } from '@material-ui/core'
import { MenuProps } from '../common/MenuProps'
import { useStyles } from '../common/styles'

export const MultiSelect = ({ label, options, selected, onChange, onDelete }) => {
  
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="victim-race-select-label">{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={onChange}
        input={<Input />}
        renderValue={values => (
          <div className={classes.chips}>
            {values.map((value, idx) => (
              <Chip
                key={idx}
                label={value}
                size={"small"}
                className={classes.chip}
                onDelete={() => onDelete(value)}
                onMouseDown={event => event.stopPropagation()}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
