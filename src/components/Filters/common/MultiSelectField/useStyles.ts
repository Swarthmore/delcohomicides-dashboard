import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    chipsContainer: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.secondary
    }
}));