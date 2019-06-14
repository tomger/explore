import * as React from "react"
import venues from "./venues2"

export function HelloKitty2() {
    const elements = venues.map(venue => {
        venue.schedules.sort((a, b) => {
            return a.starttime - b.starttime
        })

        let schedules = venue.schedules.map(s => {
            let date = new Date(1560052855000 + s.starttime * 1000)
            let format = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                timeZone: "America/New_York",
            })
            return (
                <span
                    style={{
                        display: "flex",
                        borderTop: "1px solid #e7e7e7",
                        padding: "8px 10px",
                        margin: "0 4px 0 0",
                        fontSize: 13,
                    }}
                >
                    <span style={{ display: "inline-block", width: 70 }}>
                        {format}
                    </span>
                    <span style={{ display: "inline-block", flex: 1 }}>
                        {s.class && s.class.name}
                    </span>
                    <span
                        style={{
                            paddingLeft: 6,
                            marginLeft: 4,
                        }}
                    >
                        {s.availability.credits}
                    </span>
                </span>
            )
        })

        if (venue.activities.indexOf("ellness") !== -1) {
            schedules = venue.classes.map(klass => {
                let element = (
                    <div
                        style={{
                            padding: "12px",
                            fontSize: 14,
                            borderTop: "1px solid #e7e7e7",
                            display: "flex",
                        }}
                    >
                        <span style={{ flex: 1 }}>{klass.name}</span>
                        <span>{klass.schedules[0].availability.credits}</span>
                    </div>
                )
                return element
            })
        }

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
                <div
                    style={{
                        padding: 12,
                        display: "flex",
                        lineHeight: "22px",
                        "flex-direction": "row",
                    }}
                >
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
                        <div style={{ fontSize: 14, color: "#7f7f7f" }}>
                            {venue.display_rating_average}
                            <span
                                style={{
                                    fontSize: 12,
                                    marginLeft: 4,
                                    position: "relative",
                                    top: -1,
                                }}
                            >
                                ★
                            </span>{" "}
                            ({venue.display_rating_total})
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
                    <div>
                        {schedules.slice(0, 5)}
                        {schedules.length > 5 ? (
                            <div
                                style={{
                                    borderTop: "1px solid #e7e7e7",
                                    color: "#05f",
                                    fontWeight: 500,
                                    padding: 12,
                                }}
                            >
                                See all {schedules.length} classes
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        )
        return element
    })

    return (
        <div
            style={{
                fontSize: 14,
                fontFamily: "TT Norms",
                color: "#333",
                background: "#F7F7F7",
            }}
        >
            {elements}
        </div>
    )
}
