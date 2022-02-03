import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getFullInfoUserThunk } from '../../../redux/users-reducer';
import ProfileContent from '../ProfileContainer';

const UserProfile = (props) => {

    let { userId } = useParams();

    useEffect(() => {
        props.getFullInfoUserThunk(userId);
    }, [userId])

    if (!props.userInfo)
        return <div>Loading...</div>

    return (
        <ProfileContent friends={props.friends} groups={props.groups} user_name={props.userInfo.user_name} surname={props.userInfo.surname} email={props.userInfo.email} date_births={props.userInfo.date_births} place_work_study={props.userInfo.place_work_study} direction_work_study={props.userInfo.direction_work_study} status={props.userInfo.status} avatar={props.userInfo.avatar} />
    )
}

const mapStateToProps = (state) => ({
    friends: state.userPages.friends,
    groups: state.userPages.groups,
    userInfo: state.userPages.userInfo,
})

export default connect(mapStateToProps, { getFullInfoUserThunk })(UserProfile);