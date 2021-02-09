// This file contains styles common to dashboard components

import { makeStyles } from '@material-ui/core'

export const useCommonStyles = makeStyles(theme => ({
    // represents the container for a visualization
    vis: {
        // center everything inside flex
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // fill out parent flex container
        flexGrow: 1,
        // spacing
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        flexDirection: 'column'
    }
}))