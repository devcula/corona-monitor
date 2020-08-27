import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";

import "./Map.scss";

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
                        id: index,
                        country: point.country,
                        province: point.province,
                        cases: point.stats.confirmed,
                        deaths: point.stats.deaths
                    }
                }))
            );

    const { data } = useSWR("https://corona.lmao.ninja/v2/jhucsse", fetcher);
    const mapboxElRef = useRef(null);

    useEffect(() => {
        console.log(data);
        if (data) {
            const map = new mapboxgl.Map({
                container: mapboxElRef.current,
                style: "mapbox://styles/mapbox/dark-v10",
                center: [78.96288, 20.593684],
                zoom: 2
            });
            map.addControl(new mapboxgl.NavigationControl());

            map.once("load", function () {
                map.addSource("points", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: data
                    }
                });

                map.addLayer({
                    id: "circles",
                    source: "points",
                    type: "circle",
                    paint: {
                        "circle-opacity": 0.75,
                        "circle-stroke-width": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, 1,
                            1000000, 1.75,
                        ],
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, 4,
                            10000, 8,
                            40000, 10,
                            80000, 14,
                            120000, 18,
                            1000000, 30
                        ],
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "cases"],
                            1, '#ffffb2',
                            25000, '#fed976',
                            50000, '#feb24c',
                            125000, '#fd8d3c',
                            250000, '#fc4e2a',
                            375000, '#e31a1c',
                            500000, '#b10026'
                        ],
                    }
                });
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                let lastId;
                map.on("mousemove", "circles", e => {
                    const id = e.features[0].properties.id;

                    if (id !== lastId) {
                        lastId = id;

                        map.getCanvas().style.cursor = "pointer";

                        const { cases, deaths, country, province } = e.features[0].properties;
                        const coordinates = e.features[0].geometry.coordinates.slice();

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

                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        popup
                            .setLngLat(coordinates)
                            .setHTML(HTML)
                            .addTo(map);
                    }
                });

                map.on("mouseleave", "circles", function () {
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
                <div className="mapBox" ref={mapboxElRef} />
            </div>
        </div>
    );
}

export default MapComponent;
