import * as React from "react"
import { Frame, useCycle } from "framer"
import cpdata from "cpdata"

// const venues = []
const venues = cpdata

export function HelloKitty() {
    const venueStyle = {
        padding: 12,
        display: "flex",
        "flex-direction": "row",
    }

    const elements = venues.slice(0, 20).map(venue => {
        let classes = venue.classes.map(klass => {
            klass.schedules.sort((a, b) => {
                return a.starttime - b.starttime
            })
            let schedules = klass.schedules
                .filter(s => s.starttime > 60 * 60 * 24 * 2)
                .slice(0, 3)
                .map(s => {
                    let date = new Date(1560052855000 + s.starttime * 1000)
                    let format =
                        date.toLocaleDateString("en-US", {
                            weekday: "short",
                            timeZone: "America/Denver",
                        }) +
                        " " +
                        date.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "America/Denver",
                        })
                    return (
                        <span
                            style={{
                                display: "inline-block",
                                border: "1px solid #e7e7e7",
                                borderRadius: 100,
                                padding: "4px 10px",
                                margin: "0 4px 0 0",
                                fontSize: 14,
                            }}
                        >
                            {format}
                        </span>
                    )
                })
            return (
                <div
                    style={{
                        padding: "12px",
                        fontSize: 16,
                        borderTop: "1px solid #e7e7e7",
                    }}
                >
                    <div style={{ marginBottom: 8 }}>{klass.name}</div>
                    <div>{schedules}</div>
                </div>
            )
        })
        let element = (
            <div
                style={{
                    margin: 12,
                    background: "#fff",
                    borderRadius: 5,
                    "box-shadow":
                        "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
                }}
            >
                <div style={venueStyle}>
                    <div
                        style={{
                            flex: 1,
                            "flex-direction": "column",
                            "justify-content": "center",
                            display: "flex",
                        }}
                    >
                        <div style={{ "font-weight": "500", fontSize: "16px" }}>
                            {venue.venue_name}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            {venue.location_name}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            {venue.display_rating_average} (
                            {venue.display_rating_total})
                        </div>
                    </div>
                    <div>
                        <img
                            style={{
                                width: 120,
                                height: 80,
                                borderRadius: 3,
                                "object-fit": "cover",
                            }}
                            src={venue.images}
                        />
                    </div>
                </div>
                <div
                    style={{
                        "flex-direction": "column",
                        display: "flex",
                    }}
                >
                    <div>{classes}</div>
                </div>
            </div>
        )
        return element
    })
    return (
        <Frame
            background="#F7F7F7"
            width="100%"
            height="100%"
            style={{ fontSize: 14, fontFamily: "TT Norms", color: "#333" }}
        >
            {elements}
        </Frame>
    )
}
