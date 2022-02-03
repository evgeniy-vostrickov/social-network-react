import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Friend from './Friends/Friend'
import Group from './Groups/Group'
import ProfileStatusHook from './Status/ProfileStatusHook'
import { checkFilePhoto } from '../../common/validate/checkImage'
import userPhotoDefault from '../../assets/images/user.jpg'
import moment from 'moment'

const ProfileContent = (props) => {

    const savePhotoOnAvatar = (event) => {
        checkFilePhoto(event.target.files) && props.saveAvatarThunk(event.target.files[0])
    }
    return (
        <section className="main-content profile-content">
            <div className="about-me">
                <div className="photo-user">
                    <img src={!props.avatar ? userPhotoDefault : props.avatar} />
                </div>
                <div className="personal-data">
                    <h2>{props.user_name} {props.surname}</h2>
                    <h3>Дата рождения </h3><div className="date-birth">{props.date_births ? moment.utc(props.date_births).format('DD.MM.YYYY') : "---------"}</div>
                    <h3>Место работы/учебы </h3><div className="height">{props.place_work_study || "---------"}</div>
                    <h3>Направление работы/учебы </h3><div className="height">{props.direction_work_study || "---------"}</div>
                    <h3>Email </h3><div className="height">{props.email || "---------"}</div>
                    {/* <h3>Статус </h3><div className="status">{props.status}</div> */}
                    <h3>Статус </h3>{window.location.pathname === "/profile" ? <ProfileStatusHook currentStatus={props.status} setStatusUserThunk={props.setStatusUserThunk} /> : props.status}
                </div>
            </div>

            <div className="load-photo">
                { window.location.pathname === "/profile" && <label><span className="nav-link">Изменить изображение <input type="file" className="load-photo-input" name="input-name" onChange={savePhotoOnAvatar} /></span></label> }
            </div>
            {/* <input type="file" /> */}

            <div className="block-friends-and-group">
                <h2>Мои друзья</h2>
                <a className="view-all-elements" href="#">Просмотр всех друзей</a>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-1.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Программист</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-2.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Ученик</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-3.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Системный администратор</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-4.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Учитель</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-5.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Студент</div>
                    </div>
                </div>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-6.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Врач</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-7.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Студент</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-8.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Ученик</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-9.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Ученик</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-10.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Студент</div>
                    </div>
                </div>
                <div className="list-elements">
                    {
                        props.friends.map((friend, index) => { friend.id = index; return <Friend key={index} friend={friend} /> })
                    }
                </div>
            </div>

            <div className="block-friends-and-group">
                <h2>Мои группы</h2>
                <a className="view-all-elements" href="#">Просмотр все группы</a>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                </div>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                </div>
                <div className="list-elements">
                    {
                        props.groups.map((group, index) => { return <Group key={index} group={group} /> })
                    }
                </div>
            </div>

            <div className="block-likes">
                <h2>Нравится</h2>
                <h3>Любимые книги</h3>
                <div className="list-books"></div>
                <h3>Любимые авторы</h3>
                <div className="list-authors"></div>
                <h3>Любимые жанры</h3>
                <div className="list-authors"></div>
                {/* <div className="list-authors"></div> */}
            </div>
        </section>
    )
}

export default ProfileContent;