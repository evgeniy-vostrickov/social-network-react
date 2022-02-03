import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupsThunk } from '../../../redux/profile-reducer';
import Group from './Group'

const Groups = (props) => {
    useEffect(() => {
        props.getGroupsThunk();
    }, [props.groups.length])

    return (
        <section className={props.groups.length < 11 ? "main-content profile-content h100vh" : "main-content profile-content"}>
            <div className="block-friends-and-group separate-page-friends-and-group">
                <h2>Мои группы</h2>
                <a className="find-other-elements" href="#">Найти новые группы</a>
                <div className="list-elements">
                    {
                        props.groups.map((group, index) => { return <Group key={index} group={group} /> })
                    }
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    groups: state.profilePage.groups
})

export default connect(mapStateToProps, { getGroupsThunk })(Groups);