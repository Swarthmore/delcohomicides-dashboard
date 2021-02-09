import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  select: {
    width: "100%",
    minHeight: "30px",
    fontSize: "1.25rem",
  },
  outputContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1.25rem",
  }
}));