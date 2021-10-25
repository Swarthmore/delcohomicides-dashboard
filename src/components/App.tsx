import * as React from "react";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import FilterContextProvider from "../contexts/Filters";
import { LinearProgress, CssBaseline, Grid } from "@material-ui/core";
import Dash from "./Dash/Dash";
import Filters from "./Filters/Filters";
import { Drawer } from "@material-ui/core";

export default function App() {

    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const onClose = () => {
        setFiltersOpen(false);
    }

    const onOpen = () => {
        setFiltersOpen(true);
    }

    return (
        <div>
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
        </div>
    )
}