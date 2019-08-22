/* global mapkit */
import * as React from "react"
import { Frame, FrameProperties } from "framer"
import venues from "./dataset.js"

function loadCSS(path) {
    const style = document.createElement("link")
    style.href = path
    style.type = "text/css"
    style.rel = "stylesheet"
    document.getElementsByTagName("head")[0].appendChild(style)
}

function loadScript(path, callback) {
    const script = document.createElement("script")
    const entrypoint = document.getElementsByTagName("script")[0]
    const cleanup = function() {
        script.onload = script.onerror = null
    }

    script.src = path
    script.onerror = script.onload = (e) => {
        console.log(e)
        cleanup()
        if (callback) {
            callback()
        }
    }
    script.async = true
    script.charset = "utf-8"

    entrypoint.parentNode.insertBefore(script, entrypoint)
}

var pinCache = [];

export function MapKit(props) {
    const frameRef = React.useRef(null)
    const frame = (
        <Frame width={props.width} height={props.height} ref={frameRef}></Frame>
    )

    const [mapContext, setMapContext] = React.useState()


    function loadPins(leaflet) {

        const positions = venues
          .filter(venue => {
            if (!props.activityFilter) {
              return true;
            }
            if (props.activityFilter.toLowerCase() == "fitness") {
              return ["yoga", "strength training", "barre", "hiit", "bootcamp", "martial arts", "rowing", "running", "cycling", "pilates", "dance", "boxing", "outdoors", "sports"]
                  .indexOf(venue.activities.toLowerCase()) !== -1;
            }
            if (props.activityFilter.toLowerCase() == "wellness") {
              return ["massage", "facial", "cryotherapy", "sports recovery", "sauna", "meditation", "acupuncture", "cupping", "beauty"]
                  .indexOf(venue.activities.toLowerCase()) !== -1;
            }
            return (venue.venue_name.toLowerCase()
                .indexOf(props.activityFilter.toLowerCase()) !== -1 ||
              venue.activities.toLowerCase()
                .indexOf(props.activityFilter.toLowerCase()) !== -1);
          })
          .map(venue => [venue.lat, venue.lon])

        pinCache.forEach(pin => {
          leaflet.removeLayer(pin)
        });
        let newPins = positions.map(position => {
          return L.circleMarker(position, {
            color: '#fff',
            opacity: 1,
            weight: 2,
            fill: true,
            fillColor: '#05f',
            fillOpacity: 1,
            radius: 6,
          }).addTo(leaflet);
        });
        // setPins(newPins);
        pinCache = newPins;

        return positions

    }

    if (!mapContext) {
        console.log("initializing leaflet")
        loadCSS("https://unpkg.com/leaflet@1.5.1/dist/leaflet.css")
        loadScript("https://unpkg.com/leaflet@1.5.1/dist/leaflet.js", () => {
            let leaflet = L.map(frameRef.current, {
                zoomControl: false,
                preferCanvas: true,
                scrollWheelZoom: false,
            })

            leaflet.setView([40.74, -74.0014], 14)
            L.tileLayer(
                "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}",
                {
                    zoomControl: true,
                    maxZoom: 18,
                    id: "mapbox.streets",
                    accessToken:
                        "pk.eyJ1IjoibXNsZWUiLCJhIjoiY2psdnB6cXN0MHd3bjNwb2R6bWFtbmg4eSJ9.DMA9TUmO4G_vDIkb6RDtZA", // MapBox Framer Token
                }
            ).addTo(leaflet)

            L.control.zoom({
              position:'topright'
            }).addTo(leaflet);

            // attach events
            for (let prop in props) {
                if (prop.startsWith("on")) {
                    leaflet.on(prop.substr(2), props[prop])
                }
            }

            function fireChange() {
              if (props.onChange) {
                props.onChange(leaflet.getBounds(), leaflet);
              }
            }

            leaflet.on("moveend", fireChange);
            leaflet.on("zoomend", fireChange);
            const positions = loadPins(leaflet);
            const bounds = L.latLngBounds(positions).pad(0.1);
            leaflet.fitBounds(bounds);

            setMapContext(leaflet)
        })
    } else {
      console.log("has conrtext")
      loadPins(mapContext)
    }

    return frame
}
