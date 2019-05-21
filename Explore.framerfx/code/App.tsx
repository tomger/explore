import * as React from "react"

import {
    animate,
    Data,
    Animatable,
    PropertyControls,
    ControlType,
    Draggable,
    Frame,
    MotionValue,
    useMotionValue,
    useAnimation,
    useTransform,
    FramerAnimation,
    Scroll,
} from "framer"
import { Statusbar, Tabbar, HomeList, HomeList2, HomeList3 } from "./canvas"
import { ListMap } from "./ListMap"

export function App(props) {
    let [selectedTab, setSelectedTab] = React.useState(false)
    let home = (
        <HomeList3
            dragConstraints={{
                top: -250,
                bottom: 0,
            }}
            x={selectedTab ? "100%" : 0}
            drag={null}
        />
    )
    return (
        <Frame size="100%" overflow="hidden" background="white">
            <ListMap x={selectedTab ? 0 : "100%"} />
            {home}

            <Statusbar top={0} z={3} />
            <Tabbar
                bottom={0}
                z={3}
                onTap={e => {
                    setSelectedTab(!selectedTab)
                }}
            />
        </Frame>
    )
}
