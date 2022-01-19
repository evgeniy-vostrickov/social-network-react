import React from 'react'
// import userPhoto from '../../assets/images/icon.png'
import { NavLink } from 'react-router-dom'

const Friend = ({ friend }) => {
    return (
        <div className="col-lg-2 list-elements-item">
            <div className="item-img"><img src="img/friend-6.jpg" /></div>
            <span className="item-name">{friend.user_name} {friend.surname}</span>
            <div className="item-work">{friend.direction_work_study}</div>
        </div>
    )
}

export default Friend;