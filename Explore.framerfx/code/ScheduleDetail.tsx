import * as React from "react"
import ReactDOM from 'react-dom'
import {RenderTarget, Frame, Scroll, useMotionValue} from "framer"

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
    const [userOverrideId, setUserOverrideId] = React.useState()
    const scrollX = useMotionValue(0);
    const dateFilter = props.dateFilter;
    const startTimeHour = new Date()
    const data = props.data;
    if (!data) {
      return <Frame></Frame>
    }

    let scheduleList = [];
    let initialIndex = -1
    if (data.schedules) {
      scheduleList = data.schedules.map((s, index) => {
        let isSelected = data.schedule && s.id == data.schedule.id;
        if (data.schedules.find(n=>n.id==userOverrideId)) {
          isSelected = s.id == userOverrideId;
        } else if (isSelected){
          initialIndex = index;
        }
        let frame = (<Frame
          onTap={e=> {
            setUserOverrideId(s.id)
          }}
          style={{
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
          background: isSelected ? "#0055ff10" : "#fff",
          width: 190,
        }}>
          <div style={{
            mixBlendMode: "multiply",
            fontWeight: 500
          }}>{formatTimestamp(s.starttime)}</div>
          <div style={{
            fontSize: 14
          }}>{s.teacher.name}</div>
          <div style={{
            fontSize: 14
          }}>{s.availability.credits} credits</div>
        </Frame>)
        return frame;
      })
    }
    if (initialIndex !== -1)
      scrollX.set(Math.max(
        ((-198*data.schedules.length-1)+200),
        -198 * initialIndex))

    function close() {
      setUserOverrideId(undefined);
      props.onClose();
    }

    let schedules = data.venue.classes.reduce((a,c) => a.concat(c.schedules), [])

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
          }}/>
          <Frame top={250-8} left={0} right={0} background="white" style={{
            borderRadius:8,
            height: 16,
          }}></Frame>

          <Frame
            onTap={e=>close()}
            top={20} left={20} style={{padding: "8px 16px", fontWeight: 500, height: "auto", width: "auto", background: "#000000aa", color: "#fff", borderRadius: 100}}>
            Close</Frame>




          {data.class ? (
            <div>
            <div style={{
              fontSize: 16,
              fontWeight: 500,
              margin: "16px 16px 0 16px",
              color: "#555",
            }}>
              {data.venue.venue_name}
            </div>
            <div style={{
              fontSize: 26,
              fontWeight: 700,
              margin: "0 16px 4px 16px",
              color: "#333",
            }}>
            {data.class.name}
          </div>
          </div>
        ) : (
          <div style={{
            fontSize: 26,
            fontWeight: 700,
            margin: "16px 16px 4px 16px",
            color: "#333",
          }}>
          {data.venue.venue_name}
        </div>
        )}


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

          {data.class ? (
            <div>
            <Scroll contentOffsetX={scrollX} className="jesusLeaveMeAlone" direction="horizontal" width="100%" style={{position: "relative", height:95}}>
              <Frame  style={{background: "#fff",xposition: "relative", height: "auto", paddingLeft: 16 }} width={scheduleList.length * 210}>
            {scheduleList}
              </Frame>
            </Scroll>
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
                  lineHeight: 1.3,
                  marginTop: 8,
                  color: "#333",
                  "-webkit-line-clamp": "4",
                  "-webkit-box-orient": "vertical",
                  display: "-webkit-box",
                  overflow: "hidden",
              }}>
            {data.class.description}
            </div>
          </div>
          </div>
        ) : (
          <div>
            <div style={{
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 16,
              lineHeight: 1.4,
              marginTop: 8,
              marginBottom: 8,
              color: "#333",
              "-webkit-line-clamp": "4",
              "-webkit-box-orient": "vertical",
              display: "-webkit-box",
              overflow: "hidden",
            }}>{data.venue.description}</div>
            <div style={{
              fontSize: 16,
              fontWeight: 500,
              padding: "4px 16px 16px 16px",
              color: "#05f",
              marginBottom: 16,
              borderBottom: "1px solid #eee",
            }}>Show location & more info</div>
            <div style={{
                paddingLeft: 16,
                marginTop: 32,
                fontSize: 12,
                color: "#7c7c7c",
                textTransform: "uppercase",
                fontWeight: 700}}>Schedule</div>
            <div style={{
              background: "#fff"
            }}>{
              schedules
                .slice().sort((a, b) => {
                  return a.starttime - b.starttime
                })
                .map(s => {
                  return (
                    <div style={{
                      fontSize: 16,
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "1px solid #eee",
                      padding: "12px 16px",
                    }}>
                      <div style={{width: 80}}>{formatTimestamp(s.starttime)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{fontWeight: 500}}>{s.class.name}</div>
                        <div style={{color: "#7f7f7f"}}>{s.teacher.name}</div>
                      </div>
                      <div style={{width: 60}}>{s.availability.credits} credits</div>
                    </div>
                  )
                })
            }</div>
          </div>




        )}

          {data.schedule ? (
          <Frame bottom="0" left="0" right="0" height={48+32} style={{background:"#fff", boxShadow: "0 0 4px #ccc", display:"flex"}}>
            <Frame onTap={e=>close()} height={48} left={20} top={16} right={20}
                style={{borderRadius: 5, fontSize: 16,  fontWeight: 500, background: "#05f", color: "#fff"}}>Confirm reservation</Frame>
          </Frame>
        ) : undefined }
        </Frame>
    )
}
