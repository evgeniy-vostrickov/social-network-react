import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import Friend from './Friends/Friend'
import Group from './Groups/Group'
import PersonalDataHook from './PersonalData/PersonalDataHook'
import { checkFilePhoto } from '../../common/validate/checkImage'
import userPhotoDefault from '../../assets/images/user.jpg'
import Croppie from 'croppie'
import BookDiary from './DiaryReader/BookDiary'
import MyAlert from '../../common/Alert/MyAlert'
import { Toast } from 'bootstrap'


const ProfileContent = (props) => {

    const [loadAvatar, setLoadAvatar] = useState(false);

    // let uploadCrop;
    let uploadCrop = useRef();

    const readFile = (event) => {
        const checkFile = checkFilePhoto(event.target.files);
        if (checkFile.value) {
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

            let reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector('.upload-avatar').classList.add("ready");
                uploadCrop.current.bind({ url: e.target.result })
                    .then(function () {
                        console.log('jQuery bind complete');
                    });
            }

            reader.readAsDataURL(input.files[0]);
            setLoadAvatar(true);
        }
        else {
            document.querySelector('.toast-body').textContent = checkFile.text;
            const bsToast = new Toast(document.getElementById('toastNotice'));
            bsToast.show();
        }
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

    const listFriendsLimit = props.friends.slice(0, 5);
    const listGroupsLimit = props.groups.slice(0, 5);

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
                    <h3>Дата рождения </h3><div className="date-birth">{window.location.pathname === "/profile" ? <PersonalDataHook field={"date_births"} currentPersonalData={props.date_births} setPersonalDataUserThunk={props.setPersonalDataUserThunk} /> : props.date_births}</div>
                    <h3>Место работы/учебы </h3>{window.location.pathname === "/profile" ? <PersonalDataHook field={"place_work_study"} currentPersonalData={props.place_work_study} setPersonalDataUserThunk={props.setPersonalDataUserThunk} /> : props.place_work_study}
                    <h3>Направление работы/учебы </h3>{window.location.pathname === "/profile" ? <PersonalDataHook field={"direction_work_study"} currentPersonalData={props.direction_work_study} setPersonalDataUserThunk={props.setPersonalDataUserThunk} /> : props.direction_work_study}
                    <h3>Email </h3>{window.location.pathname === "/profile" ? <PersonalDataHook field={"email"} currentPersonalData={props.email} setPersonalDataUserThunk={props.setPersonalDataUserThunk} /> : props.email}
                    <h3>Статус </h3>{window.location.pathname === "/profile" ? <PersonalDataHook field={"status"} currentPersonalData={props.status} setPersonalDataUserThunk={props.setPersonalDataUserThunk} /> : props.status}
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
                        listFriendsLimit.map((friend, index) => { friend.id = index; return <Friend key={index} friend={friend} /> })
                    }
                </div>
            </div>

            <div className="block-friends-and-group">
                <h2>Мои группы</h2>
                <a className="view-all-elements" href="#">Просмотр все группы</a>
                <div className="list-elements">
                    {
                        listGroupsLimit.map((group, index) => { return <Group key={index} group={group} /> })
                    }
                </div>
            </div>

            <div className="block-friends-and-group">
                <h2>Нравится</h2>
                <hr />
                <span className='header-like'>Любимые жанры</span>
                <div className="list-genres">
                    {
                        props.likeGenres.map((value, index) => { return <div key={index}>{value.genre_name} </div> })
                    }
                </div>
                <hr />
                <span className='header-like'>Любимые авторы</span>
                <div className="list-authors">
                    {
                        props.likeAuthors.map((value, index) => { return <div key={index}>{value.author} </div> })
                    }
                </div>
                <hr />
                <span className='header-like'>Последние прочитанные книги</span>
                <div className="list-elements">
                    {
                        props.likeBooks.map(book => {
                            return <BookDiary key={book.book_id} book={book} setBookId={null} />
                        })
                    }
                </div>
                <hr />
            </div>
            <MyAlert />
        </section>
    )
}

export default ProfileContent;