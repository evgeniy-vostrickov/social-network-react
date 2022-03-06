import React from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import './Message.css';
import baseURL from "../../../common/baseUrl/serverUrl";


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

  // const loadImageInMesseng = (nameImage) => {
  //   let img = new Image();
  //   img.onload = function () {
  //     console.log(this.width)
  //     console.log(this.height)
  //     console.log(this)
  //     // var width = this.width;
  //     // var hight = this.height;
  //     // document.querySelectorAll(".bubble:nth-last-of-type(1)").appendChild(this);
  //     let listElement = document.querySelectorAll("div.bubble");
  //     listElement[listElement.length-1].appendChild(this)
  //   }
  //   img.src = baseURL + nameImage;
  // }

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
          {friendlyTimestamp}
        </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {/uploads\/message-\d{8}-\d{6}_\d{3}./.test(data.text_message) ? <img width="250px" height="auto" src={baseURL + data.text_message} /> : data.text_message}
        </div>
      </div>
    </div>
  );
}