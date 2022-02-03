import React from 'react'
import baseURL from "../../../common/baseUrl/serverUrl";
import { NavLink } from 'react-router-dom'

const User = ({ user, follow, unfollow, getUserIdNewDialog }) => {
    return (
        <div key={user.user_id} className="row element">
            <div className="col-lg-2 element-photo">
                <NavLink to={'/profile/users/' + user.user_id}><img src={baseURL + user.avatar} className="br50" /></NavLink>
            </div>
            <div className="col-lg-10 group-small-info">
                <NavLink to={'/profile/users/' + user.user_id}><h2>{user.user_name} {user.surname}</h2></NavLink>
                <div className="group-description">Место работы/учебы: {user.place_work_study}</div>
                <div className="dop-group-info">
                    {!user.follow ?
                        <button type="button" className="btn btn-primary me-5" onClick={() => follow(user.user_id)}><i className="bi bi-people"></i> Добавить в друзья</button>
                        :
                        <button type="button" className="btn btn-primary me-5" onClick={() => unfollow(user.user_id)}><i className="bi bi-people"></i> Удалить из друзей</button>
                    }
                </div>
                <div className="button-block-info">
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#windowNewDialog" onClick={() => getUserIdNewDialog(user.user_id)}><i className="bi bi-messenger"></i> Начать диалог</button>
                </div>
            </div>
        </div>
    )
}

export default User;