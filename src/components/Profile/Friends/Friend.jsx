import React from 'react'
import baseURL from "../../../common/baseUrl/serverUrl"
import userPhotoDefault from '../../../assets/images/user.jpg'
import { NavLink } from 'react-router-dom'

const Friend = ({ friend, follow, unfollow }) => {
    return (
        <div className="col-lg-2 list-elements-item position-relative">
            <div className="item-img"><NavLink to={"/profile/users/" + friend.user_id}><img src={friend.avatar ? baseURL + friend.avatar : userPhotoDefault} /></NavLink></div>
            <span className="item-name">{friend.user_name} {friend.surname}</span>
            <div className="item-work">{friend.direction_work_study || "Не указано"}</div>
            
            <NavLink to="#" id={"dropdownMenuSetting" + friend.user_id} data-bs-toggle="dropdown" aria-expanded="false"><div className="menu-btn card-diary"><span></span></div></NavLink>
            {friend.confirmation ?
                <ul className="dropdown-menu inset fs1-8r" aria-labelledby={"dropdownMenuSetting" + friend.user_id}>
                    <li className='p-2' onClick={() => unfollow(friend.user_id)}><NavLink to="">Удалить из друзей</NavLink></li>
                </ul>
                :
                <ul className="dropdown-menu inset fs1-8r" aria-labelledby={"dropdownMenuSetting" + friend.user_id}>
                    <li className='p-2' onClick={() => follow(friend.user_id)}><NavLink to="">Принять заявку</NavLink></li>
                    <li className='p-2' onClick={() => unfollow(friend.user_id)}><NavLink to="">Отклонить заявку</NavLink></li>
                </ul>
            }
        </div>
    )
}

export default Friend;