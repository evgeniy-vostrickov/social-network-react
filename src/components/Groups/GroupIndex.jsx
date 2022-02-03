import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getFullInfoGroupThunk, joinGroupThunk, leaveGroupThunk, addNewEventThunk, getAllEventThunk, savePhotoGroupThunk } from '../../redux/group-reducer';
import BasicInfoGroup from './BasicInfoGroup/BasicInfoGroup';
import Event from './EventsGroup/Event';
import GroupNavigation from './ImmutablePartPage/GroupNavigation';
import LeftSidebar from './ImmutablePartPage/LeftSidebar';

const GroupIndex = (props) => {
    let { groupId } = useParams();
    let userOwner = false;
    
    useEffect(() => {
        props.getFullInfoGroupThunk(groupId)
        props.getAllEventThunk(groupId)
    }, [])

    if (props.user_id === props.owner_id)
        userOwner = true;

    return (
        <section className="main-content full-group-content">
            <div className="container">
                <div className="row">
                    <LeftSidebar groupId={props.groupId} subscribe={props.subscribe} illustration_group={props.illustration_group} userOwner={userOwner} joinGroupThunk={props.joinGroupThunk} leaveGroupThunk={props.leaveGroupThunk} addNewEventThunk={props.addNewEventThunk} savePhotoGroupThunk={props.savePhotoGroupThunk} />
                    <div className="col-lg-8">
                        <GroupNavigation groupId={props.groupId} />
                        <BasicInfoGroup groupName={props.groupName} groupDescription={props.groupDescription} owner_name={props.owner_name} owner_surname={props.owner_surname} city={props.city} number_participants={props.number_participants} numEvents={props.eventsItems.length} />
                    </div>
                </div>
                <div className="events">
                    <h2 className="header">События</h2>
                    {
                        props.eventsItems.map(event => {
                            return <Event key={event.event_id} event={event} />
                        })
                    }
                </div>
            </div>
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
    owner_id: state.groupPages.owner_id
})

export default connect(mapStateToProps, { getFullInfoGroupThunk, joinGroupThunk, leaveGroupThunk, addNewEventThunk, getAllEventThunk, savePhotoGroupThunk })(GroupIndex);