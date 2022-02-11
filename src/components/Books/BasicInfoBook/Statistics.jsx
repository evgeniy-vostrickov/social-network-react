import React, { useEffect } from 'react'

const Statistics = ({ bookId, statistics, getStatisticsBookThunk }) => {

    useEffect(() => {
        getStatisticsBookThunk(bookId)
    }, [])

    if (!statistics)
        return <div>Loading...</div>

    const { pastBook, wantBook, reviews, quotes, dopComment, nameComment } = statistics;

    return (
        <div className="statistics-numbers">
            <div className="static-item">
                <h3>{pastBook}</h3>
                <span>Прочитали</span>
            </div>
            <div className="static-item">
                <h3>{wantBook}</h3>
                <span>Планируют</span>
            </div>
            <div className="static-item">
                <h3>{reviews}</h3>
                <span>Рецензии</span>
            </div>
            <div className="static-item">
                <h3>{quotes}</h3>
                <span>Цитаты</span>
            </div>
            {
                nameComment != undefined &&
                <div className="static-item">
                    <h3>{dopComment}</h3>
                    <span>{nameComment}</span>
                </div>
            }
        </div>
    )
}

export default Statistics;