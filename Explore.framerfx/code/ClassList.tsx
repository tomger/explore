import * as React from "react"
import classes from "./classes"

export function ClassList() {
    const elements = classes.map(klass => {
        klass.schedules.sort((a, b) => {
            return a.starttime - b.starttime
        })

        let schedules = klass.schedules
            // .filter(s => s.starttime > 60 * 60 * 24 * 2)
            .slice(0, 3)
            .map(s => {
                let date = new Date(1560052855000 + s.starttime * 1000)
                let format =
                    date.toLocaleDateString("en-US", {
                        weekday: "short",
                        timeZone: "America/Denver",
                    }) +
                    " " +
                    date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "America/Denver",
                    })
                return (
                    <span
                        style={{
                            display: "inline-block",
                            border: "1px solid #e7e7e7",
                            borderRadius: 100,
                            padding: "4px 10px",
                            margin: "0 4px 0 0",
                            fontSize: 13,
                        }}
                    >
                        {format}
                    </span>
                )
            })

        let header = (
            <div
                style={{
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        "flex-direction": "row",
                        marginBottom: 8,
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            "flex-direction": "column",
                            "justify-content": "center",
                            display: "flex",
                        }}
                    >
                        <div style={{ "font-weight": "500", fontSize: "16px" }}>
                            {klass.name}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            {klass.venue.venue_name}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            {klass.venue.location_name}
                        </div>
                        <div style={{ fontSize: 14 }}>
                            {klass.venue.display_rating_average} (
                            {klass.venue.display_rating_total})
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        "flex-direction": "column",
                        display: "flex",
                    }}
                />
            </div>
        )

        return (
            <div
                style={{
                    padding: "12px",
                    fontSize: 16,
                    borderTop: "1px solid #e7e7e7",
                }}
            >
                {header}
                <div>
                    {schedules}{" "}
                    {klass.schedules.length > 3 ? (
                        <span
                            style={{
                                fontSize: 12,
                                color: "#aaa",
                                fontWeight: 500,
                            }}
                        >
                            + MORE
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        )
    })

    return (
        <div
            style={{
                fontSize: 14,
                fontFamily: "TT Norms",
                color: "#333",
                background: "#fff",
            }}
        >
            {elements}
        </div>
    )
}
