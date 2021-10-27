import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    row: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
    },
    bigStat: {
        fontSize: '180%',
        fontWeight: 'bold',
        paddingRight: theme.spacing(0.25),
        paddingLeft: theme.spacing(0.25),
        color: theme.palette.primary.main,
    }
}));