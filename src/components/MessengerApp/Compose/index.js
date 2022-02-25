import React from 'react';
import { useForm } from "react-hook-form";
import './Compose.css';

export default function Compose(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  //Отправка нового сообщение в текущий диалог
  const onSubmit = (formData) => {
    props.addNewMessageThunk(props.dialogId, props.numLastMessage, props.userIdRecipient, formData.textMessage);
    document.querySelector("input[name='textMessage']").value = ''
  };

  return (
    <div className="compose block-input-line">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="compose-input input-line" placeholder="Введите сообщение" {...register("textMessage",
          {
            required: 'Поле обязательно для заполнения',
            maxLength: {
              value: 255,
              message: 'Число символов должно быть меньше 255'
            }
          })}
        />
        <div>
          {errors?.textMessage && <p>{errors?.textMessage?.message || "Error"}</p>}
        </div>
        {/* <input type="submit" value="Отправить" className="btn btn-primary" /> */}
      </form>
      {
        props.rightItems
      }
    </div>
  );
}