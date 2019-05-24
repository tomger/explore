import * as React from "react"
import {
    useTransform,
    useMotionValue,
    addPropertyControls,
    ControlType,
    Data,
    Frame,
} from "framer"
import { DatePicker, ScheduleList, VenueList, Pane } from "./canvas"
const data = Data({
    datePickerTop: 50,
    venueList: true,
})

export function Tabs(props) {
    var [venueList, setVenueList] = React.useState(data.venueList)
    var listTopMotionValue = useMotionValue(300)
    if (props && props.showTabs) {
        listTopMotionValue = props.showTabs.listTop
    }
    const tabsOpacity = useTransform(listTopMotionValue, [560, 571], [1, 0])
    const dataPickerTop = useTransform(listTopMotionValue, value => {
        if (value < 66) {
            return -value + 66 + 50
        } else {
            return 50
        }
    })

    const tabStyle: React.CSSProperties = {
        color: "#333",
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "TT Norms",
        lineHeight: "52px",
        borderBottom: "1px solid #e7e7e7",
    }

    const selectedStyle = Object.assign({}, tabStyle)
    selectedStyle.color = "#05f"

    return (
        <Frame background="transparent" size="100%">
            <Frame
                height={2}
                background="#05f"
                y={48}
                z={2}
                width={375 / 2}
                animate={{ left: !venueList ? 375 / 2 : 0 }}
                transition={{ ease: "easeOut", duration: 0.2 }}
            />
            <Frame
                z={1}
                opacity={tabsOpacity}
                height={50}
                style={{
                    width: "100%",
                    top: 0,
                    display: "flex",
                    flexDirection: "row",
                    background: "transparent",
                }}
            >
                <div
                    onClick={() => {
                        setVenueList(true)
                        data.venueList = true
                    }}
                    style={!venueList ? tabStyle : selectedStyle}
                >
                    Studios
                </div>
                <div
                    onClick={() => {
                        setVenueList(false)
                        data.venueList = false
                    }}
                    style={!venueList ? selectedStyle : tabStyle}
                >
                    Classes
                </div>
            </Frame>
            <Frame top={50}>
                <Frame left={!venueList ? 375 : 0}>{props.tab1}</Frame>
                <Frame left={venueList ? 375 : 0}>{props.tab2}</Frame>
            </Frame>
        </Frame>
    )
}

addPropertyControls(Tabs, {
    tab1: { type: ControlType.ComponentInstance, title: "Tab 1" },
    tab2: { type: ControlType.ComponentInstance, title: "Tab 2" },
})
