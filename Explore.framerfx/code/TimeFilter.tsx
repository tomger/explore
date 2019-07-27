import * as React from "react"
import { addPropertyControls, ControlType, Data, Frame, Scroll } from "framer"

const data = Data({})

export function TimeFilter(props) {
    // var [venueList, setVenueList] = React.useState(data.venueList)

    const pillStyle: React.CSSProperties = {
        border: "1px solid #f7f7f7",
        borderRadius: 32
    }

    // const selectedStyle = Object.assign({}, tabStyle)
    // selectedStyle.color = "#05f"

    return (
        <div style={pillStyle} >
            Heeey
        </div>
    )
}

TimeFilter.defaultProps = {
    height: 24,
    width: "100%",
}
