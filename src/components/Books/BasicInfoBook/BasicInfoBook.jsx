import React from 'react'

const BasicInfoBook = (props) => {
    return (
        <div className="book-full-info">
            <h2>{props.bookName}</h2>
            <div className="evaluations">
                <i className="bi bi-star yellow"></i>
                <span className="average-rating">4,6</span>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
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