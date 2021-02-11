import * as React from "react";
import "./App.css";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import FilterContextProvider from "../contexts/Filters";
import { LinearProgress, CssBaseline } from "@material-ui/core";
import Dash from "./Dash/Dash";
import Filters from "./Filters/Filters";

export default function App() {
    return (
        <div className="root">
            <CssBaseline />
            <WordpressContextProvider>
                <WordpressContext.Consumer>
                    {({ isLoaded }) => isLoaded 
                        ? (
                            <FilterContextProvider>
                                <React.Fragment>
                                    <Dash />
                                    <Filters />
                                </React.Fragment>
                            </FilterContextProvider>
                        ) 
                        : <LinearProgress />} 
                </WordpressContext.Consumer>
            </WordpressContextProvider>
        </div>
    )
}