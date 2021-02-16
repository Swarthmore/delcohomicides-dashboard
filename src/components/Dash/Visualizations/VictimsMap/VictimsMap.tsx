import * as React from "react";
import {
    GoogleMap,
    KmlLayer,
    HeatmapLayer,
    LoadScript
} from "@react-google-maps/api";
import {
    GOOGLE_API_KEY,
    MEDIAN_INCOME_KML,
    HOMICIDE_RATES_KML,
    PERCENT_NONWHITE_KML,
    POPULATION_DENSITY_KML,
    DELCO_BORDER_KML
} from "../../constants";
import { WordpressContext } from "../../../../contexts/Wordpress";
import { FiltersContext } from "../../../../contexts/Filters";
import { useStyles } from "./styles";

let RENDERS = 0

// Parse the coordinates from incident field
const parseCoordinatesFromIncident = ({ location }) => {
    const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    if (location) {
        if (regex.test(location)) {
            const coordinates = location.split(",");
            const lat = parseFloat(coordinates[0].trim());
            const lng = parseFloat(coordinates[1].trim());
            return {
                lat,
                lng,
                weight: 1
            };
        }
    }
};

function VictimsMap() {
    
    const [heatmapData, setHeatmapData] = React.useState([]);
    const [map, setMap] = React.useState(null);
    
    const data = React.useContext(WordpressContext);
    const filters = React.useContext(FiltersContext);

    const classes = useStyles();

    const onLoad = React.useCallback(m => {
        const bounds = new window.google.maps.LatLngBounds();
        m.fitBounds(bounds);
        setMap(m);
    }, []);

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, [])
    
    const generateHeatmapPoints = () => {
        return data.formatted
        .map(incident => parseCoordinatesFromIncident(incident))
        .filter(p => p);
    };
    
    React.useEffect(() => {
        if (!map) return
        const points = generateHeatmapPoints();
        const heatmapPoints = points.map(({ lat, lng, weight }) => ({
            location: new window.google.maps.LatLng(lat, lng),
            weight
        }));
        setHeatmapData(heatmapPoints);
    }, [data.formatted, map]);
    
    ++RENDERS;
    
    console.log("HomicidesOverTime", RENDERS);

    return (
        <div className={classes.root}>
            <LoadScript libraries={["visualization"]} googleMapsApiKey={GOOGLE_API_KEY}>
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: 39.937406233270615, lng: -75.39280218135417 }}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                   
                </GoogleMap>
            </LoadScript>
        </div>
    )
};

export default React.memo(VictimsMap);