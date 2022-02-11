import React, { useEffect } from 'react'
import Statistics from './Statistics'

const BasicInfoBook = (props) => {

    useEffect(() => {
        props.getMyRatingThunk(props.bookId)
    }, [])

    useEffect(() => {
        const element = document.querySelector("input[value='" + (props.myRating || 0) + "']");
        element.checked = true;
        return () => {
            element.checked = false;
        }
    }, [props.myRating])

    const putRating = (event) => {
        //ждем INPUT
        if (event.target.tagName === 'INPUT') {
            const rating = event.target.value;
            props.setRatingThunk(props.bookId, rating)
        }
    }

    return (
        <div className="book-full-info">
            <h2>{props.bookName}</h2>
            <div className="evaluations">
                Рейтинг: 
                <span className="average-rating"> {props.rating}
                <i className="bi bi-star yellow"></i></span>
                <div className="rating-area" onClick={putRating}>
                    <input type="radio" id="star-5" name="rating" value="5" />
                    <label htmlFor="star-5" title="Оценка «5»"></label>
                    <input type="radio" id="star-4" name="rating" value="4" />
                    <label htmlFor="star-4" title="Оценка «4»"></label>
                    <input type="radio" id="star-3" name="rating" value="3" />
                    <label htmlFor="star-3" title="Оценка «3»"></label>
                    <input type="radio" id="star-2" name="rating" value="2" />
                    <label htmlFor="star-2" title="Оценка «2»"></label>
                    <input type="radio" id="star-1" name="rating" value="1" />
                    <label htmlFor="star-1" title="Оценка «1»"></label>
                    <input type="hidden" value="0" /> {/* Скрытое поле для того чтобы можно было на него ссылаться, при отсутствии оценки */}
                </div>
            </div>
            <Statistics bookId={props.bookId} statistics={props.statistics} getStatisticsBookThunk={props.getStatisticsBookThunk} />
            <div className="book-author">{props.author}</div>
            <div className="book-description">{props.bookDescription}</div>
            <div className="book-dop-data">Год написания: <span>{props.yearPublication}</span></div>
            <div className="book-dop-data">Издательство: <span>{props.publish}</span></div>
            <div className="book-dop-data">Язык: <span>{props.language}</span></div>
            <div className="book-dop-data">Возрастные ограничения: <span>{props.ageRestrictions}</span></div>
        </div>
    )
}

export default BasicInfoBook;