import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { setBookId, getBooksDiaryReaderThunk, setBooksDiaryReaderThunk } from '../../../redux/book-reducer';
import BookDiary from './BookDiary';
import ModalChangeTypeDiary from './ModalChangeTypeDiary';

const DiaryReader = (props) => {
    let { typeDiary } = useParams();
    const headerPage = {
        past: 'Прочитанные книги',
        unfinished: 'Недочитанные книги',
        want: 'Книги "хочу прочитать"',
        now: 'Книги "читаю сейчас"',
    }

    useEffect(() => {
        props.getBooksDiaryReaderThunk(typeDiary);
    }, [typeDiary, props.totalBooksCount])

    if (!props.totalBooksCount)
        return (
            <section className="main-content profile-content h100vh">
                <div className="block-friends-and-group separate-page-friends-and-group">
                    <h2>{headerPage[typeDiary]}({props.totalBooksCount})</h2>
                    <h3>В данном разделе пока нет ни одной <NavLink to="/books">книги</NavLink></h3>
                </div>
            </section>
        )

    return (
        <section className={props.totalBooksCount < 3 ? "main-content profile-content h100vh" : "main-content profile-content"}>
            <div className="block-friends-and-group separate-page-friends-and-group">
                <h2>{headerPage[typeDiary]}({props.totalBooksCount})</h2>
                {/* <a className="find-other-elements" href="#">Найти новых друзей</a> */}
                <div className="list-elements">
                    {
                        props.booksItems.map(book => {
                            return <BookDiary key={book.book_id} book={book} setBookId={props.setBookId} />
                        })
                    }
                </div>
            </div>
            {/* Модальное окно для изменения типа книги в дневнике читателя */}
            <div className="modal fade" id="windowChangeType" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="windowNewEventLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered w60r">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="windowChangeTypeLabel">Добавление события</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <ModalChangeTypeDiary bookId={props.bookId} setBooksDiaryReaderThunk={props.setBooksDiaryReaderThunk} typeDiary={typeDiary} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    bookId: state.bookPages.bookId,
    booksItems: state.bookPages.booksItems,
    totalBooksCount: state.bookPages.totalBooksCount,
})

export default connect(mapStateToProps, { setBookId, getBooksDiaryReaderThunk, setBooksDiaryReaderThunk })(DiaryReader);