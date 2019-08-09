import * as React from "react"
import classes from "./dataset_classes"
import {RenderTarget, Frame, Scroll} from "framer"


function mapSchedules(s) {
    let date = new Date(1560052855000 + 8000 + s.starttime * 1000)
    let format = date
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            timeZone: "America/New_York",
        })
        .toLowerCase()
    return (
        <span
            key={s.starttime}
            style={{
                display: "inline-block",
                border: "1px solid #e7e7e7",
                borderRadius: 3,
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06)",
                padding: "4px 10px",
                margin: "0 4px 0 0",
                fontSize: 13,
                fontWeight: 500,
                width: 105,
                height: 26,
                whiteSpace: "nowrap",
                textAlign: "center",
            }}
        >
            {format}{" "}
            <span
                style={{
                    borderLeft: "1px solid #e7e7e7",
                    paddingLeft: 8,
                    marginLeft: 4,
                    fontWeight: 500,
                    color: "#7f7f7f",
                }}
            >
                {s.availability.credits}
            </span>
        </span>
    )
}


export function ClassList(props) {
    if (RenderTarget.current() === RenderTarget.canvas) {
        classes = classes.slice(0, 4)
    }
    const dateFilter = props.dateFilter;
    const startTimeHour = new Date()
    const nowDay = new Date().getDay()
    const nowHour = new Date().getHours()

    const elements = classes
      .filter(klass => {
        if (!props.mapBounds) {
          return true;
        }

        return props.mapBounds.contains([klass.venue.lat, klass.venue.lon]);
      })
      .filter(klass => {
        if (!props.activityFilter) {
          return true;
        }
        return klass.activities.toLowerCase()
          .indexOf(props.activityFilter.toLowerCase()) !== -1;
      })
      .map(klass => {
        let filteredSchedules = klass.schedules
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

        let schedulesElements = filteredSchedules.map(mapSchedules)

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
                        <div
                            style={{
                                fontWeight: "600",
                                fontSize: "12px",
                                textTransform: "uppercase",
                                color: "#999",
                            }}
                        >
                            {klass.activities}
                        </div>
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
                                display: "none",
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

        if (filteredSchedules.length === 0) {
          return undefined
        }
        return (
            <div
                earliestScheduleTime={filteredSchedules[0].starttime}
                style={{
                    padding: "16px",
                    fontSize: 16,
                    borderTop: "1px solid #e7e7e7",
                }}
            >
              {header}


              <div style={{ marginTop: 8 }}>
                  <Scroll
                      style={{
                          position: "relative",
                          left: -12,
                          width: "calc(100% + 24px)",
                      }}
                      height={30}
                      direction="horizontal"
                  >
                      <Frame
                          width={schedulesElements.length * 120}
                          style={{ background: "white", paddingLeft: 12 }}
                      >
                          {schedulesElements}
                      </Frame>
                      {schedulesElements.length > 3 ? (
                          <span
                              style={{
                                  fontSize: 12,
                                  color: "#aaa",
                                  fontWeight: 500,
                              }}
                          >
                              + {schedulesElements.length - 3} MORE
                          </span>
                      ) : (
                          ""
                      )}
                  </Scroll>
              </div>

            </div>
        )
    }).filter(p => !!p)
      .slice().sort((a, b) => a.props.earliestScheduleTime - b.props.earliestScheduleTime)

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
          <div class="scroll_height" style={{background: "#fff"}}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            margin: 16,
            color: "#333",
          }}>Found {elements.length} classes</div>
            {elements.slice(0, 40)}
            (Capped at 40 elements)
          </div>
        </Frame>
    )
}
