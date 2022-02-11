import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { getUserIdNewDialog, getAllUsersThunk, foundUsersThunk, followThunk, unfollowThunk } from '../../../redux/users-reducer';
import { addNewDialogThunk } from '../../../redux/messenger-reducer';
import Pagination from '../../../common/Pagination/Pagination';
import User from './User';
import ModalWindowNewDialog from './ModalWindowNewDialog';

const FoundUsers = (props) => {
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page') || '1'; //!!! Не работает кнопка назад, при поиске
    const [search, setSearch] = useState();

    // useEffect(() => {
    //     props.setMasEmailFriendAction();
    // }, [props.friends])

    useEffect(() => {
        // props.setMasEmailFriendAction();
        if (document.querySelector("input[name='search']").value) {
            props.foundUsersThunk(page, props.pageSize, search)
        }
        else
            props.getAllUsersThunk(page, props.pageSize);
    }, [page])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log(formData);
        setSearch(formData.search);
        props.foundUsersThunk(page, props.pageSize, formData.search);
    };

    const follow = (userId) => {
        props.followThunk(userId, false);
    }

    const unfollow = (userId) => {
        props.unfollowThunk(userId);
    }

    return (
        <>
            <section className="main-content profile-content groups-content">
                <div className="container">
                    <div className="search-bar">
                        <form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                            <input id="user_name" className="form-control me-2" type="text" placeholder="Я хочу найти..." {...register("search",
                                {
                                    required: 'Поле обязательно для заполнения',
                                    maxLength: {
                                        value: 100,
                                        message: 'Число символов должно быть меньше 100'
                                    }
                                })}
                            />
                            <i className="bi bi-search"></i>
                            <div>
                                {errors?.user_name && <p>{errors?.user_name?.message || "Error"}</p>}
                            </div>
                            <button className="btn btn-outline-primary" type="submit">Найти</button>
                        </form>
                    </div>
                    <div className="list-card">
                        {
                            props.users.map(user => {
                                props.masEmailFriend.indexOf(user.email) === -1 ? user.follow = false : user.follow = true
                                // console.log(user)
                                return (
                                    <User key={user.user_id} user={user} follow={follow} unfollow={unfollow} getUserIdNewDialog={props.getUserIdNewDialog} />
                                )
                            })
                        }
                    </div>
                    {props.totalUsersCount > parseInt(props.pageSize) && <Pagination totalCount={props.totalUsersCount} pageSize={props.pageSize} portionSize={props.portionSize} link={window.location.pathname} />}
                </div>

                <ModalWindowNewDialog addNewDialogThunk={props.addNewDialogThunk} userIdDialog={props.userIdDialog} />
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({
    friends: state.profilePage.friends,
    masEmailFriend: state.profilePage.masEmailFriend,
    userIdDialog: state.userPages.userIdDialog,
    users: state.userPages.users,
    pageSize: state.userPages.pageSize,
    totalUsersCount: state.userPages.totalUsersCount,
    portionSize: state.userPages.portionSize,
})

export default compose(connect(mapStateToProps, { getUserIdNewDialog, getAllUsersThunk, foundUsersThunk, followThunk, unfollowThunk, addNewDialogThunk }), withRouter)(FoundUsers);