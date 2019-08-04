/* global mapkit */
import * as React from "react"
import { Frame, FrameProperties } from "framer"
import venues from "./jersey_dump.js"

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
    script.onerror = script.onload = () => {
        cleanup()
        if (callback) {
            callback()
        }
    }
    script.async = true
    script.charset = "utf-8"

    entrypoint.parentNode.insertBefore(script, entrypoint)
}

export function MapKit(props) {
    const frameRef = React.useRef(null)
    const frame = (
        <Frame width={props.width} height={props.height} ref={frameRef}></Frame>
    )

    const [mapContext, setMapContext] = React.useState()
    if (!mapContext) {
        console.log("loading leaflet.js")
        loadCSS("https://unpkg.com/leaflet@1.5.1/dist/leaflet.css")
        loadScript("https://unpkg.com/leaflet@1.5.1/dist/leaflet.js", () => {
            var leaflet = L.map(frameRef.current, {
                zoomControl: false,
            })
            leaflet.setView([40.74, -74.0014], 14)
            L.tileLayer(
                "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}",
                {
                    maxZoom: 18,
                    id: "mapbox.streets",
                    accessToken:
                        "pk.eyJ1IjoibXNsZWUiLCJhIjoiY2psdnB6cXN0MHd3bjNwb2R6bWFtbmg4eSJ9.DMA9TUmO4G_vDIkb6RDtZA", // MapBox Framer Token
                }
            ).addTo(leaflet)
            // attach events
            for (let prop in props) {
                if (prop.startsWith("on")) {
                    leaflet.on(prop.substr(2), props[prop])
                }
            }

            const positions = venues.map(venue => [venue.lat, venue.lon])
            positions.forEach(position => {
              L.marker(position, {icon: L.icon({iconSize: [28, 50], iconUrl:"data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI4IiB2aWV3Qm94PSIwIDAgMjQgMjgiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0xMSAyOHMxMS05LjkzNzEgMTEtMTcuMDY3OWMwLTYuMDM3NjMtNC45MjQ5LTEwLjkzMjEtMTEtMTAuOTMyMS02LjA3NTEzIDAtMTEgNC44OTQ0Ny0xMSAxMC45MzIxIDAgNy4xMzA4IDExIDE3LjA2NzkgMTEgMTcuMDY3OXoiIGZpbGw9IiMwNWYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSkiLz48cGF0aCBkPSJtMTEuMTI4MyAyNy4xOTY1Yy0uMDQ1OS4wNDM2LS4wODg3LjA4NDEtLjEyODMuMTIxNC0uMDM5Ni0uMDM3My0uMDgyNC0uMDc3OC0uMTI4My0uMTIxNC0uMjk3NS0uMjgyNS0uNzIzNC0uNjk0OC0xLjIzNDktMS4yMTIxLTEuMDIzNTctMS4wMzUzLTIuMzg3MDUtMi40ODgxLTMuNzQ5MTUtNC4xNjAxLTEuMzYzNDctMS42NzM2LTIuNzE3MDgtMy41NTY2LTMuNzI3NjgtNS40NTIyLTEuMDE0NTYtMS45MDMxLTEuNjU5OTctMy43NzU4LTEuNjU5OTctNS40NCAwLTUuNzU4NTggNC42OTgwOS0xMC40MzIxIDEwLjUtMTAuNDMyMSA1LjgwMTkgMCAxMC41IDQuNjczNTIgMTAuNSAxMC40MzIxIDAgMS42NjQyLS42NDU0IDMuNTM2OS0xLjY2IDUuNDQtMS4wMTA2IDEuODk1Ni0yLjM2NDIgMy43Nzg2LTMuNzI3NiA1LjQ1MjItMS4zNjIxIDEuNjcyLTIuNzI1NiAzLjEyNDgtMy43NDkyIDQuMTYwMS0uNTExNS41MTczLS45Mzc0LjkyOTYtMS4yMzQ5IDEuMjEyMXoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLW9wYWNpdHk9Ii41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxKSIvPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibTQgNy45NTA2MmMyLjIwOTE0IDAgNC0xLjc3OTgxIDQtMy45NzUzMXMtMS43OTA4Ni0zLjk3NTMxLTQtMy45NzUzMS00IDEuNzc5ODEtNCAzLjk3NTMxIDEuNzkwODYgMy45NzUzMSA0IDMuOTc1MzF6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDggNi42OTMxMikiLz48L3N2Zz4="})}).addTo(leaflet)
            })
            const bounds = L.latLngBounds(positions).pad(0.1);
            leaflet.fitBounds(bounds);
            leaflet.setMaxBounds(bounds);

            setMapContext(leaflet)
        })
    }

    return frame
}