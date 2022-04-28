import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import Preloader from '../../common/Preloader/Preloader';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { isLoadingAction, textErrorNull, loginUserThunk } from '../../redux/auth_reducer'
import { NavLink } from 'react-router-dom';
import MyAlert from '../../common/Alert/MyAlert'
import { Toast } from 'bootstrap'

const Login = ({ isAuth, isLoading, textError, isLoadingAction, textErrorNull, loginUserThunk }) => {
    // const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        textErrorNull();
    }, [textError])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        // setSubmitForm(true);
        isLoadingAction();
        loginUserThunk(formData.email, formData.password);
    };

    if (isAuth)
        return <Redirect to={"/profile"} />

    if (isLoading == true)
        return <Preloader />

    if (textError) {
        document.querySelector('.toast-body').textContent = textError;
        const bsToast = new Toast(document.getElementById('toastNotice'));
        bsToast.show();
    }

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
                <div className='text-error'>
                    {errors?.email && <p>{errors?.email?.message || "Ошибка!"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль*</label>
                    <input id="password" type="password" className="form-control" placeholder="Введите пароль" {...register("password",
                        {
                            required: 'Поле обязательно для заполнения',
                            minLength: {
                                value: 6,
                                message: 'Число символов в пароле должно быть больше 6'
                            },
                            maxLength: {
                                value: 15,
                                message: 'Число символов в пароле должно быть меньше 16'
                            }
                        })}
                    />
                </div>
                <div className='text-error'>
                    {errors?.password && <p>{errors?.password?.message || "Ошибка!"}</p>}
                </div>
                <div className="but-center"><input type="submit" value="Войти" className="btn btn-primary" /></div>
                <div className="mt-3 text-center">
                    Если у вас нет аккаунта в социальной сети, то пройдите по ссылке на страницу <NavLink to="/registration" className="bold">Регистрации</NavLink>
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

export default connect(mapStateToProps, { isLoadingAction, textErrorNull, loginUserThunk })(Login);