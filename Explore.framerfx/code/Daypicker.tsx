import * as React from "react"
import {
    addPropertyControls,
    ControlType,
    Frame,
    Scroll,
} from "framer"

function addDaysToDate(input, days) {
    var date = new Date(input.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function Daypicker(props) {

    const [selected, setSelected] = React.useState(0);

    const dayStyle: React.CSSProperties = {
        whiteSpace: "nowrap",
        fontSize: 14,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        height: 36,
        background: "transparent",
        position: "relative",
        fontFamily: "TT Norms",
    }

    const selectedStyle: React.CSSProperties = {...dayStyle, ...{
        background: "#0055ff0a",
        boxShadow: "inset 0 0 0 1px #0055ff20",
        color: "#05f",
        borderRadius: 100,
        fontWeight: 500,
    }}

    const days = [];
    for (let i = -1; i < 10; i++) {
      let d = addDaysToDate(new Date(), i);
      let label = d.toLocaleDateString("en-US",{ weekday:"short"}) + " " + d.getDate()
      if (i === -1) {
        label = "All dates"
      } else if (i === 0) {
        label = "Today"
      }
      days.push(<Frame width={i === -1 ? 80 : 68} key={i} onTap={() => {
        setSelected(i);
        setTimeout(() => {
          if (props.onChange) {
            props.onChange(i === -1 ? -1 : d.getDay())
          }
        },1)
      }} style={selected === i ? selectedStyle : dayStyle}>{label}</Frame>)
    }

    return (
        <Scroll height={40} width="100%" direction="horizontal" style={{
          background: "white",
          display: "flex",
          paddingLeft: 8,
        }}>
          <Frame  style={{
            background: "transparent",
            display: "flex",
            flexDirection: "horizontal"
          }}>
          {days}
          </Frame>
        </Scroll>
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
