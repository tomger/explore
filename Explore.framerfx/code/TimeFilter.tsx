import * as React from "react"
import { addPropertyControls, ControlType, Data, Frame, Scroll } from "framer"

const data = Data({})

export function prettyHours (hours) {
  if (hours == 12) {
    return hours + "pm"
  } else if (hours > 12) {
    return (hours - 12) + "pm"
  } else {
    return hours + "am"
  }
}

function addDaysToDate(input, days) {
    var date = new Date(input.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


export function TimeFilter(props) {
    // var [venueList, setVenueList] = React.useState(data.venueList)
    /*
    Time          Popup
    Sort          Popup (could be single "Top rated")
    Credits       Popup
    Distance      Popup
    Spots         Popup (could be single "2 spots")
    Activities    Popup (can't be singles == catnav)
    Amenities     Singles
    Level         Singles
    General       Singles
    */

    let timeLabel = `${prettyHours(props.timeRange[0])} – ${prettyHours(props.timeRange[1])}`

    let d = addDaysToDate(new Date(), props.dateFilter-1);
    let dateLabel = d.toLocaleDateString("en-US",{ weekday:"short"}) + " " + d.getDate()


    let filters = [timeLabel, dateLabel, "Credits", "Amenities", "Favorited"];
    let pills = filters.map((name, index) => {
      const selected =
        (index === 0 && (props.timeRange[0] !== 4 || props.timeRange[1] !== 23)) ||
        (index === 1 && (props.dateFilter !== (new Date).getDay()))
      const frame = <Frame style={{
        fontFamily: "TT Norms",
        fontSize: 14,
        fontWeight: 500,
        color: selected ? "#05f" : "#333",
        position: "relative",
        display: "inline-flex",
        height: 32,
        width: "auto",
        padding: "4px 16px",
        borderRadius: 100,
        background: selected ? "#EDF3FF" : "#fff",
        border: selected ? "1px solid #CEDAE8" : "1px solid #ddd",
        marginRight: 4,
        // cursor: "pointer",
      }} onTap={e => props.onFilterTap(name, index)}>{name}</Frame>
      return frame;
    }
    )


    // const selectedStyle = Object.assign({}, tabStyle)
    // selectedStyle.color = "#05f"

    // <Frame {...props} style={{background: "transparent"}}>
    // <div style={pillStyle} >
    //
    // </div>
    // </Frame>
    return (
      <div>
      <Scroll {...props} direction="horizontal" style={{
          background: "#fff",
      }}>
        <Frame style={{
          background: "transparent",
          width: "auto",
          whiteSpace: "nowrap",
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 12,
          paddingRight: 12,
        }}>
          {pills}
        </Frame>
      </Scroll>

      </div>
    )
}
// <Frame
// bottom={0}
// left={0}
// right={0}
// style={{
//   position: "fixed",
//   zIndex: 10,
//   height: "auto",
//   background: "#fff",
//   boxShadow: "0 0 20px rgba(0, 0, 0, .3)"
// }}>
//   Hello
// </Frame>
TimeFilter.defaultProps = {
    height: 40,
    width: "100%",
    timeRange: [4, 23],
    dateFilter: 0,
}
