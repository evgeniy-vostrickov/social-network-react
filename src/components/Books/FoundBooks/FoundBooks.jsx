import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import baseURL from "../../../common/baseUrl/serverUrl";
import Pagination from '../../../common/Pagination/Pagination';
import { getAllBooksThunk, foundBooksThunk } from '../../../redux/book-reducer';
import { compose } from 'redux';

const FoundBooks = (props) => {
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page') || '1'; //!!! Не работает кнопка назад, при поиске
    // console.log(query.toString());
    const [fieldFind, setFieldFind] = useState();
    const [search, setSearch] = useState();

    useEffect(() => {
        if (document.querySelector("input[name='search']").value) {
            props.foundBooksThunk(page, props.pageSize, fieldFind, search)
        }
        else
            props.getAllBooksThunk(page, props.pageSize);
    }, [page])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fieldFind: 'book_name'
        }
    });

    const onSubmit = (formData) => {
        console.log(formData);
        setFieldFind(formData.fieldFind);
        setSearch(formData.search);
        // query.set('page', 1)
        // query.set('search', formData.search)
        // console.log(query.toString());
        props.foundBooksThunk(page, props.pageSize, formData.fieldFind, formData.search);
    };

    return (
        <section className="main-content books-content">
            <div className="container">
                <div className="search-bar">
                    <form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                        <input id="book_name" className="form-control me-2" type="text" placeholder="Я хочу найти..." {...register("search",
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
                            {errors?.book_name && <p>{errors?.book_name?.message || "Error"}</p>}
                        </div>
                        <div className="btn-group">
                            <select className="form-select" aria-label="Default select example" {...register("fieldFind")}>
                                <option value="book_name">Поиск по названию</option>
                                <option value="author">Поиск по автору</option>
                                <option value="book_description">Поиск по описанию</option>
                            </select>
                        </div>
                        <button className="btn btn-outline-primary" type="submit">Найти</button>
                    </form>
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="text" placeholder="Поиск книг" />
                        <i className="bi bi-search"></i>
                        <button className="btn btn-outline-primary" type="submit">Найти</button>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Сортировка
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">По популярности</a></li>
                                <li><a className="dropdown-item" href="#">По новизне</a></li>
                                <li><a className="dropdown-item" href="#">По рейтингу</a></li>
                            </ul>
                        </div>
                    </form> */}
                </div>
                <div className="list-card">
                    {
                        props.booksItems.map(book => {
                            return (
                                <div key={book.book_id} className="row element">
                                    <div className="col-lg-2 element-photo h-30r">
                                        <NavLink to={'/books/' + book.book_id}><img src={baseURL + book.illustration_cover} /></NavLink>
                                    </div>
                                    <div className="col-lg-10 book-small-info">
                                        <NavLink to={'/books/' + book.book_id}><h2>{book.book_name}</h2></NavLink>
                                        <div className="book-author">{book.author}</div>
                                        <div className="book-description">{book.book_description}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {props.totalBooksCount > parseInt(props.pageSize) && <Pagination totalCount={props.totalBooksCount} pageSize={props.pageSize} portionSize={props.portionSize} link={'books'} />}
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    booksItems: state.bookPages.booksItems,
    pageSize: state.bookPages.pageSize,
    totalBooksCount: state.bookPages.totalBooksCount,
    portionSize: state.bookPages.portionSize,
})

export default compose(connect(mapStateToProps, { getAllBooksThunk, foundBooksThunk }), withRouter)(FoundBooks);