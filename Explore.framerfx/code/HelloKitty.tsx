import * as React from "react"
import venues from "./jersey_dump.js"
import { Scroll, Frame, RenderTarget } from "framer"

export function HelloKitty(props) {
    if (RenderTarget.current() === RenderTarget.canvas) {
        venues = venues.slice(0, 3)
    }

    const dateFilter = props.dateFilter || 0
    const startTimeHour = new Date()

    const elements = venues.map(venue => {
        let classes = venue.classes.map(klass => {
            klass.schedules.sort((a, b) => {
                return a.starttime - b.starttime
            })

            let filteredSchedules = klass.schedules
                // .slice(0, 2)
                .filter(s => {
                    return (
                        s.starttime > 60 * 60 * 24 * dateFilter &&
                        s.starttime < 60 * 60 * 24 * (dateFilter + 1)
                    )
                })
                .filter(s => {
                    startTimeHour.setTime(1560052855000 + s.starttime * 1000)
                    return (
                        startTimeHour.getHours() > props.timeRange[0] &&
                        startTimeHour.getHours() < props.timeRange[1]
                    )
                })

            let schedules = filteredSchedules.map(s => {
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

            return filteredSchedules.length === 0 ? undefined : (
                <div
                    style={{
                        padding: "12px",
                        fontSize: 16,
                        borderTop: "1px solid #e7e7e7",
                    }}
                >
                    <div>
                        {klass.name}{" "}
                        <span style={{ color: "#7f7f7f", fontSize: 14 }}>
                            (
                            {Math.round(
                                (klass.schedules[0].endtime -
                                    klass.schedules[0].starttime) /
                                    60
                            )}
                            min)
                        </span>
                    </div>
                    {1 && (
                        <div style={{ marginTop: 8 }}>
                            <span style={{ marginRight: 4, fontSize: 14 }}>
                                {filteredSchedules.length===10000
                                    ? new Date(
                                          1560052855000 +
                                              filteredSchedules[0].starttime *
                                                  1000
                                      ).toLocaleDateString("en-US", {
                                          weekday: "short",
                                          timeZone: "America/New_York",
                                      })
                                    : ""}
                            </span>
                            {schedules}
                            {filteredSchedules.length > 3 ? (
                                <span
                                    style={{
                                        fontSize: 12,
                                        color: "#aaa",
                                        fontWeight: 500,
                                    }}
                                >
                                    + {filteredSchedules.length - 3} MORE
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </div>
            )
        }).filter(p => !!p); // classes

        let element = classes.length === 0 ? undefined : (
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
                                background: "#f7f7f7",
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
    }).filter(p => !!p); // venues
    return (
        <Frame
            size="100%"
            style={{
                fontSize: 14,
                fontFamily: "TT Norms",
                color: "#333",
                background: "white",
            }}
        >
          <div style={{background: "white"}}>
            {elements.slice(0, 20)}
            {elements.length > 20
                ? `Load ${elements.length - 20} more results`
                : ""}
          </div>
        </Frame>
    )
}
