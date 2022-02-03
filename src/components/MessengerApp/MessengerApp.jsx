import React, { useEffect } from 'react';
import Messenger from './Messenger';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router'
import socket from '../../common/socket/socket';
import { addNewMessageAction, numLastMessageAction, setUserAction, addNewDialogThunk, getAllDialogsThunk, addNewMessageThunk, getAllMessagesThunk } from '../../redux/messenger-reducer';


const MessengerApp = (props) => {
    const fetchDialogs = (textMessage) => {
        console.log(textMessage);
        props.getAllDialogsThunk();
    }
    const onNewMessage = (textMessage) => {
        console.log(textMessage);
    }
    // useEffect(() => {
    //     fetchDialogs("Пробный запуск при открытии страницы с диалогами");
    //     socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
    //     socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
    //     return () => {
    //         socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
    //         socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
    //     };
    // }, [])

    // useEffect(() => {
    //     const dialogId = props.match.params.dialogId;
    //     props.getAllMessagesThunk(dialogId);
    //     socket.on('SERVER:NEW_MESSAGE', onNewMessage);
    //     socket.emit('DIALOGS:JOIN', dialogId);
    //     return () => {
    //         socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
    //     };
    // }, [props.match.params.dialogId])

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Создание нового диалога и отправка первого сообщения
    // const onSubmit = (formData) => {
    //     props.addNewDialogThunk(formData.user_id, formData.textMessage);
    // };

    // Отправка нового сообщение в текущий диалог
    const onSubmit = (formData) => {
        props.addNewMessageThunk(props.match.params.dialogId, props.numLastMessage, props.userId, formData.textMessage);
    };

    const connection = () => {
        console.log("Подключение")
    }

    // return (
    //     <div>
    //         <h2>Messenger</h2>
    //         <button onClick={connection}>Подключиться</button>
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <div>
    //                 {/* <input className="form-control" placeholder="Введите сообщение" {...register("user_id",
    //                     {
    //                         required: 'Поле обязательно для заполнения',
    //                         maxLength: {
    //                             value: 300,
    //                             message: 'Число символов должно быть меньше 300'
    //                         }
    //                     })}
    //                 />
    //                 <div>
    //                     {errors?.user_id && <p>{errors?.user_id?.message || "Error"}</p>}
    //                 </div> */}
    //                 <input className="form-control" placeholder="Введите сообщение" {...register("textMessage",
    //                     {
    //                         required: 'Поле обязательно для заполнения',
    //                         maxLength: {
    //                             value: 300,
    //                             message: 'Число символов должно быть меньше 300'
    //                         }
    //                     })}
    //                 />
    //                 <div>
    //                     {errors?.textMessage && <p>{errors?.textMessage?.message || "Error"}</p>}
    //                 </div>
    //             </div>
    //             <input type="submit" value="Отправить" className="btn btn-primary" />
    //         </form>
    //     </div>
    // )

    return (
        <div className="message-content">
            <Messenger dialogId={props.match.params.dialogId} firstDialogId={props.firstDialogId} myUserId={props.myUserId} numLastMessage={props.numLastMessage} userIdRecipient={props.userIdRecipient} messageItems={props.messageItems} dialogsItems={props.dialogsItems} addNewMessageAction={props.addNewMessageAction} numLastMessageAction={props.numLastMessageAction} setUserAction={props.setUserAction} addNewMessageThunk={props.addNewMessageThunk} getAllDialogsThunk={props.getAllDialogsThunk} getAllMessagesThunk={props.getAllMessagesThunk} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    myUserId: state.auth.user_id,
    numLastMessage: state.messengerPage.numLastMessage,
    firstDialogId: state.messengerPage.firstDialogId,
    messageItems: state.messengerPage.messageItems,
    dialogsItems: state.messengerPage.dialogsItems,
    userIdRecipient: state.messengerPage.userIdRecipient
})

export default compose(connect(mapStateToProps, { addNewMessageAction, numLastMessageAction, setUserAction, addNewDialogThunk, getAllDialogsThunk, addNewMessageThunk, getAllMessagesThunk }), withRouter)(MessengerApp);