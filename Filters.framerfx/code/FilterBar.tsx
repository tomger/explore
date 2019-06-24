import * as React from "react"
import { Frame, useCycle } from "framer"

const fitnessOptions = ["Yoga", "Pilates"]
const initialFilters = [
    { title: "Time", options: ["9am", "10am"] },
    { title: "Credits", options: [0, 1, 2, 3] },
    { title: "Distance", options: ["1 mile", "2 miles"] },
    { title: "Spots", options: ["1 spot", "2 spots", "3 spots"] },
    { title: "Activities", options: fitnessOptions },
    // { title: "Amenities", type: "group" },
    { title: "Parking", group: "Amenities", value: true },
    { title: "Showers", promoted: true, group: "Amenities" },
    { title: "Lockers", group: "Amenities" },
    // { title: "Level", type: "group" },
    { title: "Open", group: "Level" },
    { title: "Beginner", group: "Level" },
    { title: "Advanced", group: "Level" },
    // { title: "General", type: "group" },
    { title: "Offering a deal", promoted: true, group: "General" },
    { title: "Favorited", promoted: true, group: "General" },
    { title: "Good for new members", promoted: true, group: "General" },
    { title: "Trending", group: "General" },
    { title: "Popular", promoted: true, group: "General" },
    { title: "New", group: "General" },
]

const headerStyle = {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 500,
    borderTop: "1px solid #ddd",
}

export function FilterBar() {
    const [filters, setFilters] = React.useState(initialFilters)
    const [isDialogVisible, setIsDialogVisible] = React.useState(true)

    var dialog = isDialogVisible ? (
        <Frame width={375} height={667} background="white">
            {filters.map(filter => {
                if (filter.type === "group") {
                    return <div style={headerStyle}>{filter.title}</div>
                }
                let style = {
                    display: "flex",
                    height: 32,
                    flex: 1,
                }
                if (!filter.group) {
                    style = Object.assign(style, headerStyle)
                }
                if (filter.options) {
                    return (
                        <div style={style}>
                            <div style={{ flex: 1 }}>{filter.title}</div>
                            {filter.options.map(option => {
                                return <div>{option}</div>
                            })}
                        </div>
                    )
                    return
                } else {
                    return (
                        <div style={style}>
                            <div style={{ flex: 1 }}>{filter.title}</div>
                            {filter.value ? "ON" : "OFF"}
                        </div>
                    )
                }
            })}
        </Frame>
    ) : (
        undefined
    )

    return (
        <div
            style={{ background: "#fff", fontFamily: "TT Norms", fontSize: 16 }}
        >
            {filters
                .filter(filter => {
                    return filter.value || filter.promoted
                })
                .map(filter => {
                    return (
                        <div
                            onClick={e => {
                                filter.value = !filter.value
                                setFilters(filters.concat([]))
                            }}
                            style={{
                                fontSize: 14,
                                lineHeight: "28px",
                                padding: "0 8px",
                                borderRadius: 28,
                                display: "inline-block",
                                border: "1px solid #ddd",
                                background: filter.value ? "#0055ff1A" : "#fff",
                                borderColor: filter.value
                                    ? "#0055ff33"
                                    : "#ddd",
                            }}
                        >
                            {filter.title}
                        </div>
                    )
                })}
            {dialog}
        </div>
    )
}
