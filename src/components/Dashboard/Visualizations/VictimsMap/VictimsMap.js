import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  LoadScript,
  KmlLayer,
  HeatmapLayer,
} from "@react-google-maps/api";
import {
  GOOGLE_API_KEY,
  MEDIAN_INCOME_KML,
  HOMICIDE_RATES_KML,
  PERCENT_NONWHITE_KML,
  POPULATION_DENSITY_KML,
  DELCO_BORDER_KML
} from "../../constants";

const mapLibraries = ["visualization"];

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
        lng
      };
    }
  }
};

export const VictimsMap = ({
  incidents,
  activeLayer,
  center,
  zoom,
  ...rest
}) => {

  const [heatmapData, setHeatmapData] = useState([]);
  const [googleMap, setGoogleMap] = useState(undefined);

  // On google map loaded
  const onLoad = (map) => {
    setGoogleMap(map);
  };

  // On google map unmount
  const onUnmount = (map) => {
    setGoogleMap(null);
  };

  // Scale the heat map point radius so it appears "correct" after zoom actions
  const getHeatMapRadius = (latitudeCoordinate) => {
    var distanceInMeter = 3; /* meter distance in real world */

    var meterPerPixel = 156543.03392 * Math.cos(latitudeCoordinate * Math.PI / 180) / Math.pow(2, zoom);
    var radius = distanceInMeter / meterPerPixel;

    return radius;
  }

  // Generate the heatmap data
  const generateHeatmapPoints = (data) => {

    if (!data) return []
    return data
      .map((incident) => parseCoordinatesFromIncident(incident))
      .filter((point) => point);
  };

  // Generate the heatmap data when the incidents change
  useEffect(() => {
    if (!googleMap) {
      return;
    }

    if (!window.google) {
      return;
    }

    const points = generateHeatmapPoints(incidents);

    const data = points.map(({ lat, lng, weight }) => ({
      location: new window.google.maps.LatLng(lat, lng),
      weight
    }));

    setHeatmapData(data);
  }, [incidents, googleMap]);


  // Debug: Show log the heatmap data variable when it changes
  useEffect(() => {
    //console.debug({ heatmapData })
  }, [heatmapData])
  return (

    <div {...rest}>
      <LoadScript
        googleMapsApiKey={GOOGLE_API_KEY}
        libraries={mapLibraries}
        onLoad={onLoad}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Display the delco border at all times */}
          <KmlLayer url={DELCO_BORDER_KML} />

          {heatmapData && <HeatmapLayer data={heatmapData} options={{
            opacity: 0.8,
            dissipating: true
          }} />}
          
          {activeLayer === "Median income" && (
            <KmlLayer url={MEDIAN_INCOME_KML} />
          )}
          {activeLayer === "Homicide rates" && (
            <KmlLayer url={HOMICIDE_RATES_KML} />
          )}
          {activeLayer === "% non-white" && (
            <KmlLayer url={PERCENT_NONWHITE_KML} />
          )}
          {activeLayer === "Pop. density" && (
            <KmlLayer url={POPULATION_DENSITY_KML} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

VictimsMap.defaultProps = {
  center: {
    lat: 39.8496,
    lng: -75.2557,
  },
  zoom: 10,
  activeLayer: ""
};

VictimsMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  zoom: PropTypes.number,
  incidents: PropTypes.array,
  activeLayer: PropTypes.any
};
