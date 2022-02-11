import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../common/hoc/withAuthRedirect'
import { getFullInfoBookThunk, getStatisticsBookThunk, addBookInDiaryReaderThunk, setRatingThunk, getMyRatingThunk } from '../../redux/book-reducer';
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
                        <BookNavigation bookId={props.bookId} type_book={props.type_book} />
                        <Switch>
                            <Route path="/books/:bookId/:comment/add" render={() => <Comments bookId={props.bookId} comments={props.comments} myAvatar={props.myAvatar} getAllCommentsThunk={props.getAllCommentsThunk} addNewCommentThunk={props.addNewCommentThunk} />} />
                            <Route path="/books/:bookId" render={() => <BasicInfoBook bookId={props.bookId} bookName={props.bookName} author={props.author} bookDescription={props.bookDescription} yearPublication={props.yearPublication} publish={props.publish} language={props.language} ageRestrictions={props.ageRestrictions} rating={props.rating} myRating={props.myRating} statistics={props.statistics} setRatingThunk={props.setRatingThunk} getMyRatingThunk={props.getMyRatingThunk} getStatisticsBookThunk={props.getStatisticsBookThunk} />} />
                        </Switch>
                    </div>
                </div>
                <div id="test" className='exmpl'>
                    <img src="http://192.168.0.165:3500/uploads/23012022-164024_829-photo-user.jpg" />
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
    type_book: state.bookPages.type_book,
    comments: state.comments.comments,
    myAvatar: state.auth.avatar,
    rating: state.bookPages.rating,
    myRating: state.bookPages.myRating,
    statistics: state.bookPages.statistics,
})

export default compose(connect(mapStateToProps, { getFullInfoBookThunk, getStatisticsBookThunk, getAllCommentsThunk, addNewCommentThunk, addBookInDiaryReaderThunk, setRatingThunk, getMyRatingThunk }), withRouter, withAuthRedirect)(BookIndex);