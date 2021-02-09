import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: 500,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  checkboxControl: {
    display: "flex",
    flexDirection: "row",
    minWidth: 100,
  },
  checkboxLabel: {
    minWidth: 40,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  chip: {
    margin: theme.spacing(1),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}))