import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../common/hoc/withAuthRedirect';
import { Route, Switch } from 'react-router-dom';
import { getFriendsThunk, getGroupsThunk, getDataLikeThunk } from '../../redux/profile-reducer';
import { logoutUser, authUserThunk, setPersonalDataUserThunk, saveAvatarThunk } from '../../redux/auth_reducer';
import ProfileContent from './ProfileContainer';
import ProfileRetractableMenu from './ProfileRetractableMenu';
import Friends from './Friends/Friends';
import Groups from './Groups/Groups';
import DiaryReader from './DiaryReader/DiaryReader';
import FoundUsers from './Users/FoundUsers';
import UserProfile from './Users/UserProfile';
import MessengerApp from '../MessengerApp/MessengerApp';
import MyComment from './Comments/MyComment';

const Profile = (props) => {
    // useEffect(() => {
    //     props.getFriendsThunk();
    // }, [props.friends.length])

    // useEffect(() => {
    //     props.getGroupsThunk();
    // }, [props.groups.length])

    useEffect(() => {
        props.getFriendsThunk();
        props.getGroupsThunk();
        props.getDataLikeThunk();
    }, [])

    return (
        <>
            <ProfileRetractableMenu logoutUser={props.logoutUser} />
            <Switch>
                <Route path="/profile/users/:userId" render={() => <UserProfile />} />
                <Route path="/profile/users" render={() => <FoundUsers />} />
                <Route path="/profile/friends" render={() => <Friends />} />
                <Route path="/profile/groups" render={() => <Groups />} />
                <Route path="/profile/dialog/:dialogId?" render={() => <MessengerApp />} />
                <Route path="/profile/diary/:typeDiary" render={() => <DiaryReader />} />
                <Route path="/profile/comments/:typeComment" render={() => <MyComment />} />
                <Route path="/profile" render={() => <ProfileContent friends={props.friends} groups={props.groups} user_name={props.user_name} surname={props.surname} email={props.email} date_births={props.date_births} place_work_study={props.place_work_study} direction_work_study={props.direction_work_study} status={props.status} avatar={props.avatar} likeAuthors={props.likeAuthors} likeGenres={props.likeGenres} likeBooks={props.likeBooks} setPersonalDataUserThunk={props.setPersonalDataUserThunk} saveAvatarThunk={props.saveAvatarThunk} />} />
            </Switch>
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
    avatar: state.auth.avatar,
    likeAuthors: state.profilePage.likeAuthors,
    likeGenres: state.profilePage.likeGenres,
    likeBooks: state.profilePage.likeBooks
})

export default compose(connect(mapStateToProps, { logoutUser, getFriendsThunk, getGroupsThunk, authUserThunk, setPersonalDataUserThunk, saveAvatarThunk, getDataLikeThunk }), withAuthRedirect)(Profile);
// withAuthRedirect - хок, который возвращает компоненты и добавляет проверку на то что залогинни пользователь или нет