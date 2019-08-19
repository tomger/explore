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

export function prettyHours (hours) {
  if (hours == 12) {
    return hours + "pm"
  } else if (hours > 12) {
    return (hours - 12) + "pm"
  } else {
    return hours + "am"
  }
}

export function TimeSlider(props) {
    const timeOffset = 4// * 2
    const timeRange = 19// * 2

    const convertToHours = (pixels) => {
      return Math.round((pixels / props.width) * timeRange + timeOffset) // / 2
    }
    const convertToPixels = (hours) => {
      return Math.round(((hours - timeOffset) * props.width) / timeRange ) // / 2
    }

    let initial = [
      convertToPixels(props.timeRange[0]),
      convertToPixels(props.timeRange[1])
    ]
    const [values, setValues] = React.useState(initial)
    const [previousValue, setPreviousValue] = React.useState([0, 0])

    const x1 = useMotionValue(initial[0])
    const x2 = useMotionValue(initial[1])

    const valueX = useMotionValue(initial[0])
    const valueWidth = useMotionValue(initial[1] - initial[0])

    React.useEffect(() => {
        return x1.onChange(onPan)
    })
    React.useEffect(() => {
        return x2.onChange(onPan)
    })

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
      fontFamily: "TT Norms",
      height: 34, y: -50, width: 55, x: -14,
      borderRadius: 5,
      fontSize: 16,
      border: "1px solid #ddd",
      boxShadow: "0 1px 1px #eee",
      background: "#fff",

    }

    let merged = Math.abs(values[0]-values[1]) < 55;
    const min = convertToHours(Math.min(x1.get(), x2.get()))
    const max = convertToHours(Math.max(x1.get(), x2.get()))
    let mergedLabel = `${prettyHours(min)} - ${prettyHours(max)}`;
    if (merged) {
      knobLabelStyle.width = 110
      knobLabelStyle.x = (valueX.get() + valueWidth.get()/2 - 42) - x1.get();
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
            ><Frame style={knobLabelStyle}>{merged ? mergedLabel : prettyHours(convertToHours(values[0]))}</Frame></Frame>
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
            ><Frame visible={!merged} style={knobLabelStyle}>{prettyHours(convertToHours(values[1]))}</Frame></Frame>
        </Frame>
    )
}

TimeSlider.defaultProps = {
    height: 24,
    width: "100%",
    timeRange: [4, 23],
}
