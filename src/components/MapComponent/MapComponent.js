import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr"; // React hook to fetch the data
import lookup from "country-code-lookup"; // npm module to get ISO Code for countries

import "./Map.scss";

// Mapbox css - needed to make tooltips work later in this article
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZGV2Y3VsYSIsImEiOiJjazhxemlxcDQwMmd5M2tsb3pjeWhmdTVtIn0._8vkTS-En-GaheV1Sy2djQ";

function MapComponent() {

    const fetcher = url =>
        fetch(url)
            .then(r => r.json())
            .then(data =>
                data.map((point, index) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            point.coordinates.longitude,
                            point.coordinates.latitude
                        ]
                    },
                    properties: {
                        id: index, // unique identifier in this case the index
                        country: point.country,
                        province: point.province,
                        cases: point.stats.confirmed,
                        deaths: point.stats.deaths
                    }
                }))
            );

    // Fetching our data with swr package
    const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", fetcher);
    const mapboxElRef = useRef(null); // DOM element to render map

    // Initialize our map
    useEffect(() => {
        console.log(data);
        // You can store the map instance with useRef too
        if (data) {
            const map = new mapboxgl.Map({
                container: mapboxElRef.current,
                style: "mapbox://styles/mapbox/dark-v10",
                center: [78.96288, 20.593684], // initial geo location
                zoom: 2 // initial zoom
            });
            // Add navigation controls to the top right of the canvas
            map.addControl(new mapboxgl.NavigationControl());

            // Call this method when the map is loaded
            map.once("load", function () {
                // Add our SOURCE
                // with id "points"
                map.addSource("points", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: data
                    }
                });

                // Add our layer
                map.addLayer({
                    id: "circles",
                    source: "points", // this should be the id of the source
                    type: "circle",
                    // paint properties
                    paint: {
                        "circle-opacity": 0.75,
                        "circle-stroke-width": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, 1,
                            100000, 1.75,
                        ],
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, 4,
                            1000, 8,
                            4000, 10,
                            8000, 14,
                            12000, 18,
                            100000, 40
                        ],
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, '#ffffb2',
                            5000, '#fed976',
                            10000, '#feb24c',
                            25000, '#fd8d3c',
                            50000, '#fc4e2a',
                            75000, '#e31a1c',
                            100000, '#b10026'
                        ],
                    }
                });
                // Create a mapbox popup
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                // Variable to hold the active country/province on hover
                let lastId;

                // Mouse move event
                map.on("mousemove", "circles", e => {
                    // Get the id from the properties
                    const id = e.features[0].properties.id;

                    // Only if the id are different we process the tooltip
                    if (id !== lastId) {
                        lastId = id;

                        // Change the pointer type on move move
                        map.getCanvas().style.cursor = "pointer";

                        const { cases, deaths, country, province } = e.features[0].properties;
                        const coordinates = e.features[0].geometry.coordinates.slice();

                        // Get all data for the tooltip
                        const countryISO =
                            lookup.byCountry(country)?.iso2 || lookup.byInternet(country)?.iso2;

                        const provinceHTML =
                            province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";

                        const mortalityRate = ((deaths / cases) * 100).toFixed(2);

                        const countryFlagHTML = Boolean(countryISO)
                            ? `<img src="https://www.countryflags.io/${countryISO}/shiny/64.png"></img>`
                            : "";

                        const HTML = `
                        <div class="tc">
                        <p>Country: <b>${country}</b></p>
                        ${provinceHTML}
                        <p>Cases: <b>${cases}</b></p>
                        <p>Deaths: <b>${deaths}</b></p>
                        <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                        ${countryFlagHTML}
                        <div>
                        `;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        popup
                            .setLngLat(coordinates)
                            .setHTML(HTML)
                            .addTo(map);
                    }
                });

                // Mouse leave event
                map.on("mouseleave", "circles", function () {
                    // Reset the last Id
                    lastId = undefined;
                    map.getCanvas().style.cursor = "";
                    popup.remove();
                });
            });
        }
    }, [data]);

    return (
        <div className="MapComponent component-div">
            <div className="mapContainer">
                {/* Assigned Mapbox container */}
                <div className="mapBox" ref={mapboxElRef} />
            </div>
        </div>
    );
}

export default MapComponent;
