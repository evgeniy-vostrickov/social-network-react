import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../common/hoc/withAuthRedirect';
import { getFullInfoGroupThunk, joinGroupThunk, leaveGroupThunk, addNewEventThunk, getAllEventThunk, savePhotoGroupThunk } from '../../redux/group-reducer';
import { getUserIdNewDialog, followThunk, unfollowThunk } from '../../redux/users-reducer';
import { getFriendsThunk } from '../../redux/profile-reducer';
import { addNewDialogThunk } from '../../redux/messenger-reducer';
import BasicInfoGroup from './BasicInfoGroup/BasicInfoGroup';
import GroupNavigation from './ImmutablePartPage/GroupNavigation';
import LeftSidebar from './ImmutablePartPage/LeftSidebar';
import MyAlert from '../../common/Alert/MyAlert';
import ListEvents from './EventsGroup/ListEvents';
import Participants from './Participants/Participants';

const GroupIndex = (props) => {
    let { groupId } = useParams();
    let userOwner = false;

    useEffect(() => {
        props.getFullInfoGroupThunk(groupId);
        props.getAllEventThunk(groupId);
    }, [])

    if (props.user_id === props.owner_id)
        userOwner = true;

    if (!props.groupId)
        return <Preloader />

    return (

        <section className="main-content full-group-content">
            <div className="container">
                <div className="row">
                    <LeftSidebar groupId={props.groupId} subscribe={props.subscribe} illustration_group={props.illustration_group} userOwner={userOwner} joinGroupThunk={props.joinGroupThunk} leaveGroupThunk={props.leaveGroupThunk} addNewEventThunk={props.addNewEventThunk} savePhotoGroupThunk={props.savePhotoGroupThunk} />
                    <div className="col-lg-8">
                        <GroupNavigation groupId={props.groupId} />
                        <Switch>
                            <Route path="/groups/:groupId/events" render={() => <ListEvents eventsItems={props.eventsItems} dopParametr={{minWidth: true}} />} />
                            <Route path="/groups/:groupId/participants" render={() => <Participants participantsItems={props.participantsItems} masEmailFriend={props.masEmailFriend} userIdDialog={props.userIdDialog} getUserIdNewDialog={props.getUserIdNewDialog} getFriendsThunk={props.getFriendsThunk} followThunk={props.followThunk} unfollowThunk={props.unfollowThunk} addNewDialogThunk={props.addNewDialogThunk} />} />
                            <Route path="/groups/:groupId" render={() => <BasicInfoGroup groupName={props.groupName} groupDescription={props.groupDescription} owner_name={props.owner_name} owner_surname={props.owner_surname} city={props.city} number_participants={props.number_participants} numEvents={props.eventsItems.length} />} />
                        </Switch>
                    </div>
                </div>
                {window.location.pathname == `/groups/${groupId}` && <ListEvents eventsItems={props.eventsItems} dopParametr={{count: 3}} />}
            </div>
            <MyAlert />
        </section>
    )
}

const mapStateToProps = (state) => ({
    groupId: state.groupPages.groupId,
    groupName: state.groupPages.groupName,
    groupDescription: state.groupPages.groupDescription,
    owner_name: state.groupPages.owner_name,
    owner_surname: state.groupPages.owner_surname,
    city: state.groupPages.city,
    illustration_group: state.groupPages.illustration_group,
    number_participants: state.groupPages.number_participants,
    subscribe: state.groupPages.subscribe,
    eventsItems: state.groupPages.eventsItems,
    user_id: state.auth.user_id,
    owner_id: state.groupPages.owner_id,
    masEmailFriend: state.profilePage.masEmailFriend,
    participantsItems: state.groupPages.participantsItems,
    userIdDialog: state.userPages.userIdDialog,
})

export default compose(connect(mapStateToProps, { getFullInfoGroupThunk, getUserIdNewDialog, getFriendsThunk, followThunk, unfollowThunk, joinGroupThunk, leaveGroupThunk, addNewEventThunk, getAllEventThunk, savePhotoGroupThunk, addNewDialogThunk }), withAuthRedirect)(GroupIndex);