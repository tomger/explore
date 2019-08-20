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
        height: 48,
        color: "#333",
        background: "transparent",
        position: "relative",
        fontFamily: "TT Norms",
        borderBottom: "2px solid transparent",
    }

    const selectedStyle: React.CSSProperties = {...dayStyle, ...{
        color: "#05f",
        fontWeight: 500,
        fontSize: 14,
        borderBottom: "2px solid #05f",
    }}

    const days = [];
    for (let i = 0; i < 10; i++) {
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
        <div>
        <Frame width="100%" style={{ height: 1, bottom: 0, background: "#eee"}}></Frame>
        <Frame width="100%" style={{ height: 1, top: 0, background: "#eee"}}></Frame>
        <Scroll height={48} width="100%" direction="horizontal" style={{
          background: "transparent",
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
        </div>
    )
}

Daypicker.defaultProps = {
  height: 48,
  width: "100%"
}

addPropertyControls(Daypicker, {
    // tab1: { type: ControlType.ComponentInstance, title: "Tab 1" },
    // tab2: { type: ControlType.ComponentInstance, title: "Tab 2" },
})
