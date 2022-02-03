import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
// import "../../../css/forms/form.css"

const ModalChangeTypeDiary = ({bookId, setBooksDiaryReaderThunk, typeDiary}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log(bookId, formData.newTypeDiary);
        setBooksDiaryReaderThunk(bookId, formData.newTypeDiary, typeDiary);
    };

    // useEffect(() => {
    //     props.getBooksDiaryReaderThunk(typeDiary);
    // }, [typeDiary])

    return (
        <div className="modal-body">
            <div className="registration-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-icon">
                        <span><i className="bi bi-calendar2-event"></i></span>
                    </div>

                    <label className="rad-label">
                        <input type="radio" className="rad-input" value={"past"} {...register("newTypeDiary")} />
                        <div className="rad-design"></div>
                        <div className="rad-text">Прочитанные книги</div>
                    </label>

                    <label className="rad-label">
                        <input type="radio" className="rad-input" value={"unfinished"} {...register("newTypeDiary")} />
                        <div className="rad-design"></div>
                        <div className="rad-text">Недочитанные книги</div>
                    </label>

                    <label className="rad-label">
                        <input type="radio" className="rad-input" value={"want"} {...register("newTypeDiary")} />
                        <div className="rad-design"></div>
                        <div className="rad-text">Книги "хочу прочитать"</div>
                    </label>

                    <label className="rad-label">
                        <input type="radio" className="rad-input" value={"now"} {...register("newTypeDiary")} />
                        <div className="rad-design"></div>
                        <div className="rad-text">Книги "читаю сейчас"</div>
                    </label>

                    <div className="form-group d-grid gap-2">
                        <button className="btn create-account" type="submit" data-bs-dismiss="modal">Добавить событие</button>
                    </div>
                </form>
                {/* <div class="social-media">
                    <h5>Sign up with social media</h5>
                    <div class="social-icons">
                        <a href="#"><i class="icon-social-facebook" title="Facebook"></i></a>
                        <a href="#"><i class="icon-social-google" title="Google"></i></a>
                        <a href="#"><i class="icon-social-twitter" title="Twitter"></i></a>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ModalChangeTypeDiary;