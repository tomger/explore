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
        <Frame width={props.width} height={props.height} ref={frameRef} {...props}></Frame>
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
          return L.marker(
              position, {icon: L.icon({iconSize: [28, 50], iconUrl:"data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI4IiB2aWV3Qm94PSIwIDAgMjQgMjgiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xMSAyOHMxMS05LjkzNzEgMTEtMTcuMDY3OWMwLTYuMDM3NjMtNC45MjQ5LTEwLjkzMjEtMTEtMTAuOTMyMS02LjA3NTEzIDAtMTEgNC44OTQ0Ny0xMSAxMC45MzIxIDAgNy4xMzA4IDExIDE3LjA2NzkgMTEgMTcuMDY3OXoiIGZpbGw9IiMwNWYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSkiLz48cGF0aCBkPSJtMTEuMTI4MyAyNy4xOTY1Yy0uMDQ1OS4wNDM2LS4wODg3LjA4NDEtLjEyODMuMTIxNC0uMDM5Ni0uMDM3My0uMDgyNC0uMDc3OC0uMTI4My0uMTIxNC0uMjk3NS0uMjgyNS0uNzIzNC0uNjk0OC0xLjIzNDktMS4yMTIxLTEuMDIzNTctMS4wMzUzLTIuMzg3MDUtMi40ODgxLTMuNzQ5MTUtNC4xNjAxLTEuMzYzNDctMS42NzM2LTIuNzE3MDgtMy41NTY2LTMuNzI3NjgtNS40NTIyLTEuMDE0NTYtMS45MDMxLTEuNjU5OTctMy43NzU4LTEuNjU5OTctNS40NCAwLTUuNzU4NTggNC42OTgwOS0xMC40MzIxIDEwLjUtMTAuNDMyMSA1LjgwMTkgMCAxMC41IDQuNjczNTIgMTAuNSAxMC40MzIxIDAgMS42NjQyLS42NDU0IDMuNTM2OS0xLjY2IDUuNDQtMS4wMTA2IDEuODk1Ni0yLjM2NDIgMy43Nzg2LTMuNzI3NiA1LjQ1MjItMS4zNjIxIDEuNjcyLTIuNzI1NiAzLjEyNDgtMy43NDkyIDQuMTYwMS0uNTExNS41MTczLS45Mzc0LjkyOTYtMS4yMzQ5IDEuMjEyMXoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLW9wYWNpdHk9Ii41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxKSIvPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibTQgNy45NTA2MmMyLjIwOTE0IDAgNC0xLjc3OTgxIDQtMy45NzUzMXMtMS43OTA4Ni0zLjk3NTMxLTQtMy45NzUzMS00IDEuNzc5ODEtNCAzLjk3NTMxIDEuNzkwODYgMy45NzUzMSA0IDMuOTc1MzF6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDggNi42OTMxMikiLz48L3N2Zz4="})}).addTo(leaflet)
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

            // L.control.zoom({
            //   position:'topright'
            // }).addTo(leaflet);

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
      loadPins(mapContext)
    }

    return frame
}
