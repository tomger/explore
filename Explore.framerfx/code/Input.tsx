import * as React from "react"
import {
    addPropertyControls,
    ControlType,
    Frame,
} from "framer"


export function Input(props) {
    const [selected, setSelected] = React.useState(props.value);
    const [selectedFromProp, setSelectedFromProp] = React.useState(props.value);


    if (props.value !== selectedFromProp) {
      setSelectedFromProp(props.value);
      setSelected(props.value);
    }
    return (
        <input
          value={selected}
          onChange={e => {
            let value = e.target.value;
            setSelected(value);
            if (props.onValueChange) {

              props.onValueChange(value)
            }
        }}
          autocomplete="off"
          placeholder="Find an activity or venue"
          style={{
          width: props.width,
          height: props.height,
          fontFamily: "TT Norms",
          fontSize: 16,
          border: 0,
          outline: 0,
          borderWidth:0,
          background: "transparent",
          webkitAppearance: "none",
        }}/>
    )
}

Input.defaultProps = {
  height: 48,
  width: "100%"
}
