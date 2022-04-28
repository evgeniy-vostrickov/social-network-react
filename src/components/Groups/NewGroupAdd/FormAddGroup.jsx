import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { checkFilePhoto } from '../../../common/validate/checkImage';
import { setGroupIdNull, addNewGroupThunk } from '../../../redux/group-reducer';

const FormAddGroup = (props) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        //Обнуляем groupId чтобы понять когда новые данные будут загружены
        props.setGroupIdNull();
    }, [])

    const onSubmit = (formData) => {
        formData.illustration_group = formData.illustration_group[0];
        console.log(formData);
        props.addNewGroupThunk(formData);
    };

    if (props.groupId)
        return <Redirect to={`/groups/${props.groupId}`}/>

    return (
        <section className="main-content registration">
            <h2 className='mb-3'>Создание группы</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="group_name" className="form-label">Название группы</label>
                    <input id="group_name" className="form-control" placeholder="Введите название группы" {...register("group_name",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 50,
                                message: 'Число символов должно быть меньше 50'
                            }
                        })}
                    />
                </div>
                <div className='text-error'>
                    {errors?.group_name && <p>{errors?.group_name?.message || "Ошибка!"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="group_description" className="form-label">Описание группы</label>
                    <input id="group_description" className="form-control" placeholder="Введите описание к группе" {...register("group_description",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 250,
                                message: 'Число символов должно быть меньше 250'
                            }
                        })}
                    />
                </div>
                <div className='text-error'>
                    {errors?.group_description && <p>{errors?.group_description?.message || "Ошибка!"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Место расположения</label>
                    <input id="city" className="form-control" placeholder="Введите город расположения" {...register("city",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 250,
                                message: 'Число символов должно быть меньше 250'
                            }
                        })}
                    />
                </div>
                <div className='text-error'>
                    {errors?.city && <p>{errors?.city?.message || "Ошибка!"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="illustration_group" className="form-label">Иллюстрация к группе</label>
                    <input id="illustration_group" className="form-control" type="file" placeholder="Выберите иллюстрацию группы" {...register("illustration_group",
                        {
                            required: 'Поле обязательно для заполнения',
                            validate: {
                                checkFile: checkFilePhoto
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.illustration_group && <p>{errors?.illustration_group?.message || "Выберите другой файл"}</p>}
                </div>
                <div className="but-center"><input type="submit" value="Загрузить" className="btn btn-primary" /></div>
            </form>
        </section>
    )
}

const mapStateToProps = (state) => ({
    groupId: state.groupPages.groupId
})

export default compose(connect(mapStateToProps, { setGroupIdNull, addNewGroupThunk }), withRouter)(FormAddGroup);