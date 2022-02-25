import React from 'react';
import { Redirect } from 'react-router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isLoadingAction, textErrorNull, registrationUserThunk } from '../../redux/auth_reducer'
import Preloader from '../../common/Preloader/Preloader';
import MyAlert from '../../common/Alert/MyAlert'
import { Toast } from 'bootstrap'

const Registration = ({isAuth, isLoading, textError, isLoadingAction, textErrorNull, registrationUserThunk}) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    
    const onSubmit = (formData) => {
        const repeatPassword = getValues("repeatPassword");
        const password = getValues("password");
        if (password === repeatPassword){
            isLoadingAction();
            registrationUserThunk(formData.name, formData.surname, formData.email, formData.password);
        }
        else {
            document.querySelector('.toast-body').textContent = "Введенные пароли не совпадают!";
            const bsToast = new Toast(document.getElementById('toastNotice'));
            bsToast.show();
        }
    };

    const show = (message) => {
        document.querySelector('.toast-body').textContent = message;
        const bsToast = new Toast(document.getElementById('toastNotice'));
        bsToast.show();
        textErrorNull(); //!возможны ошибки
    };

    if (isAuth)
        return <Redirect to={"/profile"} />

    if (isLoading == true)
        return <Preloader />

    textError && show(textError)
    
    return (
        <section className="main-content registration">
            <h2 className='mb-3'>Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Имя*</label>
                    <input id="name" className="form-control" placeholder="Введите имя" {...register("name",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 100,
                                message: 'Число символов должно быть меньше 100'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.name && <p>{errors?.name?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Фамилия</label>
                    <input id="surname" className="form-control" placeholder="Введите фамилию" {...register("surname",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 150,
                                message: 'Число символов должно быть меньше 150'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.surname && <p>{errors?.surname?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email*</label>
                    <input id="email" className="form-control" placeholder="Введите Email" {...register("email",
                        {
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                message: 'Email введен неверно'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.email && <p>{errors?.email?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль*</label>
                    <input id="password" className="form-control" placeholder="Введите пароль" {...register("password",
                        {
                            required: 'Поле обязательно для заполнения',
                            minLength: {
                                value: 6,
                                message: 'Число символов должно быть больше 6'
                            },
                            maxLength: {
                                value: 15,
                                message: 'Число символов должно быть меньше 16'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.password && <p>{errors?.password?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="repeat-password" className="form-label">Повторите пароль*</label>
                    <input id="repeat-password" className="form-control" placeholder="Повторите пароль" {...register("repeatPassword",
                        {
                            required: 'Поле обязательно для заполнения',
                            minLength: {
                                value: 6,
                                message: 'Число символов должно быть больше 6'
                            },
                            maxLength: {
                                value: 15,
                                message: 'Число символов должно быть меньше 16'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || "Error"}</p>}
                </div>
                <div className="but-center"><input type="submit" value="Зарегистрироваться" className="btn btn-primary" /></div>
                <div className="mt-3 text-center">
                    Если у вас уже есть аккаунт в социальной сети, то пройдите по ссылке на страницу <NavLink to="/login" className="bold">Авторизации</NavLink>
                </div>
            </form>
            <MyAlert />
        </section>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    textError: state.auth.textError,
})

export default connect(mapStateToProps, {isLoadingAction, textErrorNull, registrationUserThunk})(Registration);


// import React, { Component } from "react";
// import io from "socket.io-client";

// // Change to class component
// class Registration extends Component {
//   // Add constructor to initiate
//   constructor() {
//     super();
//     this.state = { msg: "" };
//   }

//   con = () => {const socket = io.connect("http://192.168.0.165:3500");}

//   // Function for getting text input
//   onTextChange = e => {
//     this.setState({ msg: e.target.value });
//   };

//   // Function for sending message to chat server
//   onMessageSubmit = () => {
//     // socket.emit("chat message", this.state.msg);
//     // this.setState({ msg: "" });
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.con}>Подключиться</button>
//         <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
//         <button onClick={this.onMessageSubmit}>Send</button>
//       </div>
//     );
//   }
// }

// export default Registration;