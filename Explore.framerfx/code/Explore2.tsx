import * as React from "react"
import { Frame, useCycle, Override } from "framer"

import {
    animate,
    Data,
    Animatable,
    PropertyControls,
    MotionValue,
    AnimationControls,
    useMotionValue,
    useAnimation,
    useTransform,
    transform,
} from "framer"

const dockListY = 280
const data = Data({
    listContentTop: 0,
    carouselTop: 667,
    listTop: new MotionValue(0), // 300
    mapActionOpacity: 0,
    mapTapDown: false,
    listTapBeforeDrag: false,
})

const dockList = animation => {
    data.mapActionOpacity = 1

    // animate.ease(data.listTop, dockListY)
    // data.listTop.start(animation)
    if (animation) {
        animation.stop()
        animation.start({
            y: dockListY,
            transition: { ease: "easeIn", duration: 0.2 },
        })
    } else {
        data.listTop.set(dockListY)
    }
}

const animateListToMiddle = animation => {
    console.log("animateListToMiddle")
    data.mapActionOpacity = 0
    // data.listTop.set(0)
    animation.stop()
    animation.start({
        y: 0,
        transition: { ease: "easeIn", duration: 0.2 },
    })
}

const showCarousel = () => {
    data.carouselTop = 405
}

const hideCarousel = () => {
    data.carouselTop = 667
}

export function MapActions(): Override {
    return {
        top: 120,
        initial: { opacity: 0 },
        animate: { opacity: data.mapActionOpacity },
    }
}

export function StickyCalendar(): Override {
    return {
        top: useTransform(data.listTop, value => {
            if (value > -221) {
                return 0
            } else {
                return -value - 221
            }
        }),
    }
}

export function Map(): Override {
    const mapTop = useTransform(data.listTop, value =>
        Math.min(200, value * 0.7 - 200, 100)
    )
    return {
        y: mapTop,
        left: 0,
        onTapStart: () => {
            dockList(null) //xxx
        },
        onTapCancel: () => {
            data.mapTapDown = false
        },
    }
}

export function Carousel(): Override {
    return {
        left: 0,
        initial: { top: data.carouselTop },
        animate: { top: data.carouselTop },
        z: 1,
    }
}

export function ContentList(): Override {
    // const listTop = useMotionValue(300)
    const animation = useAnimation()
    return {
        // animate: listTopControls,
        // showTabs: data.listTop,
        drag: "y",
        y: data.listTop,
        onDrag: (_, info) => {
            // console.log(info.point.y)
        },
        animate: animation,
        dragConstraints: {
            bottom: dockListY,
        },
        onTap: event => {
            // if (data.listTop.get() > 550) {
            console.log(data.listTop.get())
            if (data.listTop.get() > 200) {
                data.listTapBeforeDrag = true
                animateListToMiddle(animation)
                event.stopPropagation()
            }
        },

        onDragEnd: (event, info) => {
            const draggable = event.target
            const y = info.point.y
            const animationOptions = { duration: 0.15 }
            console.log(y)
            if (data.listTapBeforeDrag) {
                data.listTapBeforeDrag = false
                animateListToMiddle(animation)
                return
            }

            if (info.velocity.y > 100) {
                // going down
                if (y > 200) {
                    dockList(animation)
                } else if (y > 93) {
                }
                return
            }

            if (info.velocity.y < -100) {
                hideCarousel()
                if (y > 400 - 300) {
                    animateListToMiddle(animation)
                }
                return
            }
            if (y > 120) {
                dockList(animation)
                data.mapActionOpacity = 1
            } else if (y > -100) {
                animateListToMiddle(animation)
                data.mapActionOpacity = 0
            } else {
                data.mapActionOpacity = 0
            }
        },
    }
}

/*
export function ListMap(props) {
    







    return (
  
     
            <Chrome
                left={0}
                top={0}
                onTap={event => {
                    animateListToMiddle()
                }}
            />
        </Frame>
    )
}
*/
