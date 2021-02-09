import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { ResponsiveContainer } from 'recharts'
export const VisContainer = ({
    title,
    placeholder = <div></div>,
    chart = <div></div>,
    isLoaded,
    ...rest
}) => {

    const classes = useStyles()
    
    return (
        <div className={classes.vis} {...rest}>
            {title && <Typography>{title}</Typography>}
            {!isLoaded && placeholder}
            {isLoaded && <ResponsiveContainer width="100%" height={300}>{chart}</ResponsiveContainer>}
        </div>
    )

}   