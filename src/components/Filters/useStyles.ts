import { makeStyles } from "@material-ui/core";

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
        flexGrow: 1
    },
    yearFields: {
        flexDirection: "row"
    }
}));