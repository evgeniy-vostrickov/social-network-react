import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getFriendsThunk } from '../../redux/profile-reducer';
import ProfileRetractableMenu from '../Profile/ProfileRetractableMenu';
import FriendsContent from './FriendsContent'

const Friends = (props) => {
    useEffect(() => {
        props.getFriendsThunk();
    }, [props.friends.length])
    
    return (
        <>
            <ProfileRetractableMenu />
            <FriendsContent friends={props.friends} />
        </>
    )
}

const mapStateToProps = (state) => ({
    friends: state.profilePage.friends
})

export default connect(mapStateToProps, {getFriendsThunk})(Friends);