import React from 'react';
import Event from './Event';

const ListEvents = ({eventsItems, dopParametr}) => {
    if (dopParametr.count)
        eventsItems = eventsItems.slice(eventsItems.length - dopParametr.count, eventsItems.length);
    return (
        <div className="events">
        <h2 className="header">События</h2>
        {
            eventsItems.map(event => {
                return <Event key={event.event_id} event={event} dopParametr={dopParametr.minWidth} />
            })
        }
    </div>
    )
}

export default ListEvents;