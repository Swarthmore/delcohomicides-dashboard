import * as React from "react";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import FilterContextProvider from "../contexts/Filters";
import {
    LinearProgress,
    CssBaseline,
    ThemeProvider,
    Theme,
    createTheme,
    Typography
} from "@mui/material";
import Dash from "./Dash/Dash";
import Filters from "./Filters/Filters";
import { Drawer } from "@mui/material";
import { purple } from "@mui/material/colors";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e72a5e',
    },
    secondary: {
      main: purple[500],
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
                                  <Dash filtersOpen={filtersOpen} onOpen={onOpen} />
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
    );
}
