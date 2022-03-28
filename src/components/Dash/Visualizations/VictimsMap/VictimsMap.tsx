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
import { fillYearsArray, filterIncidents } from "../../../../helpers";
import { Paper } from '@material-ui/core';

// Parse the coordinates from incident field
const parseCoordinatesFromIncident = ({ location }) => {
    const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    if (location) {
        if (regex.test(location)) {
            const coordinates = location.split(",");
            const lat = parseFloat(coordinates[0].trim());
            const lng = parseFloat(coordinates[1].trim());
            return { lat, lng };
        }
    }
};

// Map the radius of influence for each point on the haetmap relative to the zoom level.
const getRadius = (zoom) => {
    if (zoom >= 14) {
        return 65;
    } else if (zoom >= 12) {
        return 42;
    } else if (zoom >= 10) {
        return 20;
    } else if (zoom >= 8) {
        return 10;
    }
};

const defaultGradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 200, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(255, 0, 0, 1)'
];

const zoomedGradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(10, 0, 200, 1)',
    'rgba(80, 0, 200, 1)',
    'rgba(120, 0, 200, 1)',
    'rgba(100, 0, 200, 1)',
    'rgba(180, 0, 127, 1)',
    'rgba(180, 0, 63, 1)',
    'rgba(255, 0, 0, 1)'
];

const getGradient = (zoom) => {
    if (zoom >= 14) {
        return zoomedGradient;
    } else {
        return defaultGradient;
    }
}

function VictimsMap({ filtersOpen, ...rest }) {

    const defaultCenter = { lat: 39.937406233270615, lng: -75.39280218135417 };

    const [map, setMap] = React.useState(null);
    const [heatmapData, setHeatmapData] = React.useState([]);
    const [heatmapPointRadius, setHeatmapPointRadius] = React.useState(10);
    const [gradient, setGradient] = React.useState(defaultGradient);
    const [center, setCenter] = React.useState(defaultCenter);

    const mapRef = React.useRef<GoogleMap>();
    const mapContainerRef = React.useRef<HTMLDivElement>();

    const data = React.useContext(WordpressContext);
    const filters = React.useContext(FiltersContext);

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
                .map(coords => ({
                    location: new google.maps.LatLng(coords.lat, coords.lng),
                    weight: 2
                }))
        );

    }

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        return () => {
            map.setMap(null);
            setMap(null);
        }
    }, []);

    const onZoomChanged = () => {
        // if the user zooms in, make the map larger.
        if (map) {
            const zoom = map.getZoom();
            setHeatmapPointRadius(getRadius(zoom));
            setGradient(getGradient(zoom));
        }
    }

    const onCenterChanged = () => {
        if (map) {
            const c = map.getCenter();
            if (c.lat() !== center.lat || c.lng() !== center.lng) {
                setCenter({ lat: c.lat(), lng: c.lng() });
            }
        }
    }

    // When the filters change, update the heatmap data.
    React.useEffect(() => {
        generateHeatmapData();
    }, [filters.values]);

    return isLoaded ? (

        <Paper elevation={2} style={{ height: '100%' }}>

            <div ref={mapContainerRef}>
            <GoogleMap
                ref={mapRef}
                mapContainerStyle={{ minHeight: 500, height: "100%" }}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onZoomChanged={onZoomChanged}
                onCenterChanged={onCenterChanged}
                options={{
                    maxZoom: 14,
                    minZoom: 10,
                    fullscreenControl: false
                }}
            >
                <KmlLayer
                    url={DELCO_BORDER_KML}
                    onLoad={() => { }}
                    onUnmount={() => { }}
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

                <HeatmapLayer
                    data={heatmapData}
                    options={{
                        data: heatmapData,
                        dissipating: true,
                        gradient: gradient,
                        radius: heatmapPointRadius
                    }}
                />
            </GoogleMap>
            </div>
            
        </Paper>
    ) : <Paper>Loading map...</Paper>
};

export default React.memo(VictimsMap);