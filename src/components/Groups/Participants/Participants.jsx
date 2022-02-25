import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import Preloader from '../../../common/Preloader/Preloader'
import ModalWindowNewDialog from '../../Profile/Users/ModalWindowNewDialog'
import User from '../../Profile/Users/User'

const Participants = ({ participantsItems, masEmailFriend, userIdDialog, getUserIdNewDialog, getFriendsThunk, followThunk, unfollowThunk, addNewDialogThunk }) => {
    useEffect(() => {
        getFriendsThunk();
    }, [])

    const follow = (userId) => {
        followThunk(userId, false);
    }

    const unfollow = (userId) => {
        unfollowThunk(userId);
    }

    if (!masEmailFriend)
        return <Preloader />
    
    return (
        <div className="list-card">
            {
                participantsItems.map(user => {
                    masEmailFriend.indexOf(user.email) === -1 ? user.follow = false : user.follow = true
                    return (
                        <User key={user.user_id} user={user} follow={follow} unfollow={unfollow} getUserIdNewDialog={getUserIdNewDialog} dopParametr={{height: "100"}} />
                    )
                })
            }
            <ModalWindowNewDialog addNewDialogThunk={addNewDialogThunk} userIdDialog={userIdDialog} />
        </div>
    )
}

export default Participants;