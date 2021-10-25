import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    bigStat: {
        fontSize: '180%',
        fontWeight: 'bold',
        paddingRight: theme.spacing(0.25),
        paddingLeft: theme.spacing(0.25)
    }
}));