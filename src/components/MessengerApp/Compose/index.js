import React from 'react';
import { useForm } from "react-hook-form";
import { checkFilePhoto } from '../../../common/validate/checkImage'
import { Toast } from 'bootstrap'
import './Compose.css';

export let loadImageMessenger = (event) => { };

export default function Compose(props) {

  loadImageMessenger = (event) => {
    const checkFile = checkFilePhoto(event.target.files);
    if (checkFile.value) {
      console.log("Фото загружено!")
      console.log(event.target.files[0])
      const reader = new FileReader(); //для работы с загруженным изображением
      reader.onload = function () { //нет ошибок, чтение окончено
        // const imageBytes = new Uint8Array(reader.result); //представляет каждый байт в ArrayBuffer как отдельное число; возможные значения находятся в промежутке от 0 до 255 (в байте 8 бит, отсюда такой набор). Такое значение называется «8-битное целое без знака».
        // socket.emit('image', imageBytes); 
        const format = this.result.substring("data:image/".length, this.result.indexOf(";base64,"));
        const base64 = this.result.replace(/.*base64,/, ''); //удаляет все встречающиеся base64
        props.addNewMessageThunk(props.dialogId, props.numLastMessage, props.userIdRecipient, base64, format);
      };
      reader.readAsDataURL(event.target.files[0]); //(метод для чтения) считать данные как base64-кодированный URL
      // reader.readAsArrayBuffer(event.target.files[0]); //(метод для чтения) для бинарных файлов, для низкоуровневой побайтовой работы с бинарными данными
    }
    else {
      document.querySelector('.toast-body').textContent = checkFile.text;
      const bsToast = new Toast(document.getElementById('toastNotice'));
      bsToast.show();
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  //Отправка нового сообщение в текущий диалог
  const onSubmit = (formData) => {
    props.addNewMessageThunk(props.dialogId, props.numLastMessage, props.userIdRecipient, formData.textMessage);
    document.querySelector("input[name='textMessage']").value = ''
  };

  const ShowToast = (textError) => {
    document.querySelector('.toast-body').textContent = textError;
    const bsToast = new Toast(document.getElementById('toastNotice'));
    bsToast.show();
  }

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
        {errors?.search && ShowToast(errors?.textMessage?.message || "Ошибка!")}
        {/* <input type="submit" value="Отправить" className="btn btn-primary" /> */}
      </form>
      {
        props.rightItems
      }
    </div>
  );
}