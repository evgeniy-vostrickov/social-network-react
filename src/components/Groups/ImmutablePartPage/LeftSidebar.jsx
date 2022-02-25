import React, { useState, useRef } from 'react'
import Croppie from 'croppie'
import { NavLink } from 'react-router-dom'
import NewEvent from '../EventsGroup/NewEvent';
import { checkFilePhoto } from '../../../common/validate/checkImage'
import groupPhotoDefault from '../../../assets/images/booknet.png'
import { Toast } from 'bootstrap'

const LeftSidebar = ({ groupId, subscribe, illustration_group, userOwner, joinGroupThunk, leaveGroupThunk, addNewEventThunk, savePhotoGroupThunk }) => {

    const [loadAvatar, setLoadAvatar] = useState(false);

    let uploadCrop = useRef();

    const readFile = (event) => {
        const checkFile = checkFilePhoto(event.target.files);
        if (checkFile.value) {
            document.querySelector('.toast-body').textContent = checkFile.text;
            const bsToast = new Toast(document.getElementById('toastNotice'));
            bsToast.show();

            document.querySelector('.group-photo').style.display = 'none';
            document.querySelector('.upload-avatar-group').style.display = 'block';
            const input = event.target;
            uploadCrop.current = new Croppie(document.querySelector('#upload-avatar'),
                {
                    enableExif: true,
                    viewport: {
                        width: 300,
                        height: 300,
                        type: 'square'
                    },
                    boundary: {
                        width: 400,
                        height: 400
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
        uploadCrop.current.result({
            type: 'canvas',
            size: 'viewport'
        }).then(resp => {
            // document.querySelector('#avatar').setAttribute("src", resp);
            savePhotoGroupThunk(groupId, resp)
            setLoadAvatar(false);
            document.querySelector('.upload-avatar-group').style.display = 'none';
            document.querySelector('.group-photo').style.display = 'block';
        });
    }

    return (
        <div className="col-lg-4">
            <div className="group-photo"><img src={illustration_group || groupPhotoDefault} /></div>
            <div className="upload-avatar-group">
                <div id="upload-avatar"></div>
            </div>
            <div className="actions">
                {/* Владельцы не могут выйти из группы */}
                <div className="actions-dop-item">
                    {
                        subscribe ?
                            !userOwner && <button className="btn btn-outline-primary" onClick={() => leaveGroupThunk(groupId)} type="submit">Отписаться от группы</button> :
                            !userOwner && <button className="btn btn-outline-primary" onClick={() => joinGroupThunk(groupId)} type="submit">Вступить в группу</button>
                    }
                </div>
                {/* Только для владельца группы */}
                {
                    userOwner &&
                    <>
                        <div className='upload-avatar'>
                            {
                                !loadAvatar ?
                                    <div className="load-photo actions-item">
                                        <a href="#">
                                            <i className="bi bi-brush"></i>
                                            <label>
                                                <span className="nav-link">Изменить картинку <input type="file" className="load-photo-input" name="input-name" onChange={readFile} /></span>
                                            </label>
                                        </a>
                                    </div>
                                    :
                                    <button className="btn btn-outline-primary" onClick={result} type="submit">Сохранить</button>
                            }
                        </div>

                        {/* <div className="load-photo actions-item">
                            <a href="#">
                                <i className="bi bi-brush"></i>
                                <label>
                                    <span className="nav-link">Изменить картинку <input type="file" className="load-photo-input" name="input-name" onChange={savePhotoInGroup} /></span>
                                </label>
                            </a>
                        </div> */}

                        <div className="actions-item">
                            <a href="#">
                                <i className="bi bi-brush"></i>
                                <span> Удалить группу</span>
                            </a>
                        </div>
                        <div className="actions-item">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#windowNewEvent">
                                <i className="bi bi-brush"></i>
                                <span> Добавить событие</span>
                            </a>
                        </div>
                    </>
                }
            </div>

            {/* Модальное окно добавления события */}
            <div className="modal fade" id="windowNewEvent" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="windowNewEventLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered w80r">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs2-2r" id="windowNewEventLabel">Добавление события</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <NewEvent groupId={groupId} addNewEventThunk={addNewEventThunk} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;