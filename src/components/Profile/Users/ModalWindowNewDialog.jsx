import React from 'react'
import { useForm } from "react-hook-form";

const ModalWindowNewDialog = ({ userIdDialog, addNewDialogThunk }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        document.querySelector("textarea[name='textMessage']").value = '';
        addNewDialogThunk(userIdDialog, formData.textMessage);
    };
    return (
        <div className="modal fade" id="windowNewDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="windowNewEventLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered w60r">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="windowChangeTypeLabel">Новый диалог</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="registration-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <textarea id="textMessage" className="form-control item" rows="7" placeholder="Введите текст сообщение" {...register("textMessage",
                                    {
                                        required: 'Поле обязательно для заполнения',
                                        maxLength: {
                                            value: 1000,
                                            message: 'Число символов должно быть меньше 1000'
                                        }
                                    })}
                                ></textarea>
                                <div>
                                    {errors?.textMessage && <p>{errors?.textMessage?.message || "Error"}</p>}
                                </div>
                                <div className="form-group gap-2 text-center">
                                    <button className="btn create-account mt-0" type="submit" data-bs-dismiss="modal">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindowNewDialog;