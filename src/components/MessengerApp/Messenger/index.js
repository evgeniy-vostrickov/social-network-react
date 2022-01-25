import React, { useEffect } from 'react';
import socket from '../../../common/socket/socket';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

export default function Messenger(props) {

  const fetchDialogs = (textMessage) => {
    console.log(textMessage);
    props.getAllDialogsThunk();
  }

  useEffect(() => {
    fetchDialogs("Пробный запуск при открытии страницы с диалогами");
    socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
    socket.on('CLIENT:NEW_MESSAGE', fetchDialogs);
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
      socket.removeListener('CLIENT:NEW_MESSAGE', fetchDialogs);
    };
  }, [])

  //Получаем id первого диалога в списке
  // const firstDialogsItem = props.dialogsItems[0].dialog_id;
  // console.log(props.dialogsItems)

  return (
    <div className="messenger">
      {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

      {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

      <div className="scrollable sidebar">
        <ConversationList dialogsItems={props.dialogsItems} lastMessage={props.lastMessage} messageItems={props.messageItems} />
      </div>

      <div className="scrollable content">
        <MessageList dialogId={props.dialogId} myUserId={props.myUserId} messageItems={props.messageItems} firstDialogId={props.firstDialogId} numLastMessage={props.numLastMessage} addNewMessageAction={props.addNewMessageAction} numLastMessageAction={props.numLastMessageAction} getAllMessagesThunk={props.getAllMessagesThunk} addNewMessageThunk={props.addNewMessageThunk} />
      </div>
    </div>
  );
}