import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('conversation-snippet', 20);
  })

  const text = "Hello"
  const { dialog_id, name, surname, avatar } = props.dialog;

  return (
    <NavLink to={"/dialog/" + dialog_id}>
      <div className="conversation-list-item">
        <img className="conversation-photo" src={avatar} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{name} {surname}</h1>
          <p className="conversation-snippet">{text}</p>
        </div>
      </div>
    </NavLink>
  );
}