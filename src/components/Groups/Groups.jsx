import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getGroupsThunk } from '../../redux/profile-reducer';
import ProfileRetractableMenu from '../Profile/ProfileRetractableMenu';
import GroupsContent from './GroupsContent'

const Groups = (props) => {
    useEffect(() => {
        props.getGroupsThunk();
    }, [props.groups.length])
    
    return (
        <>
            <ProfileRetractableMenu />
            <GroupsContent groups={props.groups} />
        </>
    )
}

const mapStateToProps = (state) => ({
    groups: state.profilePage.groups
})

export default connect(mapStateToProps, {getGroupsThunk})(Groups);