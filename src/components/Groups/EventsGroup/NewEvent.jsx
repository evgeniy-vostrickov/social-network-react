import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { checkFilePhoto } from '../../../common/validate/checkImage';
// import '../../../css/forms/form.css'

const NewEvent = ({ groupId, addNewEventThunk }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        formData.illustration_event = formData.illustration_event[0];
        console.log(formData);
        addNewEventThunk(groupId, formData);
        document.querySelector("input[name='event_name']").value = '';
        document.querySelector("textarea[name='event_text']").value = '';
        document.querySelector("input[name='illustration_event']").value = '';
    };

    return (
        <div className="modal-body">
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="event_name" className="form-label">Название события</label>
                    <input id="event_name" className="form-control" placeholder="Введите название события" {...register("event_name",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 70,
                                message: 'Число символов должно быть меньше 70'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.event_name && <p>{errors?.event_name?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="event_text" className="form-label">Текст к событию</label>
                    <textarea id="event_text" className="form-control" placeholder="Введите текст к события" {...register("event_text",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 1000,
                                message: 'Число символов должно быть меньше 1000'
                            }
                        })}
                    ></textarea>
                </div>
                <div>
                    {errors?.event_text && <p>{errors?.event_text?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="illustration_event" className="form-label">Картинка для группы</label>
                    <input id="illustration_event" className="form-control" type="file" placeholder="Выберите картинку для группы" {...register("illustration_event",
                        {
                            required: 'Поле обязательно для заполнения',
                            validate: {
                                checkFile: checkFilePhoto
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.illustration_event && <p>{errors?.illustration_event?.message || "Выберите другой файл"}</p>}
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Добавить</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </form> */}

            <div className="registration-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-icon">
                        <span><i className="bi bi-calendar2-event"></i></span>
                    </div>
                    <div className="form-group">
                        <input id="event_name" className="form-control item" placeholder="Введите название события" {...register("event_name",
                            {
                                required: 'Поле обязательно для заполнения',
                                maxLength: {
                                    value: 70,
                                    message: 'Число символов должно быть меньше 70'
                                }
                            })}
                        />
                    </div>
                    <div>
                        {errors?.event_name && <p>{errors?.event_name?.message || "Error"}</p>}
                    </div>
                    <div className="form-group">
                        <textarea id="event_text" className="form-control item" rows="7" placeholder="Введите текст к события" {...register("event_text",
                            {
                                required: 'Поле обязательно для заполнения',
                                maxLength: {
                                    value: 1000,
                                    message: 'Число символов должно быть меньше 1000'
                                }
                            })}
                        ></textarea>
                    </div>
                    <div>
                        {errors?.event_text && <p>{errors?.event_text?.message || "Error"}</p>}
                    </div>
                    <div className="form-group">
                        <label>
                            <span className="nav-link">Картинка для события
                                <input id="illustration_event" className="form-control item load-photo-input" type="file" {...register("illustration_event",
                                    {
                                        required: 'Поле обязательно для заполнения',
                                        validate: {
                                            checkFile: checkFilePhoto
                                        }
                                    })}
                                />
                            </span>
                        </label>
                    </div>
                    <div>
                        {errors?.illustration_event && <p>{errors?.illustration_event?.message || "Выберите другой файл"}</p>}
                    </div>
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

const mapStateToProps = (state) => ({
    bookId: state.bookPages.bookId,
})

export default compose(connect(mapStateToProps, {}), withRouter)(NewEvent);