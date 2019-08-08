import * as React from "react"
import classes from "./dataset_classes"
import {RenderTarget, Frame} from "framer"

export function ClassList(props) {
    if (RenderTarget.current() === RenderTarget.canvas) {
        classes = classes.slice(0, 4)
    }
    const dateFilter = props.dateFilter;
    const startTimeHour = new Date()
    const nowDay = new Date().getDay()
    const nowHour = new Date().getHours()

    const elements = classes.map(klass => {
        let schedules = klass.schedules
          .filter(s => {
              return (
                  s.starttime >= 60 * 60 * 24 * dateFilter &&
                  s.starttime <= 60 * 60 * 24 * (dateFilter + 1)
              )
          })
          .filter(s => {
              startTimeHour.setTime(1560052855000 + s.starttime * 1000)
              // hide "past classes"
              if (
                  dateFilter === nowDay &&
                  startTimeHour.getHours() < nowHour
              ) {
                  return false
              }
              return (
                  startTimeHour.getHours() >= props.timeRange[0] &&
                  startTimeHour.getHours() <= props.timeRange[1]
              )
          })
          .slice().sort((a, b) => {
              return a.starttime - b.starttime
          })
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
                        margin: "4px 4px 0 0",
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

        if (schedules.length === 0) {
          return undefined
        }

        let header = (
            <div
                style={{
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        "flex-direction": "row",
                        marginBottom: 8,
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            "flex-direction": "column",
                            "justify-content": "center",
                            lineHeight: 1.4,
                            display: "flex",
                        }}
                    >
                        <div style={{ "font-weight": "500", fontSize: "16px" }}>
                            {klass.name}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            {klass.venue.venue_name}
                        </div>
                        <div style={{ fontSize: 14, color: "#7f7f7f" }}>
                            {klass.venue.location_name}
                        </div>
                        <div style={{ fontSize: 14, color: "#7f7f7f" }}>
                            {klass.venue.display_rating_average}
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
                            ({klass.venue.display_rating_total})
                        </div>
                        <div
                            style={{
                                fontSize: 14,
                                margin: "4px 0",
                                color: "#333",
                                "-webkit-line-clamp": "2",
                                "-webkit-box-orient": "vertical",
                                display: "-webkit-box",
                                overflow: "hidden",
                            }}
                        >
                            {klass.description}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        "flex-direction": "column",
                        display: "flex",
                    }}
                />
            </div>
        )

        return (
            <div
                style={{
                    padding: "12px",
                    fontSize: 16,
                    borderTop: "1px solid #e7e7e7",
                }}
            >
                {header}
                <div>
                    {schedules}{" "}
                    {undefined && klass.schedules.length > 3 ? (
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
            </div>
        )
    })

    return (
        <Frame
            overflow="visible"
            size="100%"
            style={{
                fontSize: 14,
                fontFamily: "TT Norms",
                color: "#333",
                background: "#fff",
            }}
        >
            {elements}
        </Frame>
    )
}
