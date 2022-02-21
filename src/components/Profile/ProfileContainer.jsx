import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import Friend from './Friends/Friend'
import Group from './Groups/Group'
import ProfileStatusHook from './Status/ProfileStatusHook'
import { checkFilePhoto } from '../../common/validate/checkImage'
import userPhotoDefault from '../../assets/images/user.jpg'
import moment from 'moment'
import Croppie from 'croppie'


const ProfileContent = (props) => {

    const [loadAvatar, setLoadAvatar] = useState(false);

    // let uploadCrop;
    let uploadCrop = useRef();

    const readFile = (event) => {
        document.querySelector('.photo-user').style.display = 'none';
        document.querySelector('.upload-avatar-user').style.display = 'block';
        const input = event.target;
        uploadCrop.current = new Croppie(document.querySelector('#upload-avatar'),
            {
                enableExif: true,
                viewport: {
                    width: 200,
                    height: 200,
                    type: 'square'
                },
                boundary: {
                    width: 300,
                    height: 300
                }
            });
        if (checkFilePhoto(event.target.files)) {
            let reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector('.upload-avatar').classList.add("ready");
                uploadCrop.current.bind({ url: e.target.result })
                    .then(function () {
                        console.log('jQuery bind complete');
                    });
            }

            reader.readAsDataURL(input.files[0]);
        }
        else {
            console.log("Sorry - you're browser doesn't support the FileReader API");
        }
        setLoadAvatar(true);
    }

    const result = () => {
        console.log(uploadCrop.current)
        uploadCrop.current.result({
            type: 'canvas',
            size: 'viewport'
        }).then(resp => {
            // document.querySelector('#avatar').setAttribute("src", resp);
            props.saveAvatarThunk(resp)
            setLoadAvatar(false);
            document.querySelector('.upload-avatar-user').style.display = 'none';
            document.querySelector('.photo-user').style.display = 'block';
        });
    }

    const savePhotoOnAvatar = (event) => {
        // checkFilePhoto(event.target.files) && props.saveAvatarThunk(event.target.files[0])
    }
    return (
        <section className="main-content profile-content">
            <div className="about-me">
                <div className="photo-user">
                    <img id="avatar" src={!props.avatar ? userPhotoDefault : props.avatar} />
                </div>
                <div className="upload-avatar-user">
                    <div id="upload-avatar"></div>
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

            <div className='upload-avatar'>
                {
                    !loadAvatar ?
                        <div className="load-photo">
                            {window.location.pathname === "/profile" && <label><span className="nav-link">Изменить изображение <input type="file" className="load-photo-input" id="upload" name="input-name" onChange={readFile} /></span></label>}
                        </div>
                        :
                        <button className="btn btn-outline-primary" onClick={result} type="submit">Сохранить</button>
                }
            </div>
            {/* <input type="file" /> */}

            <div className="block-friends-and-group">
                <h2>Мои друзья</h2>
                <a className="view-all-elements" href="#">Просмотр всех друзей</a>
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