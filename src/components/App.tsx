import * as React from "react";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import FilterContextProvider from "../contexts/Filters";
import { LinearProgress, CssBaseline, ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";
import Dash from "./Dash/Dash";
import Filters from "./Filters/Filters";
import { Drawer } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#e72a5e',
    },
    secondary: {
      main: '#a13bfe',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
    success: {
      main: '#5ab9a0',
    },
  },
});

export default function App() {

    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const onClose = () => {
        setFiltersOpen(false);
    }

    const onOpen = () => {
        setFiltersOpen(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <WordpressContextProvider>
                <WordpressContext.Consumer>
                    {({ isLoaded }) => isLoaded 
                        ? (
                            <FilterContextProvider>
                                <>
                                    <Dash onOpen={onOpen} />
                                    <Drawer anchor='right' open={filtersOpen} onClose={onClose}>
                                        <Filters />
                                    </Drawer>
                                </>
                            </FilterContextProvider>
                        ) 
                        : <div>
                            <LinearProgress />
                            <Typography variant="caption">Loading data...</Typography>
                          </div>} 
                </WordpressContext.Consumer>
            </WordpressContextProvider>
        </ThemeProvider>
    )
}