import * as React from "react"
import venues from "./venues"

export function HelloKitty() {
    const elements = venues.map(venue => {
        let classes = venue.classes.map(klass => {
            klass.schedules.sort((a, b) => {
                return a.starttime - b.starttime
            })

            let schedules = klass.schedules
                // .filter(s => s.starttime > 60 * 60 * 24 * 2)
                .slice(0, 2)
                .map(s => {
                    let date = new Date(1560052855000 + s.starttime * 1000)
                    let format = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "America/New_York",
                    })
                    return (
                        <span
                            style={{
                                display: "inline-block",
                                border: "1px solid #e7e7e7",
                                borderRadius: 100,
                                padding: "4px 10px",
                                margin: "0 4px 0 0",
                                fontSize: 13,
                            }}
                        >
                            {format}{" "}
                            <span
                                style={{
                                    borderLeft: "1px solid #e7e7e7",
                                    paddingLeft: 6,
                                    marginLeft: 4,
                                    fontWeight: 500,
                                }}
                            >
                                {s.availability.credits}
                            </span>
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
                    <div>{klass.name}</div>
                    {1 && (
                        <div style={{ marginTop: 8 }}>
                            <span style={{ marginRight: 4, fontSize: 14 }}>
                                {new Date(
                                    1560052855000 +
                                        klass.schedules[0].starttime * 1000
                                ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    timeZone: "America/New_York",
                                })}
                            </span>
                            {schedules}
                            {klass.schedules.length > 3 ? (
                                <span
                                    style={{
                                        fontSize: 12,
                                        color: "#aaa",
                                        fontWeight: 500,
                                    }}
                                >
                                    + {klass.schedules.length - 3} MORE
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
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
                        {classes.slice(0, 2)}
                        {classes.length > 2 ? (
                            <div
                                style={{
                                    borderTop: "1px solid #e7e7e7",
                                    color: "#05f",
                                    fontWeight: 500,
                                    padding: 12,
                                }}
                            >
                                See all {classes.length} classes
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
