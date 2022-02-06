import React, {useEffect} from 'react'
import { useForm } from "react-hook-form";

const BasicInfoBook = (props) => {

    useEffect(() => {
        props.getMyRatingThunk(props.bookId)
    }, [])

    // const onSubmit = (formData) => {
    //     console.log(formData);
    //     // props.foundBooksThunk(page, props.pageSize, formData.fieldFind, formData.search, props.isSorted, props.fieldSort)
    // };getRatingThunk

    const putRating = (event) => {
        //ждем INPUT
        if (event.target.tagName === 'INPUT') {
            const rating = event.target.value;
            props.setRatingThunk(props.bookId, rating)
        }
    }

    // document.getElementById("checkbox").checked = true;
    let element = document.querySelector("input[value='" + props.myRating + "']");
    if (element)
        element.checked = true;

    return (
        <div className="book-full-info">
            <h2>{props.bookName}</h2>
            <div className="evaluations">
                {/* <i className="bi bi-star yellow"></i>
                <span className="average-rating">4,6</span>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i> */}
                <i className="bi bi-star yellow"></i>
                <span className="average-rating">{props.rating}</span>
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
                </div>
            </div>
            <div className="statistics-numbers">
                <div className="static-item">
                    <h3>12622</h3>
                    <span>Прочитали</span>
                </div>
                <div className="static-item">
                    <h3>3221</h3>
                    <span>Планируют</span>
                </div>
                <div className="static-item">
                    <h3>311</h3>
                    <span>Рецензий</span>
                </div>
                <div className="static-item">
                    <h3>134</h3>
                    <span>Цитат</span>
                </div>
                <div className="static-item">
                    <h3>30</h3>
                    <span>Аргументов</span>
                </div>
            </div>
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