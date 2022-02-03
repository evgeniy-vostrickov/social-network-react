import React from 'react'
import { NavLink } from 'react-router-dom'
import baseURL from "../../../common/baseUrl/serverUrl";
import ModalChangeTypeDiary from './ModalChangeTypeDiary';

const BookDiary = ({ book, setBookId }) => {
    return (
        <div className="col-lg-3 list-elements-item diary-reader">
            <div className="item-book-img">
                <NavLink to={"/books/" + book.book_id}><img src={baseURL + book.illustration_cover} /></NavLink>
            </div>
            <span className="item-name">{book.book_name}</span>
            <div className="item-work">{book.author}</div>
            <NavLink to="#"><div className="menu-btn card-diary" data-bs-toggle="modal" data-bs-target="#windowChangeType" onClick={() => setBookId(book.book_id)}><span></span></div></NavLink>
        </div>
    )
}

export default BookDiary;
//data-bs-toggle="modal" data-bs-target="#windowChangeType"