import React from 'react'
import baseURL from "../../../common/baseUrl/serverUrl"
import groupPhotoDefault from '../../../assets/images/booknet.png'
import { NavLink } from 'react-router-dom'

const Group = ({ group }) => {
    return (
        <div className="col-lg-2 list-elements-item">
            <div className="item-img"><NavLink to={"/groups/" + group.group_id}><img src={group.illustration_group ? baseURL + group.illustration_group : groupPhotoDefault} /></NavLink></div>
            <span className="item-name">{group.group_name}</span>
            <div className="item-work">Город: {group.city}</div>
        </div>
    )
}

export default Group;