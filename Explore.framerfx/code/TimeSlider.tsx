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

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}


export function TimeSlider(props) {
    const [values, setValues] = React.useState([0, props.width])
    const [previousValue, setPreviousValue] = React.useState([0, 0])

    const timeOffset = 4// * 2
    const timeRange = 19// * 2

    const x1 = useMotionValue(0)
    const x2 = useMotionValue(props.width)

    const valueX = useMotionValue(0)
    const valueWidth = useMotionValue(props.width)

    React.useEffect(() => {
        return x1.onChange(onPan)
    })
    React.useEffect(() => {
        return x2.onChange(onPan)
    })

    const convertToHours = (pixels) => {
      return Math.round((pixels / props.width) * timeRange + timeOffset) // / 2
    }

    const prettyHours = (hours) => {
      if (hours == 12) {
        return hours + "pm"
      } else if (hours > 12) {
        return (hours - 12) + "pm"
      } else {
        return hours + "am"
      }
    }

    const onPan = _ => {
        const min = Math.min(x1.get(), x2.get())
        const max = Math.max(x1.get(), x2.get())
        valueX.set(min)
        valueWidth.set(max - min)
        setTimeout(() => {
          // ¯\_(ツ)_/¯
          setValues([x1.get(), x2.get()])
        },100)
    }

    const onDragEnd = () => {
      const min = Math.min(x1.get(), x2.get())
      const max = Math.max(x1.get(), x2.get())
      if (props.onChange) {
          const minHour = convertToHours(min)
          const maxHour = convertToHours(max)
          props.onChange(minHour, maxHour)
      }
    }

    const knobStyle = {
        background: "white",
        borderRadius: 32,
        boxShadow: "0 2px 4px rgba(0,0,0,.2)",
    }
    const knobLabelStyle = {
      height: 22, y: -27, width: 36, x: -2,
      borderRadius: 3,
      border: "1px solid #ddd",
      boxShadow: "0 1px 1px #eee",
      background: "#fff",

    }

    return (
        <Frame style={{ background: "transparent" }}>

            <Frame
                style={{
                    top: 14,
                    borderRadius: 4,
                    width: props.width,
                    height: 4,
                    background: "#d6d6d6",
                }}
            ></Frame>
            <Frame
                borderRadius={4}
                y={14}
                x={valueX}
                width={valueWidth}
                background="blue"
                height={4}
            ></Frame>
            <Frame
                dragElastic={0}
                dragMomentum={false}
                onDragEnd={onDragEnd}
                x={x1}
                size={32}
                left={-16}
                overdrag={false}
                style={knobStyle}
                drag="x"
                dragConstraints={{ left: 0, right: props.width }}
            ><Frame style={knobLabelStyle}>{prettyHours(convertToHours(values[0]))}</Frame></Frame>
            <Frame
                dragElastic={0}
                dragMomentum={false}
                onDragEnd={onDragEnd}
                x={x2}
                size={32}
                overdrag={false}
                left={-16}
                style={knobStyle}
                drag="x"
                dragConstraints={{ left: 0, right: props.width }}
            ><Frame style={knobLabelStyle}>{prettyHours(convertToHours(values[1]))}</Frame></Frame>
        </Frame>
    )
}

TimeSlider.defaultProps = {
    height: 24,
    width: "100%",
}
