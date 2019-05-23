import { Data, Override, MotionValue, useAnimation } from "framer"

const data = Data({
    rotate: 45,
    rotateY: 0,
    toggle: true,
})

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export function AnimateCard(): Override {
    const controls = useAnimation()
    async function sequence() {
        await sleep(0.2)
        await controls.start({
            opacity: 1,
            // scale: 1,
            rotate: 0,
            x: 0,
            transition: {
                // ease: "easeInOut",
                type: "spring",
                mass: 1.5,
                duration: 0.4,
            },
        })
    }
    sequence()
    return {
        x: 10,
        // scale: 0.6,
        opacity: 0,
        rotate: 30,
        originX: 0.5,
        originY: 0,
        animate: controls,
    }
}

export function AnimateBackground(): Override {
    const controls = useAnimation()
    async function sequence() {
        await sleep(0.6)
        await controls.start({
            opacity: 1,
            scale: 1,
            transition: {
                // ease: "easeInOut",
                type: "spring",
                duration: 0.45,
            },
        })
    }
    sequence()
    return {
        opacity: 0,
        scale: 0.3,
        animate: controls,
    }
}
