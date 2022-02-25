import React from 'react'
import { NavLink } from 'react-router-dom'

const GroupNavigation = ({ groupId }) => {
    const urlGroup = '/groups/' + groupId;
    return (
        <div className="nav-group">
            <NavLink to={urlGroup} className="btn btn-primary">Основное</NavLink>
            <NavLink to={urlGroup + '/events'} className="btn btn-primary"><i className="bi bi-chat-quote"></i> События</NavLink>
            <NavLink to={urlGroup + '/participants'} className="btn btn-primary"><i className="bi bi-type"></i> Участники</NavLink>
        </div>
    )
}

export default GroupNavigation;