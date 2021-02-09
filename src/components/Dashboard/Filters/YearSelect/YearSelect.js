import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useStyles } from '../common/styles'

export const YearSelect = ({ label, options, year, onChange }) => {

  const classes = useStyles()

  return (
      <FormControl className={classes.formControl}>
        <InputLabel id={"from-select-label"}>{label}</InputLabel>
        <Select
          labelId={"from-select-label"}
          id={"from-select"}
          value={year}
          onChange={onChange}
        >
          {options.map((opt, i) => (
            <MenuItem key={i} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )

}