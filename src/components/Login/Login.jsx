import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { loginUserThunk } from '../../redux/auth_reducer'

const Login = ({loginUserThunk, isAuth}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (formData) => {
        loginUserThunk(formData.email, formData.password);
    };
    
    return (
        <section className="main-content registration">
            <h2 className='mb-3'>Вход</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className="but-center"><input type="submit" value="Войти" className="btn btn-primary" /></div>
            </form>
        </section>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginUserThunk})(Login);