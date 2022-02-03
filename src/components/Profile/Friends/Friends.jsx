import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { followThunk, unfollowThunk } from '../../../redux/users-reducer';
import Friend from './Friend'

const Friends = ({user_id, friends, followThunk, unfollowThunk}) => {

    const follow = (userId) => {
        followThunk(userId, true);
    }

    const unfollow = (userId) => {
        unfollowThunk(userId);
    }

    return (
        <section className={friends.length < 11 ? "main-content profile-content h100vh" : "main-content profile-content"}>
            <div className="block-friends-and-group separate-page-friends-and-group">
                <h2>Мои друзья</h2>
                <NavLink to="/profile/users" className="find-other-elements">Найти новых друзей</NavLink>
                <div className="list-elements">
                    {
                        friends.map((friend, index) => {
                            if (friend.confirmation)
                                return <Friend key={index} friend={friend} unfollow={unfollow}/>
                            else
                                return false
                        })
                    }
                </div>

                <h2 className='mt-5'>Заявки в друзья</h2>
                <NavLink to="/profile/users" className="find-other-elements">Найти новых друзей</NavLink>
                <div className="list-elements">
                    {
                        friends.map(friend => {
                            if (!friend.confirmation & friend.second_user_id == user_id)
                                return <Friend key={friend.user_id} friend={friend} follow={follow} unfollow={unfollow} />
                            else
                                return false
                        })
                    }
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    user_id: state.auth.user_id,
    friends: state.profilePage.friends
})

export default connect(mapStateToProps, { followThunk, unfollowThunk })(Friends);