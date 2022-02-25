import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Preloader from '../../../common/Preloader/Preloader';
import { getFullInfoUserThunk } from '../../../redux/users-reducer';
import { getDataLikeThunk } from '../../../redux/profile-reducer';
import ProfileContent from '../ProfileContainer';

const UserProfile = (props) => {

    let { userId } = useParams();

    useEffect(() => {
        props.getDataLikeThunk(userId);
        props.getFullInfoUserThunk(userId);
    }, [userId])

    if (!props.userInfo)
        return <Preloader />

    return (
        <ProfileContent friends={props.friends} groups={props.groups} user_name={props.userInfo.user_name} surname={props.userInfo.surname} email={props.userInfo.email} date_births={props.userInfo.date_births} place_work_study={props.userInfo.place_work_study} direction_work_study={props.userInfo.direction_work_study} status={props.userInfo.status} avatar={props.userInfo.avatar} likeAuthors={props.likeAuthors} likeGenres={props.likeGenres} likeBooks={props.likeBooks} />
    )
}

const mapStateToProps = (state) => ({
    friends: state.userPages.friends,
    groups: state.userPages.groups,
    userInfo: state.userPages.userInfo,
    likeAuthors: state.profilePage.likeAuthors,
    likeGenres: state.profilePage.likeGenres,
    likeBooks: state.profilePage.likeBooks
})

export default connect(mapStateToProps, { getDataLikeThunk, getFullInfoUserThunk })(UserProfile);