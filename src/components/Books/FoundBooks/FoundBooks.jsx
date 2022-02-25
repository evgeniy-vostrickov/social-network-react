import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import baseURL from "../../../common/baseUrl/serverUrl";
import Pagination from '../../../common/Pagination/Pagination';
import { setBookIdNull, setSortedNull, setCheckNull, getAllBooksThunk, foundBooksThunk, sortBooksThunk } from '../../../redux/book-reducer';
import { compose } from 'redux';

const FoundBooks = (props) => {
    const query = new URLSearchParams(props.location.search);
    // const query = props.query;
    const page = query.get('page') || '1'; //!!! Не работает кнопка назад, при поиске
    const [fieldFind, setFieldFind] = useState();
    const [search, setSearch] = useState();

    let { typeBook } = useParams(); //для определения к какому типу учебной литературы относятся книги

    useEffect(() => {
        //Обнуляем bookId чтобы понять когда новые данные будут загружены.
        props.setBookIdNull();
        //Обнуляем переменную отвечающую за проверку нахождения книги в дневнике читателя.
        props.setCheckNull();
    }, [])

    useEffect(() => {
        //Обнуляем переменную сортировки и поиска
        console.log("window.location")
        props.setSortedNull();
        document.querySelector("input[name='search']").value = "";
        props.getAllBooksThunk(page, props.pageSize, "false", props.fieldSort, typeBook);
    }, [window.location.pathname])

    useEffect(() => {
        if (document.querySelector("input[name='search']").value || document.querySelector("input[name='search2']").value) {
            props.foundBooksThunk(page, props.pageSize, props.isSorted, props.fieldSort, fieldFind || 'book_name', search || document.querySelector("input[name='search2']").value, typeBook)
        }
        else
            props.getAllBooksThunk(page, props.pageSize, props.isSorted, props.fieldSort, typeBook);
    }, [page])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fieldFind: 'book_name'
        }
    });

    const funcSorting = (event) => {
        let fieldSort = "";
        switch (event.target.id) {
            case "popularity":
                fieldSort = "count_rating";
                break;
            case "novelty":
                fieldSort = "year_publication";
                break;
            case "rating":
                fieldSort = "rating";
                break;
            case "cancel":
                fieldSort = false;
                break;
        }
        if (document.querySelector("input[name='search']").value)
            props.sortBooksThunk(page, props.pageSize, fieldSort, fieldFind, search, typeBook);
        else
            props.sortBooksThunk(page, props.pageSize, fieldSort, "", "", typeBook);
    }

    const onSubmit = (formData) => {
        console.log(formData);
        setFieldFind(formData.fieldFind);
        setSearch(formData.search);
        // query.set('page', 1)
        // query.set('search', formData.search)
        // console.log(query.toString());
        props.foundBooksThunk(page, props.pageSize, props.isSorted, props.fieldSort, formData.fieldFind, formData.search, typeBook)
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
                        <div className="btn-group w35r">
                            <select className="form-select fs1-8r" aria-label="Default select example" {...register("fieldFind")}>
                                <option value="book_name">Поиск по названию</option>
                                <option value="author">Поиск по автору</option>
                                <option value="book_description">Поиск по описанию</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Сортировка
                        </button>
                        <ul className="dropdown-menu" onClick={funcSorting}>
                            <li><span id="popularity" className="dropdown-item">По популярности</span></li>
                            <li><span id="novelty" className="dropdown-item">По новизне</span></li>
                            <li><span id="rating" className="dropdown-item">По рейтингу</span></li>
                            <li><span id="cancel" className="dropdown-item">Не сортировать</span></li>
                        </ul>
                        <button className="btn btn-outline-primary" type="submit">Найти</button>
                    </form>
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
                {props.totalBooksCount > parseInt(props.pageSize) && <Pagination totalCount={props.totalBooksCount} pageSize={props.pageSize} portionSize={props.portionSize} link={window.location.pathname} />}
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    booksItems: state.bookPages.booksItems,
    pageSize: state.bookPages.pageSize,
    totalBooksCount: state.bookPages.totalBooksCount,
    portionSize: state.bookPages.portionSize,
    isSorted: state.bookPages.isSorted,
    fieldSort: state.bookPages.fieldSort,
})

export default compose(connect(mapStateToProps, { setBookIdNull, setSortedNull, setCheckNull, getAllBooksThunk, foundBooksThunk, sortBooksThunk }), withRouter)(FoundBooks);