import React from 'react'
import { useStyles } from './styles'

export const DashboardItem = ({ children, ...rest }) => {

  const classes = useStyles()

  return (
    <div className={classes.root} {...rest}>
      {children}
    </div>
  )
}