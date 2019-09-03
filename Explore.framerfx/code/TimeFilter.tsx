import * as React from "react"
import { addPropertyControls, ControlType, Data, Frame, Scroll } from "framer"

const data = Data({})

export function prettyHours (hours) {
  if (hours == 12) {
    return hours + " pm"
  } else if (hours > 12) {
    return (hours - 12) + " pm"
  } else {
    return hours + " am"
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
    let offset = props.dateFilter - new Date().getDay();
    let d = addDaysToDate(new Date(), offset);
    let dateLabel = offset === 0 ? "Today" : d.toLocaleDateString("en-US",{ weekday:"short"}) + " " + d.getDate()


    let filters = [timeLabel, "Credits", "Amenities", "Favorited"];
    // let filters = [timeLabel, dateLabel, "Credits", "Amenities", "Favorited"];
    let pills = filters.map((name, index) => {
      const selected =
        (index === 0 && (props.timeRange[0] !== 4 || props.timeRange[1] !== 23))
        // || (index === 1 && (props.dateFilter !== (new Date).getDay()))
      const frame = <Frame style={{
        fontFamily: "TT Norms",
        fontSize: 14,
        fontWeight: 500,
        color: selected ? "#05f" : "#333",
        position: "relative",
        display: "inline-block",
        height: 32,
        width: "auto",
        padding: "6px 16px 4px 16px",
        borderRadius: 100,
        background: selected ? "#EDF3FF" : "#fff",
        border: selected ? "1px solid #CEDAE8" : "1px solid #ddd",
        marginRight: 4,
        // cursor: "pointer",
      }} onTap={e => props.onFilterTap(name, index)}>{name}</Frame>
      return frame;
    }
    )

    pills = [(<Frame onTap={e=>{}} style={{
      fontFamily: "TT Norms",
      fontSize: 14,
      fontWeight: 500,
      color:  "#fff",
      position: "relative",
      display: "inline-block",
      height: 32,
      width: "auto",
      padding: "6px 16px 4px 16px",
      borderRadius: 100,
      background:  "#fff",
      border:  "1px solid #ddd",
      marginRight: 4,
    }}>Filt

<svg style={{position: "absolute", left: 14, top: 3}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M 19.125 16 L 11.696 16 C 11.277 17.127 10.202 17.875 9 17.875 C 7.798 17.875 6.723 17.127 6.304 16 L 4.875 16 C 4.392 16 4 15.608 4 15.125 C 4 14.642 4.392 14.25 4.875 14.25 L 6.224 14.25 C 6.564 12.996 7.701 12.126 9 12.126 C 10.299 12.126 11.436 12.996 11.776 14.25 L 19.125 14.25 C 19.608 14.25 20 14.642 20 15.125 C 20 15.608 19.608 16 19.125 16 Z M 9 13.875 C 8.379 13.875 7.875 14.379 7.875 15 C 7.875 15.621 8.379 16.125 9 16.125 C 9.621 16.125 10.125 15.621 10.125 15 C 10.125 14.379 9.621 13.875 9 13.875 Z" fill="rgb(0,0,0)"></path><path d="M 13.875 9 C 13.875 8.379 14.379 7.875 15 7.875 C 15.621 7.875 16.125 8.379 16.125 9 C 16.125 9.621 15.621 10.125 15 10.125 C 14.379 10.125 13.875 9.621 13.875 9 Z M 15 11.875 C 16.202 11.875 17.277 11.127 17.696 10 L 19.125 10 C 19.608 10 20 9.608 20 9.125 C 20 8.642 19.608 8.25 19.125 8.25 L 17.776 8.25 C 17.436 6.996 16.299 6.126 15 6.126 C 13.701 6.126 12.564 6.996 12.224 8.25 L 4.875 8.25 C 4.392 8.25 4 8.642 4 9.125 C 4 9.608 4.392 10 4.875 10 L 12.304 10 C 12.723 11.127 13.798 11.875 15 11.875 Z" fill="#000"></path></svg>
    </Frame>),
    ...pills]

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
          background: "#fff",
          width: "auto",
          whiteSpace: "nowrap",
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 12,
          paddingRight: 12,
        }}>
          <div>
          {pills}
          </div>
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
