import * as React from "react"
import { addPropertyControls, ControlType, Data, Frame, Scroll } from "framer"

const data = Data({})

export function TimeFilter(props) {
    // var [venueList, setVenueList] = React.useState(data.venueList)

    const pillStyle: React.CSSProperties = {
        border: "1px solid #d6d6d6",
        borderRadius: 32,
        height: 24,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 8px",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "TT Norms",
    }

    // const selectedStyle = Object.assign({}, tabStyle)
    // selectedStyle.color = "#05f"

    return (
      <Frame style={{background: "transparent"}}>
        <div style={pillStyle} >
            Time
        </div>
      </Frame>
    )
}

TimeFilter.defaultProps = {
    height: 24,
    width: "100%",
}
