import React from 'react'
// import userPhoto from '../../assets/images/icon.png'
import { NavLink } from 'react-router-dom'

const Group = ({ group }) => {
    return (
        <div className="col-lg-2 list-elements-item">
            <div className="item-img"><img src="img/group-6.jpg" /></div>
            <span className="item-name">{group.group_name}</span>
            <div className="item-work">Город: {group.city}</div>
        </div>
    )
}

export default Group;