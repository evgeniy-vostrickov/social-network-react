import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import baseURL from "../../../common/baseUrl/serverUrl";
import Pagination from '../../../common/Pagination/Pagination';
import { setGroupIdNull, getAllGroupsThunk, foundGroupsThunk } from '../../../redux/group-reducer';
import { compose } from 'redux';
import groupPhotoDefault from '../../../assets/images/booknet.png'

const FoundBooks = (props) => {
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page') || '1'; //!!! Не работает кнопка назад, при поиске
    const [search, setSearch] = useState();

    useEffect(() => {
        if (document.querySelector("input[name='search']").value) {
            props.foundGroupsThunk(page, props.pageSize, search)
        }
        else
            props.getAllGroupsThunk(page, props.pageSize);
    }, [page])

    useEffect(() => {
        props.setGroupIdNull();
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log(formData);
        setSearch(formData.search);
        props.foundGroupsThunk(page, props.pageSize, formData.search);
    };

    return (
        <section className="main-content groups-content">
            <div className="container">
                <div className="search-bar">
                    <form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                        <input id="group_name" className="form-control me-2" type="text" placeholder="Я хочу найти..." {...register("search",
                            {
                                required: 'Поле обязательно для заполнения',
                                maxLength: {
                                    value: 100,
                                    message: 'Число символов должно быть меньше 100'
                                }
                            })}
                        />
                        <i className="bi bi-search"></i>
                        <div>
                            {errors?.group_name && <p>{errors?.group_name?.message || "Error"}</p>}
                        </div>
                        <button className="btn btn-outline-primary" type="submit">Найти</button>
                    </form>
                </div>
                <div className="list-card">
                    {
                        props.groupsItems.map(group => {
                            return (
                                <div key={group.group_id} className="row element">
                                    <div className="col-lg-2 element-photo">
                                        <NavLink to={'/groups/' + group.group_id}><img src={group.illustration_group ? baseURL + group.illustration_group : groupPhotoDefault} /></NavLink>
                                    </div>
                                    <div className="col-lg-10 group-small-info">
                                        <NavLink to={'/groups/' + group.group_id}><h2>{group.group_name}</h2></NavLink>
                                        <div className="group-description">{group.group_description}</div>
                                        <div className="dop-group-info">Город: <span>{group.city}</span></div>
                                        <div className="button-block-info">
                                            <NavLink to={'/groups/' + group.group_id} role="button" className="btn btn-outline-primary more">Подробнее</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {props.totalGroupsCount > parseInt(props.pageSize) && <Pagination totalCount={props.totalGroupsCount} pageSize={props.pageSize} portionSize={props.portionSize} link={window.location.pathname} />}
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    groupsItems: state.groupPages.groupsItems,
    pageSize: state.groupPages.pageSize,
    totalGroupsCount: state.groupPages.totalGroupsCount,
    portionSize: state.groupPages.portionSize,
})

export default compose(connect(mapStateToProps, { setGroupIdNull, getAllGroupsThunk, foundGroupsThunk }), withRouter)(FoundBooks);