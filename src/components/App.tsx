import * as React from "react";
import "./App.css";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import FilterContextProvider from "../contexts/Filters";
import { LinearProgress, CssBaseline } from "@material-ui/core";
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
        <div className="root">
            <CssBaseline />
            <WordpressContextProvider>
                <WordpressContext.Consumer>
                    {({ isLoaded }) => isLoaded 
                        ? (
                            <FilterContextProvider>
                                <React.Fragment>
                                    <Dash onOpen={onOpen} />
                                    <Drawer style={{ width: "400px" }} anchor='right' open={filtersOpen} onClose={onClose}>
                                        <Filters />
                                    </Drawer>
                                </React.Fragment>
                            </FilterContextProvider>
                        ) 
                        : <LinearProgress />} 
                </WordpressContext.Consumer>
            </WordpressContextProvider>
        </div>
    )
}