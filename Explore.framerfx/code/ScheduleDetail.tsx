import * as React from "react"
import {RenderTarget, Frame, Scroll} from "framer"

function formatTimestamp(starttime) {
  let date = new Date(1560052855000 + 8000 + starttime * 1000)
  let format = date
      .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZone: "America/New_York",
      })
      .toLowerCase()
  return format;
}


//
// function mapSchedules(s) {
//     let date = new Date(1560052855000 + 8000 + s.starttime * 1000)
//     let format = date
//         .toLocaleTimeString("en-US", {
//             hour: "numeric",
//             minute: "numeric",
//             timeZone: "America/New_York",
//         })
//         .toLowerCase()
//     return (
//         <span
//             key={s.starttime}
//             style={{
//                 display: "inline-block",
//                 border: "1px solid #e7e7e7",
//                 borderRadius: 3,
//                 boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06)",
//                 padding: "4px 10px",
//                 margin: "0 4px 0 0",
//                 fontSize: 13,
//                 fontWeight: 500,
//                 width: 105,
//                 height: 26,
//                 whiteSpace: "nowrap",
//                 textAlign: "center",
//             }}
//         >
//             {format}{" "}
//             <span
//                 style={{
//                     borderLeft: "1px solid #e7e7e7",
//                     paddingLeft: 8,
//                     marginLeft: 4,
//                     fontWeight: 500,
//                     color: "#7f7f7f",
//                 }}
//             >
//                 {s.availability.credits}
//             </span>
//         </span>
//     )
// }

export function ScheduleDetail(props) {
    const dateFilter = props.dateFilter;
    const startTimeHour = new Date()
    const data = props.data;
    if (!data) {
      return <Frame></Frame>
    }

    let scheduleList = [];
    if (data.schedules) {
      scheduleList = data.schedules.map(s => {
        let isSelected = data.schedule && s.id == data.schedule.id;
        return (<Frame style={{
          fontSize: 16,
          fontWeight: 300,
          margin: "16px 8px 0 0px",
          color: "#333",
          border: isSelected ? "1px solid #05f" : "1px solid #ddd",
          padding: 8,
          display: "inline-block",
          position:"relative",
          height: "auto",
          borderRadius: 5,
          background: isSelected ? "#0055ff20" : "#fff",
          width: 150,
        }}>
          <div>{formatTimestamp(s.starttime)}</div>
          <div>{s.teacher.name}</div>
        </Frame>)
      })
    }

    return (
        <Frame
            {...props}
            overflow="visible"
            width="100%"
            style={{
                fontSize: 14,
                fontFamily: "TT Norms",
                color: "#333",
                background: "#fff",
            }}
        >
          <img src={data.venue.images} style={{
            height: 250,
            width: 375,
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}/>

          <Frame
            onTap={e=>props.onClose()}
            top={20} left={20} style={{padding: "8px 16px", fontWeight: 500, height: "auto", width: "auto", background: "#000000aa", color: "#fff", borderRadius: 100}}>
            Close</Frame>


          <div style={{
            fontSize: 16,
            fontWeight: 500,
            margin: "16px 16px 0 16px",
            color: "#555",
          }}>
            {data.venue.venue_name}
          </div>
          {data.class ? (
            <div style={{
              fontSize: 26,
              fontWeight: 700,
              margin: "0 16px 4px 16px",
              color: "#333",
            }}>
            {data.class.name}
          </div>
          ) : undefined}


          {false && data.schedule  ?
          (<div style={{
            fontSize: 16,
            fontWeight: 300,
            margin: 16,
            color: "#333",
          }}>
            <div>{formatTimestamp(data.schedule.starttime)}</div>
            <div>{data.schedule.teacher.name}</div>
          </div>) : undefined
          }

          <Scroll direction="horizontal" width="100%" style={{position: "relative", height:80}}>
            <Frame style={{background: "#fff",position: "relative", height: "auto", paddingLeft: 16}} width={scheduleList.length * 170}>
          {scheduleList}
            </Frame>
          </Scroll>

          {data.class ? (
            <div style={{
              fontSize: 16,
              margin: 16,
              color: "#333",
            }}>
            <div style={{marginTop: 16,fontSize: 12,
                color: "#7c7c7c",
                textTransform: "uppercase",
                fontWeight: 700}}>About the class</div>
            <div
              style={{
                  fontSize: 16,
                  marginTop: 4,
                  color: "#333",
                  "-webkit-line-clamp": "5",
                  "-webkit-box-orient": "vertical",
                  display: "-webkit-box",
                  overflow: "hidden",
              }}>
            {data.class.description}
            </div>
          </div>
          ) : undefined}

          {data.schedule ? (
          <Frame bottom="0" left="0" right="0" height={48+32} style={{background:"#fff", boxShadow: "0 0 4px #ccc", display:"flex"}}>
            <Frame onTap={e=>props.onClose()} height={48} left={20} top={16} right={20}
                style={{borderRadius: 5, fontSize: 16,  fontWeight: 500, background: "#05f", color: "#fff"}}>Confirm reservation</Frame>
          </Frame>
        ) : undefined }
        </Frame>
    )
}
