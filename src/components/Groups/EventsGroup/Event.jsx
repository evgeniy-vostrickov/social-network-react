import React from 'react'
import moment from 'moment';
import baseURL from "../../../common/baseUrl/serverUrl";

const Event = ({ event }) => {
    return (
        <div className="event">
            <div className="event-header">

            </div>
            <div className="event-content">
                <div className="event-content-img"><img src={baseURL + event.illustration_event} /></div>
                <h4 className="event-content-name">{event.event_name}</h4>
                <div className="event-content-text">{event.event_text}</div>
            </div>
            {/* <button type="button" className="btn btn-primary"><i className="bi bi-hand-thumbs-up-fill"></i><span>10</span></button>
            <button type="button" className="btn btn-primary"><i className="bi bi-hand-thumbs-down-fill"></i><span>1</span></button> */}
            <div className="date-comment">{moment(event.date_publish).format('DD.MM.YYYY')}</div>
        </div>
    )
}

export default Event;