import * as React from "react"
import schedules from "./dataset_schedules"
import {RenderTarget, Frame, Scroll} from "framer"


function formatTimestamp(starttime) {
  let date = new Date(1560052855000 + 8000 + starttime * 1000)
  let format = date
      .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZone: "America/New_York",
      })
      .toLowerCase()
  return format
}



export function ScheduleList(props) {
    if (RenderTarget.current() === RenderTarget.canvas) {
        schedules = schedules.slice(0, 4)
    }
    const dateFilter = props.dateFilter;
    const startTimeHour = new Date()
    const nowDay = new Date().getDay()
    const nowHour = new Date().getHours()

    const elements = schedules
      .filter(s => {
        if (!props.mapBounds) {
          return true;
        }

        return props.mapBounds.contains([s.venue.lat, s.venue.lon]);
      })
      .filter(s => {
        if (!props.activityFilter) {
          return true;
        }
        return s.class.activities.toLowerCase()
          .indexOf(props.activityFilter.toLowerCase()) !== -1;
      })
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
        return (
          <div style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #eee",
            padding: "12px 16px",
          }}>
            <div style={{width: 72}}>{formatTimestamp(s.starttime)}</div>
            <div style={{ }}>
              <div style={{fontWeight: 500}}>{s.class.name}</div>
              <div style={{color: "#333"}}>{s.venue.venue_name}</div>
              <div style={{color: "#7f7f7f"}}>{s.venue.location_name}</div>
              <div style={{color: "#7f7f7f"}}>{s.venue.display_rating_average}</div>
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
          <div className="scroll_height" style={{background: "#fff"}}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            margin: 16,
            color: "#333",
          }}>Found {elements.length} classes</div>
            {elements.slice(0, 80)}
            (Capped at 80 elements)
          </div>
        </Frame>
    )
}
