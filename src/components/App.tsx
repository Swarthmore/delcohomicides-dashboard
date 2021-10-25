import * as React from "react";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import FilterContextProvider from "../contexts/Filters";
import { LinearProgress, CssBaseline, ThemeProvider } from "@material-ui/core";
import Dash from "./Dash/Dash";
import Filters from "./Filters/Filters";
import { Drawer } from "@material-ui/core";

import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#e72a5e',
    },
    secondary: {
      main: '#a13bfe',
    },
    background: {
      default: '#1b203d',
      paper: '#2a2b4a',
    },
    success: {
      main: '#5ab9a0',
    },
  },
};

export default function App() {

    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const onClose = () => {
        setFiltersOpen(false);
    }

    const onOpen = () => {
        setFiltersOpen(true);
    }

    return (
        <ThemeProvider theme={themeOptions}>
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
                        : <LinearProgress />} 
                </WordpressContext.Consumer>
            </WordpressContextProvider>
        </ThemeProvider>
    )
}