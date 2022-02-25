import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom'

const LeftSidebar = ({ bookId, illustrationCover, isDiaryReader, addBookInDiaryReaderThunk }) => {
    const urlBook = '/books/' + bookId;
    const addBookInDiaryReader = event => {
        addBookInDiaryReaderThunk(bookId, event.currentTarget.getAttribute("data-section"));
    }

    useEffect(() => {
        if (document.querySelector(`[disabled]`))
            document.querySelector(`[disabled]`).disabled = false;
        if (isDiaryReader)
            document.querySelector(`[data-section="${isDiaryReader}"]`).disabled = true;
    }, [isDiaryReader])
    
    return (
        <div className="col-lg-4">
            <div className="book-photo"><img src={illustrationCover} /></div>
            <div className="actions">
                <div className="actions-item">
                    <button type="button" data-section="Прочитанные книги" className="btn btn-outline-primary" onClick={addBookInDiaryReader}>
                        <i className="bi bi-book-half"></i>
                        <span> Добавить в прочитанные книги</span>
                    </button>
                </div>
                <div className="actions-item">
                    <button type="button" data-section="Не дочитал" className="btn btn-outline-primary" onClick={addBookInDiaryReader}>
                        <i className="bi bi-book-half"></i>
                        <span> Добавить в недочитанные книги</span>
                    </button>
                </div>
                <div className="actions-item">
                    <button type="button" data-section="Читаю сейчас" className="btn btn-outline-primary" onClick={addBookInDiaryReader}>
                        <i className="bi bi-book-half"></i>
                        <span> Добавить в "читаю сейчас"</span>
                    </button>
                </div>
                <div className="actions-item">
                    <button type="button" data-section="Хочу прочитать" className="btn btn-outline-primary" onClick={addBookInDiaryReader}>
                        <i className="bi bi-book-half"></i>
                        <span> Добавить в "хочу прочитать"</span>
                    </button>
                </div>
                {/* <div className="actions-dop-item">
                    <button className="btn btn-outline-primary" type="submit">Действия</button>
                </div> */}
            </div>
        </div>
    )
}

export default LeftSidebar;