import * as React from "react"
import {
    addPropertyControls,
    ControlType,
    Frame,
} from "framer"


export function Input(props) {
    const [selected, setSelected] = React.useState(props.value);
    return (
        <input value={selected} onChange={e => {
          let value = e.target.value;
          setSelected(value);
          if (props.onValueChange) {

            props.onValueChange(value)
          }
        }} style={{
          width: props.width,
          height: props.height,
        }}/>
    )
}

Input.defaultProps = {
  height: 48,
  width: "100%"
}
