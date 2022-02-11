import React from 'react'
import { NavLink } from 'react-router-dom'

const BookNavigation = ({ bookId, type_book }) => {
    const urlBook = '/books/' + bookId;
    switch (type_book) {
        case "Для младших классов":
            return (
                <div className="nav-book">
                    <NavLink to={urlBook} className="btn btn-primary"><i className="bi bi-book-half"></i> Основное</NavLink>
                    <NavLink to={urlBook + '/reviews/add'} className="btn btn-primary"><i className="bi bi-file-earmark-text"></i> Рецензии</NavLink>
                    <NavLink to={urlBook + '/quotes/add'} className="btn btn-primary"><i className="bi bi-chat-quote"></i> Цитаты</NavLink>
                    <NavLink to={urlBook + '/glossary/add'} className="btn btn-primary"><i className="bi bi-brush"></i> Глоссарий</NavLink>
                </div>
            )

        case "Для старших классов":
            return (
                <div className="nav-book">
                    <NavLink to={urlBook} className="btn btn-primary"><i className="bi bi-book-half"></i> Основное</NavLink>
                    <NavLink to={urlBook + '/reviews/add'} className="btn btn-primary"><i className="bi bi-file-earmark-text"></i> Рецензии</NavLink>
                    <NavLink to={urlBook + '/quotes/add'} className="btn btn-primary"><i className="bi bi-chat-quote"></i> Цитаты</NavLink>
                    <NavLink to={urlBook + '/arguments/add'} className="btn btn-primary"><i className="bi bi-type"></i> Аргументы</NavLink>
                </div>
            )

        case "Для студентов":
            return (
                <div className="nav-book">
                    <NavLink to={urlBook} className="btn btn-primary"><i className="bi bi-book-half"></i> Основное</NavLink>
                    <NavLink to={urlBook + '/reviews/add'} className="btn btn-primary"><i className="bi bi-file-earmark-text"></i> Рецензии</NavLink>
                    <NavLink to={urlBook + '/quotes/add'} className="btn btn-primary"><i className="bi bi-chat-quote"></i> Цитаты</NavLink>
                    <NavLink to={urlBook + '/quoting/add'} className="btn btn-primary"><i className="bi bi-book-half"></i> Цитирование</NavLink>
                </div>
            )
        default:
            return (
                <div className="nav-book">
                    <NavLink to={urlBook} className="btn btn-primary"><i className="bi bi-book-half"></i> Основное</NavLink>
                    <NavLink to={urlBook + '/reviews/add'} className="btn btn-primary"><i className="bi bi-file-earmark-text"></i> Рецензии</NavLink>
                    <NavLink to={urlBook + '/quotes/add'} className="btn btn-primary"><i className="bi bi-chat-quote"></i> Цитаты</NavLink>
                </div>
            )
    }
}

export default BookNavigation;