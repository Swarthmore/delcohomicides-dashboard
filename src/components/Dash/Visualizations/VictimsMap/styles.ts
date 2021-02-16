import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    height: '100%',
    // fill out parent flex container
    // spacing
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1]
  },
}));