import React from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import './Message.css';



export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;
    moment.locale('ru');
    const friendlyTimestamp = moment(data.timestamp).format('LL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { data.text_message }
          </div>
        </div>
      </div>
    );
}