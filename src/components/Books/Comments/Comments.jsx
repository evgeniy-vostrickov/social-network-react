import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Comment from './Comment';
import userPhotoDefault from '../../../assets/images/user.jpg';
import AddComment from './AddComment';


const Comments = (props) => {
    let { comment } = useParams();
    const headerPage = {
        reviews: "Рецензии к книге",
        arguments: "Аргументы к книге",
        glossary: "Глоссарий на книгу",
        quotes: "Цитаты из книги",
        quoting: "Цитирование из книги"
    }

    useEffect(() => {
        props.getAllCommentsThunk(props.bookId, comment);
    }, [props.bookId, comment])

    return (
        <div className="block-reviews">
            <h2>{headerPage[comment]}({props.comments.length})</h2>
            <AddComment comment={comment} bookId={props.bookId} myAvatar={props.myAvatar} addNewCommentThunk={props.addNewCommentThunk} />
            <div className="reviews">
                {
                    props.comments.map(comment => {
                        return <Comment key={comment.comment_id} comment={comment} />
                    })
                }
            </div>
        </div>
    )
}

export default Comments;