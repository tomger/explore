import { Data, Override } from "framer"

const data = Data({
    rotate: 0,
    rotateY: 0,
    toggle: true,
})

export function TapEffect(): Override {
    return {
        whileTap: { scale: 0.97 },
    }
}

export function Draggable(): Override {
    return {
        drag: true,
    }
}

export function Rotate(): Override {
    return {
        animate: { rotate: data.rotate },
        onTap() {
            data.rotate = data.rotate + 90
        },
    }
}

export function FlipInput(): Override {
    return {
        onTap() {
            const toggle = data.toggle
            data.rotateY = toggle ? 180 : 0
            data.toggle = !toggle
        },
    }
}

export function FlipOutput(): Override {
    return {
        animate: { rotateY: data.rotateY },
    }
}
