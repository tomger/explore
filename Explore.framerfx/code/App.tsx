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
    Scroll,
} from "framer"
import { Statusbar, Tabbar, HomeList, HomeList2, HomeList3 } from "./canvas"
import { ListMap } from "./ListMap"

const data = Data({
    selectedTab: true,
})

export function App(props) {
    let [selectedTab, setSelectedTab] = React.useState(data.selectedTab)
    return (
        <Frame size="100%" overflow="hidden" background="white">
            <ListMap x={selectedTab ? 0 : "100%"} />
            <HomeList3
                dragConstraints={{
                    top: -250,
                    bottom: 0,
                }}
                x={selectedTab ? "100%" : 0}
                drag={null}
            />

            <Statusbar top={0} z={3} />
            <Tabbar
                bottom={0}
                z={3}
                onTap={e => {
                    setSelectedTab(!selectedTab)
                    data.selectedTab = selectedTab
                }}
            />
        </Frame>
    )
}
