import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getFriendsThunk, getGroupsThunk } from '../../redux/profile-reducer';
import { authUserThunk, setStatusUserThunk, saveAvatarThunk } from '../../redux/auth_reducer';
import ProfileContent from './ProfileContainer';
import ProfileRetractableMenu from './ProfileRetractableMenu';

const Profile = (props) => {
    useEffect(() => {
        props.getFriendsThunk();
    }, [props.friends.length])
    
    useEffect(() => {
        props.getGroupsThunk();
    }, [props.groups.length])
    
    // useEffect(() => {
    //     props.authUserThunk();
    // }, [])
    
    return (
        <>
            <ProfileRetractableMenu />
            <ProfileContent friends={props.friends} groups={props.groups} user_name={props.user_name} surname={props.surname} email={props.email} date_births={props.date_births} place_work_study={props.place_work_study} direction_work_study={props.direction_work_study} status={props.status} avatar={props.avatar} setStatusUserThunk={props.setStatusUserThunk} saveAvatarThunk={props.saveAvatarThunk} />
        </>
    )
}

const mapStateToProps = (state) => ({
    friends: state.profilePage.friends,
    groups: state.profilePage.groups,
    user_name: state.auth.user_name,
    surname: state.auth.surname,
    email: state.auth.email,
    date_births: state.auth.date_births,
    place_work_study: state.auth.place_work_study,
    direction_work_study: state.auth.direction_work_study,
    status: state.auth.status,
    avatar: state.auth.avatar
})

export default connect(mapStateToProps, {getFriendsThunk, getGroupsThunk, authUserThunk, setStatusUserThunk, saveAvatarThunk})(Profile);