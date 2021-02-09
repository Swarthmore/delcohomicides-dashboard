import * as React from "react";
import { WordpressContext } from "../../contexts/Wordpress";
import { LinearProgress } from "@material-ui/core";
import {Dashboard} from "../Dashboard/Dashboard";

export default function Dash() {

    const [isReady, setIsReady] = React.useState(false);
    
    const { isLoaded, incidents: rawIncidents, formatted: formattedIncidents } = React.useContext(WordpressContext);

    // this effect will check the fields from wordpress context and will assign {isReady} once
    // the data is present
    React.useEffect(() => {
        setIsReady(
            isLoaded && rawIncidents.length > 0 && formattedIncidents.length > 0 
        )
    }, [ isLoaded, rawIncidents, formattedIncidents])

    return (
        <React.Fragment>
            {console.count('redraw')}
            {!isReady ? (
                <LinearProgress />
            ) : (
                <div>
                    <Dashboard />
                    <p>Data is loaded. Enjoy.</p>
                </div>
            )}
        </React.Fragment>
    )

}