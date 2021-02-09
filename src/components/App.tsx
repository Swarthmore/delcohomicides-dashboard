import * as React from "react";
import "./App.css";
import WordpressContextProvider, { WordpressContext } from "../contexts/Wordpress";
import { LinearProgress, CssBaseline } from "@material-ui/core";
import { Dashboard } from "./Dashboard/Dashboard";

export default function App() {
    return (
        <div className="root">
            <CssBaseline />
            <WordpressContextProvider>
                <WordpressContext.Consumer>
                    {({ isLoaded }) => isLoaded 
                        ? <Dashboard /> 
                        : <LinearProgress />} 
                </WordpressContext.Consumer>
            </WordpressContextProvider>
        </div>
    )
}