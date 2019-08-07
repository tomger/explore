import * as React from "react"
import { Scroll, Frame, RenderTarget } from "framer"
import venues from "./dataset.js"

export function HelloKitty(props) {
    if (RenderTarget.current() === RenderTarget.canvas) {
        venues = venues.slice(0, 3)
    }
    const performanceStart = performance.now()
    const dateFilter = props.dateFilter
    const startTimeHour = new Date()
    const nowDay = new Date().getDay()
    const nowHour = new Date().getHours()
    const [expandedVenues, setExpandedVenues] = React.useState([])

    function addExpandedVenue(venue_id) {
        setExpandedVenues(expandedVenues.concat([venue_id]))
    }

    function mapVenues() {}

    function mapClasses(klass) {
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

        return filteredSchedules.length === 0 ? (
            undefined
        ) : (
            <div
                earliestScheduleTime={filteredSchedules[0].starttime}
                key={klass.name + klass.schedules[0].starttime}
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
                        </Scroll>
                    </div>
                )}
            </div>
        )
    }

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

    const venueElements = venues
        .filter(venue => {
          if (!props.mapBounds) {
            return true;
          }

          return props.mapBounds.contains([venue.lat, venue.lon]);
        })
        .filter(venue => {
          if (!props.activityFilter) {
            return true;
          }
          return venue.activities.toLowerCase()
            .indexOf(props.activityFilter.toLowerCase()) !== -1;
        })
        .map(venue => {
            let classes = props.dateFilter === -1 ? [] : venue.classes
              .map(mapClasses)
              .filter(p => !!p)
              .slice().sort((a, b) => {
                return a.props.earliestScheduleTime - b.props.earliestScheduleTime
              })

            let classSection;
            if (expandedVenues.indexOf(venue.venue_id) !== -1) {
                classSection = classes
            } else {
                classSection = [classes.slice(0, 2)]
                if (classes.length > 2) {
                    classSection.push(
                        <Frame
                            onTap={_ => addExpandedVenue(venue.venue_id)}
                            width="100%"
                            style={{
                                position: "relative",
                                height: 40,
                                background:"transparent",
                                textAlign: "left",
                                borderTop: "1px solid #e7e7e7",
                                color: "#333",
                                fontWeight: 500,
                                padding: 12,
                            }}
                        >
                            See {classes.length - 2} more
                        </Frame>
                    )
                }
            }

            let element =
                props.dateFilter !== -1 && classes.length === 0 ? (
                    undefined
                ) : (
                    <div
                        earliestScheduleTime={!!classes[0] ? classes[0].props.earliestScheduleTime : 0}
                        key={venue.venue_id}
                        style={{
                            margin: 12,
                            background: "#fff",
                            borderRadius: 5,
                            border: "1px solid #e7e7e7",
                            boxShadow:
                                "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <div
                            style={{
                                padding: 12,
                                display: "flex",
                                lineHeight: "22px",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    justifyContent: "center",
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
                                    {venue.activities}
                                </div>
                                <div
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                    }}
                                >
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
                                        objectFit: "cover",
                                    }}
                                    src={venue.images}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                flexDirection: "column",
                                display: "flex",
                            }}
                        >
                            {props.dateFilter === -1 ? undefined : <div>{classSection}</div>}
                        </div>
                    </div>
                )
            return element
        })
        .filter(p => !!p)
        .slice().sort((a, b) => {
          return a.props.earliestScheduleTime - b.props.earliestScheduleTime
        }) // venues

    // console.info("HelloKitty took",performance.now() - performanceStart);
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
            <div id="xxx_hellokitty_height" style={{ background: "white" }}>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              margin: 16,
              color: "#333",
            }}>We found {venueElements.length} venues</div>
                {venueElements.slice(0, 20)}
                {venueElements.length > 20
                    ? `Load ${venueElements.length - 20} more results`
                    : ""}
            </div>
        </Frame>
    )
}
