import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getLastQuotesThunk } from '../../redux/comments-reducer';
import baseURL from "../../common/baseUrl/serverUrl"

const Quotes = ({ quotes, getLastQuotesThunk }) => {

    useEffect(() => {
        getLastQuotesThunk();
    }, [])

    return (
        <section className="main-content quote-content">
            <h2 className='header pt-4'>Последние цитаты</h2>
            <div className='container'>
                <div className="list-card pt-2">
                    {
                        quotes.map(quote => {
                            return (
                                <div key={quote.comment_id} className="row element">
                                    <div className="col-lg-1 element-photo h-14r">
                                        <NavLink to={'/books/' + quote.book_id}><img src={baseURL + quote.illustration_cover} /></NavLink>
                                    </div>
                                    <div className="col-lg-11 book-small-info">
                                        <NavLink to={'/books/' + quote.book_id}><h2>{quote.book_name}</h2></NavLink>
                                        <div className="book-author">{quote.author}</div>
    
                                        <div className="review-item">
                                            <div className="user-comment">{quote.comment_text}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    quotes: state.comments.quotes
})

export default connect(mapStateToProps, { getLastQuotesThunk })(Quotes);