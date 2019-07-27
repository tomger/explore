import * as React from "react"
import {
    addPropertyControls,
    ControlType,
    Data,
    Frame,
    Scroll,
} from "framer"

const data = Data({

})

function addDaysToDate(input, days) {
    var date = new Date(input.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function Daypicker(props) {
    // var [venueList, setVenueList] = React.useState(data.venueList)

    const dayStyle: React.CSSProperties = {
        whiteSpace: "nowrap",
        fontSize: 16,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
    }

    // const selectedStyle = Object.assign({}, tabStyle)
    // selectedStyle.color = "#05f"


    const days = [];
    for (let i = 0; i < 10; i++) {
      let d = addDaysToDate(new Date(), i);
      let label = d.toLocaleDateString("en-US",{ weekday:"short", day: "numeric"})
      days.push(<div onClick={() => {
        if (props.onChange) {
          props.onChange(i)
        }
      }} style={dayStyle}>{label}</div>)
    }

    return (
        <Frame background="pink" size="100%">
          <Scroll direction="horizontal" size="100%">
          <Frame style={{
            background: "transparent",
            display: "flex"
          }}>{days}</Frame>
          </Scroll>
        </Frame>
    )
}

Daypicker.defaultProps = {
  height: 40,
  width: "100%"
}

addPropertyControls(Daypicker, {
    // tab1: { type: ControlType.ComponentInstance, title: "Tab 1" },
    // tab2: { type: ControlType.ComponentInstance, title: "Tab 2" },
})
