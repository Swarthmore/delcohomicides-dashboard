import * as React from "react";
import {
    GoogleMap,
    KmlLayer,
    HeatmapLayer,
    useJsApiLoader
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
import { fillYearsArray, filterIncidents } from "../../../../helpers";

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
    
    const [map, setMap] = React.useState(null);
    const [heatmapData, setHeatmapData] = React.useState([]);

    const data = React.useContext(WordpressContext);
    const filters = React.useContext(FiltersContext);

    const classes = useStyles();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: ['visualization']
    });

    const generateHeatmapData = () => {

        const genders = [];
        const m = filters.values.maleCbox;
        const f = filters.values.femaleCbox;

        if (m) genders.push("Male");
        if (f) genders.push("Female");

        // filter the incidents
        const filteredData = filterIncidents(data.formatted, {
            races: filters.values.victimRaces,
            genders,
            years: fillYearsArray(filters.values.startYear.toString(), filters.values.endYear.toString()).map(i => i.toString()),
            weapons: filters.values.weaponTypes
        });

        setHeatmapData(
            filteredData.map(parseCoordinatesFromIncident)
                .filter(Boolean)
                .map(coords => new google.maps.LatLng(coords.lat, coords.lng))
        );
    
    }

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
        return
    }, []);

    // When the filters change, update the heatmap data.
    React.useEffect(() => {
        generateHeatmapData();
    }, [filters.values]);

    return isLoaded ? ( 
        <div className={classes.root}>
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: 39.937406233270615, lng: -75.39280218135417 }}
                    zoom={10}
                >
                    <KmlLayer 
                        url={DELCO_BORDER_KML} 
                        onLoad={() => {}}
                        onUnmount={() => {}}
                    />

                    <HeatmapLayer 
                        data={heatmapData}
                    />

                    {filters.values.activeLayer === "% non-white" && <KmlLayer
                        url={PERCENT_NONWHITE_KML}
                        onLoad={() => { }}
                        onUnmount={() => { }}
                    />}

                    {filters.values.activeLayer === "Homicide rates" && <KmlLayer
                        url={HOMICIDE_RATES_KML}
                        onLoad={() => { }}
                        onUnmount={() => { }}
                    />}
                    {filters.values.activeLayer === "Median income" && <KmlLayer
                        url={MEDIAN_INCOME_KML}
                        onLoad={() => { }}
                        onUnmount={() => { }}
                    />}

                    {filters.values.activeLayer === "Pop. density" && <KmlLayer
                        url={POPULATION_DENSITY_KML}
                        onLoad={() => { }}
                        onUnmount={() => { }}
                    />}

                </GoogleMap>
        </div>
    ) : <div className={classes.root}>Loading map...</div>
};

export default React.memo(VictimsMap);