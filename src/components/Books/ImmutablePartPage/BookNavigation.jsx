import React from 'react'
import { NavLink } from 'react-router-dom'

const BookNavigation = ({ bookId }) => {
    const urlBook = '/books/' + bookId;
    return (
        <div className="nav-book">
            <NavLink to={urlBook} className="btn btn-primary"><i className="bi bi-book-half"></i> Основное</NavLink>
            <NavLink to={urlBook + '/reviews/add'} className="btn btn-primary"><i className="bi bi-file-earmark-text"></i> Рецензии</NavLink>
            <NavLink to={urlBook + '/quotes/add'} className="btn btn-primary"><i className="bi bi-chat-quote"></i> Цитаты</NavLink>
            <NavLink to={urlBook + '/arguments/add'} className="btn btn-primary"><i className="bi bi-type"></i> Аргументы</NavLink>
            <NavLink to={urlBook + '/glossary/add'} className="btn btn-primary"><i className="bi bi-brush"></i> Глоссарий</NavLink>
            <NavLink to={urlBook + '/quoting/add'} className="btn btn-primary"><i className="bi bi-book-half"></i> Цитирование</NavLink>
        </div>
    )
}

export default BookNavigation;