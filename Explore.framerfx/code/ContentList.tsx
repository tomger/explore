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

export function ContentList(props) {
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
    selectedStyle.borderBottom = "2px solid #0055ff"
    selectedStyle.color = "#05f"
    let content = data.venueList ? (
        <VenueList top={93} left={0} />
    ) : (
        <ScheduleList top={93} left={0} />
    )

    return (
        <Frame
            {...props}
            background="transparent"
            width="100%"
            dragConstraints={{
                bottom: 571,
                top: -content.props._sizeOfMasterOnCanvas.height + 530, // device height - chrome
            }}
            height={content.props._sizeOfMasterOnCanvas.height + 90}
        >
            <Pane top={0} left={0} z={0} />
            <Frame
                center
                style={{
                    background: "#DEDEDE",
                    height: 4,
                    width: 28,
                    borderRadius: 4,
                }}
                top={6}
            />
            <Frame
                onTap={() => {
                    data.venueList = !data.venueList
                }}
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
                <div style={tabStyle}>Studios</div>
                <div style={selectedStyle}>Classes</div>
            </Frame>

            <DatePicker y={dataPickerTop} left={0} z={1} />
            {content}
        </Frame>
    )
}
