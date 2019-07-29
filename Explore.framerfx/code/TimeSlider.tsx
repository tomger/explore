import * as React from "react"
import {
    useMotionValue,
    useTransform,
    addPropertyControls,
    ControlType,
    Data,
    Frame,
    Scroll,
} from "framer"

export function TimeSlider(props) {
    const [valueStart, setValueStart] = React.useState(0)
    const [valueEnd, setValueEnd] = React.useState(0)

    const timeOffset = 4 * 2
    const timeRange = 19 * 2

    const x1 = useMotionValue(0)
    const x2 = useMotionValue(0)

    const valueX = useMotionValue(0)
    const valueWidth = useMotionValue(0)
    React.useEffect(() => {
        return x1.onChange(onPan)
    })
    React.useEffect(() => {
        return x2.onChange(onPan)
    })

    const onPan = _ => {
        const min = Math.min(x1.get(), x2.get())
        const max = Math.max(x1.get(), x2.get())
        setValueStart(
            Math.round((min / props.width) * timeRange + timeOffset) / 2
        )
        setValueEnd(
            Math.round((max / props.width) * timeRange + timeOffset) / 2
        )
        valueX.set(min)
        valueWidth.set(max - min)
    }

    const knobStyle = {
        background: "white",
        borderRadius: 32,
        boxShadow: "0 2px 4px rgba(0,0,0,.2)",
    }

    return (
        <Frame style={{ background: "transparent" }}>
            <Frame
                style={{
                    top: 10,
                    borderRadius: 4,
                    width: props.width,
                    height: 4,
                    background: "#d6d6d6",
                }}
            ></Frame>
            <Frame
                borderRadius={4}
                y={10}
                x={valueX}
                width={valueWidth}
                background="blue"
                height={4}
            ></Frame>
            <Frame
                x={x1}
                size={24}
                left={-12}
                overdrag={false}
                style={knobStyle}
                drag="x"
                dragConstraints={{ left: 0, right: props.width }}
            ></Frame>
            <Frame
                x={x2}
                size={24}
                overdrag={false}
                left={-12}
                style={knobStyle}
                drag="x"
                dragConstraints={{ left: 0, right: props.width }}
            ></Frame>
        </Frame>
    )
}

TimeSlider.defaultProps = {
    height: 24,
    width: "100%",
}
