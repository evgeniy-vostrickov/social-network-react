import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCommentsUserThunk } from '../../../redux/comments-reducer';
import Comment from '../../Books/Comments/Comment';

const MyComment = ({ comments, getAllCommentsUserThunk }) => {
    let { typeComment } = useParams();
    const headerPage = {
        reviews: "Рецензии к книгам",
        arguments: "Аргументы к книге",
        glossary: "Глоссарий на книгу",
        quotes: "Цитаты из книги",
        quoting: "Цитирование из книги"
    }

    useEffect(() => {
        getAllCommentsUserThunk(typeComment);
    }, [typeComment, comments.length])

    if (!comments.length)
        return (
            <section className="main-content profile-content h100vh">
                <div className="block-friends-and-group separate-page-friends-and-group">
                    <h2>{headerPage[typeComment]}({comments.length})</h2>
                    <h3>В данном разделе пока нет ни одного комментария</h3>
                </div>
            </section>
        )

    return (
        <section className={comments.length < 3 ? "main-content profile-content h100vh" : "main-content profile-content"}>
            <div className="block-reviews">
                <h2>{headerPage[typeComment]}({comments.length})</h2>
                {/* <a className="find-other-elements" href="#">Найти новых друзей</a> */}
                <div className="reviews">
                    {
                        comments.map((comment, index) => {
                            // index > 0 && comments[index].book_name != comments[index-1].book_name && <div>Книга: {comment.book_name} Автор: {comment.author} <Comment key={comment.comment_id} comment={comment} /></div>
                            // console.log(index > 0 && comments[index].book_name != comments[index-1].book_name && <div><hr />Книга: {comment.book_name} Автор: {comment.author}</div>)
                            return <div>Книга: {comment.book_name} Автор: {comment.author} <Comment key={comment.comment_id} comment={comment} /></div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
})

export default connect(mapStateToProps, {getAllCommentsUserThunk})(MyComment);