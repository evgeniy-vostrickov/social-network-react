import React from 'react'
import baseURL from "../../../common/baseUrl/serverUrl"
import userPhotoDefault from '../../../assets/images/user.jpg'
import moment from 'moment';

const Comment = ({ comment }) => {

    // const putLike = () => {
    //     putLikeThunk(review.comment_id)
    // }
    // const putDislike = () => {
    //     putDislikeThunk(review.comment_id)
    // }

    return (
        <div className={window.location.pathname.indexOf("profile") != -1 ? "review-item profile-review fs2-2r" : "review-item"}>
            <div className="header-comment">
                {/* <div className="review-img"><img src={comment.avatar ? baseURL+comment.avatar : userPhotoDefault} /></div> */}
                <div className="review-img"><img src={comment.avatar ? baseURL + comment.avatar : userPhotoDefault} /></div>
                <div className="user-name">{comment.user_name + ' ' + comment.surname}</div>
            </div>
            <div className="user-comment">{comment.comment_text}</div>

            {/* <button type="button" className="btn btn-primary" onClick={putLike}><i className="bi bi-hand-thumbs-up-fill"></i><span>{comment.love}</span></button>
            <button type="button" className="btn btn-primary" onClick={putDislike}><i className="bi bi-hand-thumbs-down-fill"></i><span>{comment.dislike}</span></button> */}
            <div className="date-comment">{moment(comment.date).format('DD.MM.YYYY')}</div>
        </div>
    )
}

export default Comment;