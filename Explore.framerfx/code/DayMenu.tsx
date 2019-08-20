import * as React from "react"
import { addPropertyControls, ControlType, Frame, Scroll } from "framer"

function addDaysToDate(input, days) {
    var date = new Date(input.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

export function DayMenu(props) {
    const [selected, setSelected] = React.useState(props.dateFilter)

    const dayStyle = {
        fontSize: 16,
        padding: "0 16px",
        alignItems: "center",
        textAlign: "left",
        justifyContent: "left",
        borderBottom: "1px solid #eee",
        height: 48,
        width: "100%",
        position: "relative",
        background: "transparent",
        fontFamily: "TT Norms",
    }

    const selectedStyle = {
        ...dayStyle,
        ...{
            color: "#05f",
            fontWeight: 500,
        },
    }

    const days = []
    for (let i = 0; i < 10; i++) {
        let d = addDaysToDate(new Date(), i)
        let label =
            d.toLocaleDateString("en-US", { weekday: "short" }) +
            " " +
            d.getDate()
        if (i === 0) {
            label = "Today"
        }
        days.push(
            <Frame
                key={i}
                onTap={() => {
                    setSelected(i)
                    setTimeout(() => {
                        if (props.onChange) {
                            props.onChange(d.getDay())
                        }
                    }, 20)
                }}
                style={selected === i ? selectedStyle : dayStyle}
            >
                {label}
            </Frame>
        )
    }

    return (
        <Scroll
            height={props.height}
            width="100%"
            direction="vertical"
            style={{
                background: "white",
                display: "flex",
                paddingLeft: 8,
            }}
        >
            <Frame
                style={{
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {days}
            </Frame>
        </Scroll>
    )
}

DayMenu.defaultProps = {
    height: 40,
    width: "100%",
}

addPropertyControls(DayMenu, {
    // tab1: { type: ControlType.ComponentInstance, title: "Tab 1" },
    // tab2: { type: ControlType.ComponentInstance, title: "Tab 2" },
})
