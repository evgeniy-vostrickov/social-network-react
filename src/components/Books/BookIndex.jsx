import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { getFullInfoBookThunk, addBookInDiaryReaderThunk, setRatingThunk, getMyRatingThunk } from '../../redux/book-reducer';
import { getAllCommentsThunk, addNewCommentThunk } from '../../redux/comments-reducer';
import BasicInfoBook from './BasicInfoBook/BasicInfoBook';
import Comments from './Comments/Comments';
import BookNavigation from './ImmutablePartPage/BookNavigation';
import LeftSidebar from './ImmutablePartPage/LeftSidebar';

const BookIndex = (props) => {
    useEffect(() => {
        console.log(props.match.params)
        props.getFullInfoBookThunk(props.match.params.bookId)
    }, [])

    // !!!! Мерцаание, когда меняешь книги
    if (!props.bookId)
        return <div>Loading...</div>

    return (
        <section className="main-content full-book-content">
            <div className="container">
                <div className="row">
                    <LeftSidebar bookId={props.bookId} illustrationCover={props.illustrationCover} addBookInDiaryReaderThunk={props.addBookInDiaryReaderThunk} />
                    <div className="col-lg-8">
                        <BookNavigation bookId={props.bookId} />
                        <Switch>
                            <Route path="/books/:bookId/:comment/add" render={() => <Comments bookId={props.bookId} comments={props.comments} myAvatar={props.myAvatar} getAllCommentsThunk={props.getAllCommentsThunk} addNewCommentThunk={props.addNewCommentThunk} />} />
                            <Route path="/books/:bookId" render={() => <BasicInfoBook bookId={props.bookId} bookName={props.bookName} author={props.author} bookDescription={props.bookDescription} yearPublication={props.yearPublication} publish={props.publish} language={props.language} ageRestrictions={props.ageRestrictions} rating={props.rating} myRating={props.myRating} setRatingThunk={props.setRatingThunk} getMyRatingThunk={props.getMyRatingThunk} />} />
                        </Switch>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    bookId: state.bookPages.bookId,
    bookName: state.bookPages.bookName,
    bookDescription: state.bookPages.bookDescription,
    author: state.bookPages.author,
    yearPublication: state.bookPages.yearPublication,
    language: state.bookPages.language,
    genre: state.bookPages.genre,
    publish: state.bookPages.publish,
    illustrationCover: state.bookPages.illustrationCover,
    ageRestrictions: state.bookPages.ageRestrictions,
    comments: state.comments.comments,
    myAvatar: state.auth.avatar,
    rating: state.bookPages.rating,
    myRating: state.bookPages.myRating,
})

export default compose(connect(mapStateToProps, { getFullInfoBookThunk, getAllCommentsThunk, addNewCommentThunk, addBookInDiaryReaderThunk, setRatingThunk, getMyRatingThunk }), withRouter)(BookIndex);