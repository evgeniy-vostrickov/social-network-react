import React from 'react'
// import userPhoto from '../../assets/images/icon.png'
import { NavLink } from 'react-router-dom'

const Friend = ({ friend, follow, unfollow }) => {
    return (
        <div className="col-lg-2 list-elements-item">
            <div className="item-img"><img src="img/friend-6.jpg" /></div>
            <span className="item-name">{friend.user_name} {friend.surname}</span>
            <div className="item-work">{friend.direction_work_study}</div>
            {friend.confirmation ?
                <button type="button" className="btn btn-danger" onClick={() => unfollow(friend.user_id)}><i className="bi bi-people"></i> Удалить из друзей</button>
                :
                <div>
                    <button type="button" className="btn btn-success" onClick={() => follow(friend.user_id)}><i className="bi bi-people"></i> Принять заявку</button>
                    <button type="button" className="btn btn-warning" onClick={() => unfollow(friend.user_id)}><i className="bi bi-people"></i> Отклонить заявку</button>
                </div>
            }

        </div>
    )
}

export default Friend;