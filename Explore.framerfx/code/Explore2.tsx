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

const DEFAULT_KEYWORD_TEXT = "Find an activity or venue"
const dockListY = 280
const data = Data({
    listContentTop: 0,
    carouselTop: 667,
    listTop: new MotionValue(0), // 300
    mapActionOpacity: 0,
    mapTapDown: false,
    listTapBeforeDrag: false,
    keyword: DEFAULT_KEYWORD_TEXT,
    keywordFieldBack: false,
    loading: false,
    dateFilter: (new Date).getDay(),
    timeRange: [4, 23],
    timePickerVisible: false,
    mapBounds: null,
    contentListHeight: 2000,
    activityFilter: "",
    confirmationDialogActive: false,
    selectedDetailData: null,
    datePickerVisible: false,
    venueListOffset: new MotionValue(-160),
    scrollDirection: 0,
    scrollTop: 0,
    locationText: "Current Location",
})

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

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

export function KeywordField(): Override {
    return {
        text: data.keyword,
    }
}

export function MapFill(): Override {
    if (!data.loading) {
        return {}
    }
    return {
        background: "#eee",
    }
}

export function KeywordFieldIcon(): Override {
    return {
        visible: !data.keywordFieldBack,
    }
}

export function KeywordFieldBack(): Override {
    return {
        visible: data.keywordFieldBack,
        onTap: () => {
            data.keyword = DEFAULT_KEYWORD_TEXT
            data.keywordFieldBack = false
        },
    }
}

export function ShownOnBack(): Override {
    return {
        visible: data.keywordFieldBack && !data.loading,
    }
}
export function ShownOnRoot(): Override {
    return {
        visible: !data.keywordFieldBack,
    }
}
export function ShownOnLoading(): Override {
    return {
        visible: data.loading,
    }
}

export function CatNav(): Override {
    return {
        whileTap: { background: "#f2f2f2" },
        onTap: () => {
            let queue = async () => {
                data.keywordFieldBack = true
                data.loading = true
                await sleep(Math.random() * 0.8 + 0.5)
                data.loading = false
            }
            queue()
        },
    }
}



////// THE NEW WORLD

export function ActivityPicker(): Override {
    return {
        value: data.activityFilter,
        onValueChange: value => {
            data.activityFilter = value
        },
    }
}

let mapPickerInit = Date.now();
export function MapPicker(): Override {
    return {
        activityFilter: data.activityFilter,
        onChange: bounds => {
            data.mapBounds = bounds;
            if (mapPickerInit < Date.now() - 1000*5) {
              data.locationText = "Mapped Area";
            }
        },
    }
}


export function ScheduleDetailScroll() : Override {

  return {
    top: data.confirmationDialogActive ? 0 : 700,
    transition: { ease: "easeOut", duration: 0.2 },
    animate: { top: data.confirmationDialogActive ? 0 : 700}
  }
}


export function ScheduleDetail() : Override {
  return {
    onClose: function() {
      data.confirmationDialogActive = false
    },
    data: data.selectedDetailData,
  }
}

function wtf(s){
  if (data.confirmationDialogActive) {
    return; // hack cause i can't figure out stopPropagation
  }
  data.selectedDetailData = s;
  data.confirmationDialogActive = true;
}
function onCategoryChange(cat) {
  data.activityFilter = cat
}
export function VenueList(): Override {
    return {
        dateFilter: data.dateFilter,
        timeRange: data.timeRange,
        mapBounds: data.mapBounds,
        activityFilter: data.activityFilter,
        onScheduleTapped: wtf,
        onCategoryChange: onCategoryChange,
    }
}

export function Fog(): Override {
    return {
        height: data.datePickerVisible || data.timePickerVisible ? 500 : 0,
        onTap: function() {
          data.timePickerVisible = false
          data.datePickerVisible = false
        }
    }
}
export function DatePickerVisible(): Override {
    return {
        visible: data.datePickerVisible,
    }
}

export function TimePickerVisible(): Override {
    return {
        visible: data.timePickerVisible,
    }
}

export function TimeSlider(): Override {
    return {
        visible: data.dateFilter === -1 ? false : true,
        timeRange: data.timeRange,
        onChange: (min, max) => {
            data.timeRange = [min, max]
        },
    }
}

export function Backbutton(): Override {
    return {
        activityFilter: data.activityFilter,
        onTap: function() {
          data.activityFilter = "";
        }
    }
}

export function TimePickerResetOnTap(): Override {
    return {
        onTap: function() {
            data.timeRange = [4, 23]
            data.timePickerVisible = false
        },
    }
}
export function TimePickerHideOnTap(): Override {
    return {
        onTap: () => {
            data.timePickerVisible = false
        },
    }
}

export function TimePill(): Override {
    return {
        dateFilter: data.dateFilter,
        timeRange: data.timeRange,
        onFilterTap: (name, index) => {
          if (index === 0) { //time
            data.timePickerVisible = true
          }
          // if (index === 1) { //time
          //   data.datePickerVisible = true
          // }
        },
    }
}


export function LocationText(): Override {
    return {
        text: data.locationText
    }
}

export function StatusBar(): Override {
    return {
        onTap: function() {
          // console.log("StatusBar",data.venueListOffset);
          if (data.venueListOffset.stopAnimation)
            data.venueListOffset.stopAnimation();
          data.venueListOffset.set(-160);
        }
    }
}

const initialOffset = 342 - 20
var turnDirection = 0;
var turnBarOffset = 0;
var turnOffset = 0;
var barOffset = 0;

export function DatePicker(): Override {

    return {
        onChange: dateOffset => {
            data.dateFilter = dateOffset
        },
        shadow: useTransform(data.venueListOffset, value => {
            if (value > -initialOffset) {
                return ""
            } else {
                return "0 0 15px 0 #00000030"
            }
        }),
        top: useTransform(data.venueListOffset, value => {
          console.log("offset =", value)
            const INITIAL_TOP = 112
            const BAR_HEIGHT = 49
            let rv
            if (value > -initialOffset) {
              return INITIAL_TOP;
            }
            if (turnDirection === -1) {
                // going up
                let delta = turnBarOffset
                rv = Math.max(delta + value - turnOffset, -BAR_HEIGHT)
            } else if (turnDirection === 1) {
                // going down
                let delta = turnBarOffset + BAR_HEIGHT
                rv = Math.min(delta + value - (turnOffset + BAR_HEIGHT), 0)
            } else {
              rv = 0
            }
            barOffset = rv
            return INITIAL_TOP + rv



        })
    }
}


export function StickyChrome(): Override {

    const cardHeight = 158
    return {

        top: useTransform(data.venueListOffset, value => {
          if (value > -initialOffset) {
            return 0;
          } else {
            return -value - initialOffset
          }
        }),
    }
}


export function Scrollable(props): Override {
    const el = document.querySelector(`#${props.children[0].props.children[0].props.id}`);
    if (el) {
      el.parentNode.parentNode.style.overflow = "visible";
      el.parentNode.parentNode.parentNode.style.overflow = "visible";
    }
    return {
      contentOffsetY: data.venueListOffset, //-160,
      contentHeight: data.contentListHeight + 350,
      onScroll: function(info) {

        // XXX move into non-data
        let newDirection = Math.sign(info.delta.y)
        if (data.venueListOffset.get() > -initialOffset) {
          newDirection = 0;
        }
        if (turnDirection !== newDirection) {
            turnOffset = data.venueListOffset.get()
            turnBarOffset = barOffset
        }
        turnDirection = newDirection
      },
      onScrollStart: function(info) {
        const scrollHeightElement = el.querySelector(".scroll_height");
        if (scrollHeightElement) {
          data.contentListHeight = scrollHeightElement.offsetHeight;
        }
      }
    }
}

export function Draggable(props): Override {
    // const hack = document.querySelector("#xxx_hellokitty_height");
    // const height = hack ? hack.offsetHeight : 1000;
    return {
        drag: "y",
        dragConstraints: {bottom: 200, top: -data.contentListHeight+290},
        onDragStart: function() {
          let el = document.querySelector("#xxx_hellokitty_height");
          if (el) {
            console.log("x", el.offsetHeight)
            data.contentListHeight = el.offsetHeight;
          }
        }
    }
}
