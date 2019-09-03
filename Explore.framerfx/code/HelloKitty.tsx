import * as React from "react"
import { Scroll, Frame, RenderTarget } from "framer"
import venues from "./dataset.js"

function mapSchedules(venue, klass, schedules, s) {
    let date = new Date(1560052855000 + 8000 + s.starttime * 1000)
    let format = date
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            timeZone: "America/New_York",
        })
        .toLowerCase()
    return (
        <Frame
            key={s.id}
            onTap={e => {
              e.stopPropagation();
              if (this.onScheduleTapped) {
                this.onScheduleTapped({
                  schedule: s,
                  venue: venue,
                  class: klass,
                  schedules: schedules,
                })
              }
            }}
            style={{
                willChange: "unset",
                display: "inline-block",
                position: "relative",
                border: "1px solid #e7e7e7",
                borderRadius: 3,
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06)",
                padding: "4px 0px 4px 0px",
                marginRight: 5,
                fontSize: 13,
                fontWeight: 500,
                width: 104,
                height: 26,
                whiteSpace: "nowrap",
                textAlign: "center",
                background: '#fff',
            }}
        >
            <span style={{
              width: 74,
              display: "inline-block",
            }}>{format}{" "}</span>
            <span
                style={{
                    borderLeft: "1px solid #e7e7e7",
                    // paddingLeft: 9,
                    margin: 0,
                    fontWeight: 500,
                    width: 28,
                    display: "inline-block",

                    color: "#7f7f7f",
                }}
            >
                {s.availability.credits || 6}</span>
        </Frame>
    )
}

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
    const ALL_DAYS = props.dateFilter === -1;

    function addExpandedVenue(venue_id) {
        setExpandedVenues(expandedVenues.concat([venue_id]))
    }

    function mapVenues() {}

    function mapClasses(venue, klass) {
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

        let schedulesElements = filteredSchedules.map(
          mapSchedules.bind(props, venue, klass, filteredSchedules)
        )

        return filteredSchedules.length === 0 ? (
            undefined
        ) : (
            <Frame
                earliestScheduleTime={filteredSchedules[0].starttime}
                key={klass.name + klass.schedules[0].starttime}
                onTap={e => {
                  if (props.onScheduleTapped) {
                    props.onScheduleTapped({
                      venue: venue,
                      class: klass,
                      schedules: filteredSchedules,
                    })
                  }
                }}
                style={{
                    padding: "12px",
                    fontSize: 16,
                    background: "transparent",
                    borderTop: "1px solid #e7e7e7",
                    position: "relative",
                    display: "block",
                    height: "auto", //  we want the class tap target to be as big as possible
                    width: "100%",
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
            </Frame>
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
        .slice().sort((a, b) => {
          return parseFloat(b.display_rating_average) - parseFloat(a.display_rating_average)
        })
        .map(venue => {
            let classes = ALL_DAYS ? [] : venue.classes
              .map(mapClasses.bind(null, venue))
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
                  (
                    <Frame
                        earliestScheduleTime={!!classes[0] ? classes[0].props.earliestScheduleTime : -1}
                        key={venue.venue_id}
                        onTap={e => {
                          e.stopPropagation();
                          if (props.onScheduleTapped) {
                            props.onScheduleTapped({
                              venue: venue,
                            })
                          }
                        }}
                        style={{
                            position: "relative",
                            width: "auto",
                            height: "auto",
                            margin: 12,
                            background: "#fff",
                            borderRadius: 5,
                            // border: "1px solid #e7e7e7",
                            boxShadow:
                                "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.5)",
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
                                    lineHeight: "20px",
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
                                    {venue.activities.replace("training", "")}
                                </div>
                                <div
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        paddingRight: 16,
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
                                        width: 121,
                                        height: 81,
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
                            {ALL_DAYS ? undefined : <div>{classSection}</div>}
                        </div>
                    </Frame>
                )
            return element
        }) // venues
        // .slice().sort((a, b) => {
        //   return a.props.earliestScheduleTime - b.props.earliestScheduleTime
        // }) // venues

    // const venuesWithAvailability = ALL_DAYS ? venueElements :
    //   venueElements
    //     .filter(p => p.props.earliestScheduleTime !== -1);

    const venuesWithAvailability = venueElements
        .filter(p => p.props.earliestScheduleTime !== -1);


    var bottomSection = [];
    const venuesWithoutAvailability = venueElements.filter(p => p.props.earliestScheduleTime === -1);
    if (venuesWithAvailability.length < 20 && venuesWithoutAvailability.length > 0) {
      bottomSection.push(  <div style={{
          fontSize: 20,
          fontWeight: 700,
          margin: "40px 0 16px 16px",
          paddingRight: 32,
          color: "#333",
        }}>We found {venuesWithoutAvailability.length} other {props.activityFilter ? `"${props.activityFilter}"` : ""} venues in this area.</div>)
      bottomSection.push(venuesWithoutAvailability.slice(0, 20))

    }


    // console.info("HelloKitty took",performance.now() - performanceStart);
    let CATS = ["Fitness", "Wellness", "Gym"]
    let CATCOLORS = ["#E78F42", "#10A868", "#7663BC"];
    let catcolor;
    if (props.activityFilter == "Fitness") {
      CATS = ["Yoga", "Cycling", "Pilates", "Boxing", "Strength", "Barre"];
      catcolor = CATCOLORS[0];
    } else if (props.activityFilter == "Wellness") {
      catcolor = CATCOLORS[1];
      CATS = ["Massage", "Facial", "Cryotherapy", "Sports recovery"];
    } else if (props.activityFilter) {
      CATS = []
    }

    let catnav;
    if (CATS.length) {
      catnav = (<Scroll direction="horizontal" width="100%" style={{
        position: "relative",
        height: 50,
        overflow: "visible",
      }}>
      <Frame style={{
        background: "transparent",
        paddingLeft: 12,
        height: "auto",
        overflow: "visible",
        width: CATS.length * 150
      }}>
        {
          CATS.map((name, index) =>
            <Frame
              whileTap={{scale:0.98}}
            style={{
              position: "relative",
              display: "inline-flex",
              height: 50,
              width: 120,
              overflow: "visible",
              borderRadius: 8,
              padding: 8,
              boxShadow: "0 1px 2px 0 #00000030",
              background: `${CATS.length === 3 ? (CATCOLORS[index]) : catcolor}`,
              border: "1px solid #00000012",
              justifyContent: "left",
              color: "#fff",
              alignItems: "bottom",
              fontWeight: 500,
              fontSize: 14,
              marginRight: 8,
            }} onTap={e => props.onCategoryChange(name)}><div style={{alignSelf: "flex-end"}}>{name}</div></Frame>
          )

        }
      </Frame>
      </Scroll>)
    }

    return (
        <Frame
            size="100%"
            style={{
                fontSize: 14,
                fontFamily: "TT Norms",
                color: "#333",
                background: "#fff",
            }}
        >
            <div className="scroll_height" style={{ background: "#f7f7f7", paddingTop: 16 }}>
            {false && (<div style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#333",
            }}>
            We found {venuesWithAvailability.length} {props.activityFilter ? `"${props.activityFilter}"` : ""} Venues
            </div>)}

                {catnav}
                {venuesWithAvailability.slice(0, 20)}
                {venuesWithAvailability.length > 20
                    ? `Load ${venuesWithAvailability.length - 20} more results`
                    : ""}


              {bottomSection}
            </div>
        </Frame>
    )
}
