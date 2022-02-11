import React from 'react'
import { NavLink } from 'react-router-dom'
import NewEvent from '../EventsGroup/NewEvent';
import { checkFilePhoto } from '../../../common/validate/checkImage'

const LeftSidebar = ({ groupId, subscribe, illustration_group, userOwner, joinGroupThunk, leaveGroupThunk, addNewEventThunk, savePhotoGroupThunk }) => {
    const savePhotoInGroup = (event) => {
        checkFilePhoto(event.target.files) && savePhotoGroupThunk(groupId, event.target.files[0])
    }

    return (
        <div className="col-lg-4">
            <div className="group-photo"><img src={illustration_group} alt="" /></div>
            <div className="actions">
                <div className="actions-dop-item">
                    {
                        subscribe ?
                            <button className="btn btn-outline-primary" onClick={() => leaveGroupThunk(groupId)} type="submit">Отписаться от группы</button> :
                            <button className="btn btn-outline-primary" onClick={() => joinGroupThunk(groupId)} type="submit">Вступить в группу</button>
                    }
                </div>
                {/* Только для владельца группы */}
                {console.log(userOwner)}
                {
                    userOwner &&
                    <>
                        {/* <div className="actions-item">
                            <a href="#">
                                <i className="bi bi-brush"></i>
                                <span>Изменить картинку</span>
                            </a>
                        </div> */}

                        <div className="load-photo actions-item">
                            <a href="#">
                                <i className="bi bi-brush"></i>
                                <label>
                                    <span className="nav-link">Изменить картинку <input type="file" className="load-photo-input" name="input-name" onChange={savePhotoInGroup} /></span>
                                </label>
                            </a>
                        </div>

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