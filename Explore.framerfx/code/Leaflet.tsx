/* global mapkit */
import * as React from "react"
import { Frame, FrameProperties } from "framer"

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

            setMapContext(leaflet)
        })
    }

    return frame
}
