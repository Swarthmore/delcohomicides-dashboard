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
    if (zoom >= 15) {
        return 80;
    } else if (zoom >= 12) {
        return 60;
    } else if (zoom >= 10) {
        return 30;
    } else if (zoom >= 8) {
        return 10;
    }
};

function VictimsMap() {
    
    const [map, setMap] = React.useState(null);
    const [heatmapData, setHeatmapData] = React.useState([]);
    const [heatmapPointRadius, setHeatmapPointRadius] = React.useState(10);

    const mapRef = React.useRef();

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
        }
    }

    // When the filters change, update the heatmap data.
    React.useEffect(() => {
        generateHeatmapData();
    }, [filters.values]);

    const gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(255, 0, 0, 1)'
    ];

    const rootRef = React.useRef();
    
    return isLoaded ? ( 
        <div style={{height: '100%', paddingRight: '30px'}}>
                <GoogleMap
                    ref={mapRef}
                    mapContainerStyle={{ minHeight: 500, height: "100%" }}
                    center={{ lat: 39.937406233270615, lng: -75.39280218135417 }}
                    zoom={10}
                    onLoad={onLoad}
                    onZoomChanged={onZoomChanged}       
                    options={{
                        maxZoom: 14,
                        minZoom: 10
                    }}
                >
                    <KmlLayer 
                        url={DELCO_BORDER_KML}
                        onLoad={() => {}}
                        onUnmount={() => {}}
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
    ) : <div>Loading map...</div>
};

export default React.memo(VictimsMap);