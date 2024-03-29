import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        width: 400,
        background: theme.palette.background.paper,
        padding: theme.spacing(2)
    },
    fieldContainer: {
        flexGrow: 1,
        display: "flex",
        marginBottom: theme.spacing(2)
    },
    yearFields: {
        flexDirection: "row",
        flexGrow: 1
    }
}));