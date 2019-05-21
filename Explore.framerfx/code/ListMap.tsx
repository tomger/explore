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
} from "framer"
import {
    MapActions,
    Tabbar,
    MapMap,
    Carousel,
    Chrome,
    ChromeShadow,
    ChromeLine,
    Pane,
} from "./canvas"

import { ContentList } from "./ContentList"


export function ListMap(props) {
    const [debugInfo, setDebugInfo] = React.useState("Debug")
    const listTopControls = useAnimation()
    const listTop = useMotionValue(300)
    const [listContentTop, setListContentTop] = React.useState(0)
    const [carouselTop, setCarouselTop] = React.useState(667)
    const [mapActionOpacity, setMapActionOpacity] = React.useState(0)
    const [mapTapDown, setMapTapDown] = React.useState(false)
    let [listTapBeforeDrag, setListTapBeforeDrag] = React.useState(false)
    const mapTop = useTransform(listTop, value => {
        return Math.min(200, value * 0.7 - 367, 100)
    })   

    const showCarousel = () => {
        setCarouselTop(405)
    }

    const hideCarousel = () => {
        setCarouselTop(667)
    }

    const animateListToMiddle = () => {
        console.log("animateListToMiddle")
        setMapActionOpacity(0)
        listTopControls.stop()
        listTopControls.start({
            y: 300,
            transition: { ease: "easeIn", duration: 0.2 },
        })
    }

    const dockList = () => {
        console.log("dockList")
        setMapActionOpacity(1)
        // showCarousel();
        listTopControls.stop()
        listTopControls.start({
            y: 571,
            transition: { ease: "easeIn", duration: 0.2 },
        })
    }
    const onListTap = event => {
        console.log("onListTap", listTop.get())
        // setDebugInfo(debugInfo + " -- oLT " + listTop.get())
        if (listTop.get() > 550) {
            setListTapBeforeDrag(true)
            animateListToMiddle();
            event.stopPropagation();
        }
    }

    const onDragEnd = (event, info) => {
        const draggable = event.target
        const y = info.point.y;
        const animationOptions = { duration: 0.15 }

        if (listTapBeforeDrag) {
            setListTapBeforeDrag(false)
            animateListToMiddle()
            return
        }
        // if (listTop.get() > 550) {
        //     animateListToMiddle();
        //     return;
        // }

        // if (y < 90) {
        //     // navbar height?
        //     hideCarousel()
        //     return
        // }
        // console.log("velocity y", info.velocity.y);
        if (info.velocity.y > 100) {
            // going down
            if (y > 200) {

                dockList()
            } else if (y > 93) {
                // animateListToMiddle()
            }
            return
        }

        if (info.velocity.y < -100) {
            // we're going up
            hideCarousel()
            if (y > 400) {
                animateListToMiddle()
            }
            return;
        }
        if (y > 420) {
            dockList()
            setMapActionOpacity(1)
        } else if (y > 200) {
            animateListToMiddle()
            setMapActionOpacity(0)
        } else {
            setMapActionOpacity(0)
        } 
    }

    // const onDragAnimationStart = (animation, draggable) => {
    //     // data.listDragAnimation = draggable
    //     // data.listIsAnimating = true
    // }

    // const onDragAnimationEnd = (animation, draggable) => {
    //     // data.listIsAnimating = false
    //     let y = draggable.y.value
    //     if (y > 560) {
    //         showCarousel()
    //     }
    // }

    // const onScroll = () => {
    //     console.log(listTop.get());

    //     const offset = 270
    //     // data.listContentTop.set(Math.max(0, point.y - 558) * 2.2)
    //     // data.listHandleTop.set(Math.max(6, point.y - 558))
    //     // if (window.onMoveGrossHack) {
    //     //     window.onMoveGrossHack(point, draggable)
    //     // }
    //     // 117 - 67
    //     if (listTop.get() < 67) {
    //         // data.chromeShadow.set(0)
    //     } else if (listTop.get() < 130) {
    //         // data.chromeShadow.set((point.y - 60) / 50)
    //     } else {
    //         // data.chromeShadow.set(1)
    //     }

    //     if (!mapTapDown) {
    //         setMapTop(listTop.get() * 0.7 - 367)
    //     }
    // }
    // // listTop.onChange(onScroll);

    const onMapTapStart = () => {
        // setMapTapDown(true);
        dockList()
    }

    const onMapTapEnd = () => {
        setMapTapDown(false)
    }

    return (
        <Frame {...props} width={375} height={667} background="white" overflow="hidden">
            <MapMap
                y={mapTop}
                left={0}
                onTapStart={onMapTapStart}
                onTapCancel={onMapTapEnd}
            />
            <MapActions top={120} animate={{ opacity: mapActionOpacity }} />
            <Carousel left={0} initial={{top: carouselTop}} animate={{ top: carouselTop }} z={1} />
            <ContentList
                showTabs={{listTop}}
                drag={"y"}
                onDragEnd={onDragEnd}
                width={375}
                y={listTop}
                animate={listTopControls}
                onTap={onListTap}
                background="transparent"

            />
            <Chrome
                left={0}
                top={0}
                onTap={event => {
                    animateListToMiddle()
                }}
            />
        </Frame>
    )

    /*<Frame y={200} size={200} z={5}>{debugInfo}</Frame> */

    /*
      <Chrome key="a" left={0} top={0} />
                    <ChromeShadow
                        key="b"
                        top={116}
                        left={0}
                        animate={{ opacity: data.chromeShadow }}
                        z={5}
                    />
     */
}
