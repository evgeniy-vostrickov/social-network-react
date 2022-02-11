import React from 'react'
import userPhotoDefault from '../../../assets/images/user.jpg';
import { useForm } from "react-hook-form";


const AddComment = ({ comment, bookId, myAvatar, addNewCommentThunk }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log(formData);
        addNewCommentThunk(bookId, comment, formData.comment);
        document.querySelector("textarea[name='comment']").value = '';
    };

    return (
        <div className="write-review">
            <div className="review-img"><img src={myAvatar || userPhotoDefault} /></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea rows="4" placeholder="Я думаю, что..." {...register("comment",
                    {
                        required: 'Вы ничего не написали!',
                        maxLength: {
                            value: 500,
                            message: 'Число символов должно быть меньше 500'
                        }
                    })}>
                </textarea>
                <div>
                    {errors?.review && <p>{errors?.review?.message || "Error"}</p>}
                </div>
                <div className="but-center"><input type="submit" value="Отправить" className="btn btn-primary" /></div>
            </form>
        </div>
    )
}

export default AddComment;