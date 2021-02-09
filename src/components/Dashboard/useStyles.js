import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles(theme => ({

    // Styles for the top row of the dashboard, which show a singular stat for each card
    smallCard: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1]
    },

    smallCardTitle: {
        fontSize: '120%',
        fontWeight: 'bold'
    },
    smallCardValue: {
        fontSize: '100%'
    },
    actionsContainer: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    // Styles for the layout of the dashboard charts. The layout should be such
    // that on a desktop view, it will show everything at once
    // the layout should look like this on desktop view
    // |--------------|
    // |      A       |
    // |----|----|----|
    // | B  | C  | D  |
    // |----|----|----|
    //
    // in mobile view it will collapse so that every cell is equally sized like this
    //
    // |------|
    // |  A   |
    // |------|
    // |  B   |
    // |------|
    // |  C   |
    // |------|
    //

    // this is the wrapper class for the dashboard
    dashboard: {
      width: '100%',
      height: '100%',
      flexGrow: 1
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row'
    },

    // styles for displaying stats about the current filters
    stats: {
      flexGrow: 1,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      fontSize: '100%',
      margin: theme.spacing(1),
      width: '100%'
    },

    bigStat: {
      fontSize: '180%',
      fontWeight: 'bold',
      paddingRight: theme.spacing(0.25),
      paddingLeft: theme.spacing(0.25)
    },

    mainChart: {
      display: 'flex',
      height: '280px',
      marginBottom: theme.spacing(2)
    },
    // the class for the google map visualization
    gmap: {
      height: '100%',
      width: '100%',
      // fill out parent flex container
      flexGrow: 1,
      // spacing
      margin: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1]
    },
    secondaryCharts: {
      display: 'flex',
      height: '40%',
      // width: '100%',
      flexGrow: 1,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        height: 'auto',
        width: '100%'
      }
    },
    secondaryChart: {
      flexGrow: 1,
      // center the chart in the container
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    drawer: {
      width: '30vw'
    }

  }));