import { Data, Override, MotionValue } from "framer"

const data = Data({
    rotate: 45,
    rotateY: 0,
    toggle: true,
})

export function AnimateCard(): Override {
    return {
        rotate: 45,
        // initial: { rotate: 24 },
        // animate: { rotate: 0 },
        // rotate: data.rotate,
        // onTap: () => {
        //     console.log(data.rotate)
        //     data.rotate.set(data.rotate.get() + 90)
        // },
    }
}
