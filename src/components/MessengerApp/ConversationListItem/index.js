import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import shave from 'shave';
import baseURL from "../../../common/baseUrl/serverUrl"
import userPhotoDefault from '../../../assets/images/user.jpg'

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('conversation-snippet', 20);
  })

  const text = "Hello"
  const { user_id, dialog_id, name, surname, status, avatar } = props.dialog;

  return (
    <NavLink to={"/profile/dialog/" + dialog_id} onClick={() => {props.setUserAction(user_id); document.querySelectorAll(".toolbar-title")[1].textContent = `${name} ${surname}`}}>
      <div className="conversation-list-item">
        <img className="conversation-photo" src={avatar ? baseURL + avatar : userPhotoDefault} />
        <div className="conversation-info">
          <h1 className="conversation-title">{name} {surname}</h1>
          <p className="conversation-snippet">{status}</p>
        </div>
      </div>
    </NavLink>
  );
}