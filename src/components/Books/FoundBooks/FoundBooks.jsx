import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBooksThunk } from '../../../redux/book-reducer';

const FoundBooks = ({ pageSize, getAllBooksThunk }) => {
    useEffect(() => {
        getAllBooksThunk(1, pageSize);
    }, [])
    return (
        <section className="main-content books-content">
            <div className="container">
                <div className="search-bar">
                    <form className="d-flex">
                        <input className="form-control me-2" type="text" placeholder="Поиск книг" />
                        <i className="bi bi-search"></i>
                        <button className="btn btn-outline-primary" type="submit">Найти</button>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Сортировка
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">По популярности</a></li>
                                <li><a className="dropdown-item" href="#">По новизне</a></li>
                                <li><a className="dropdown-item" href="#">По рейтингу</a></li>
                            </ul>
                        </div>
                        {/* <div className="btn-group">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Фильтрация
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">По популярности</a></li>
                                    <li><a className="dropdown-item" href="#">По новизне</a></li>
                                    <li><a className="dropdown-item" href="#">По рейтингу</a></li>
                                </ul>
                            </div> */}
                    </form>
                </div>
                <div className="list-card">
                    <div className="row element">
                        <div className="col-lg-2 element-photo h-30r">
                            <a href="#"><img src="img/book-1.jpg" /></a>
                        </div>
                        <div className="col-lg-10 book-small-info">
                            <a href="#"><h2>Гарри Поттер и философский камень</h2></a>
                            <div className="book-author">Джоан Роулинг</div>
                            <div className="book-description">Книга, покорившая мир, эталон литературы для читателей всех возрастов, синоним успеха. Книга, сделавшая Джоан Роулинг самым читаемым писателем современности. Книга, ставшая культовой уже для нескольких поколений. "Гарри Поттер и Философский камень" - история начинается. Жизнь в чулане под лестницей, донашивание одежды за братом, отсутствие родительской заботы — может закончится хорошо. Наградой с...</div>
                        </div>
                    </div>
                    <div className="row element">
                        <div className="col-lg-2 element-photo h-30r">
                            <a href="#"><img src="img/book-2.jpg" /></a>
                        </div>
                        <div className="col-lg-10 book-small-info">
                            <a href="#"><h2>Гарри Поттер и узник Азкабана</h2></a>
                            <div className="book-author">Джоан Роулинг</div>
                            <div className="book-description">Двенадцать долгих лет в Азкабане — мрачной тюрьме волшебного мира — содержался всем известный узник по имени Сириус Блэк. Его обвиняли в убийстве тринадцати человек и считали наследником лорда Волан-де-Морта. И вот он бежал, и из оставленных им следов ясно, что на этот раз убийца поставил целью избавиться от Гарри Поттера. Теперь Гарри в опасности, даже за стенами своей волшебной школы, даже в окр...</div>
                        </div>
                    </div>
                    <div className="row element">
                        <div className="col-lg-2 element-photo h-30r">
                            <a href="#"><img src="img/book-3.jpg" /></a>
                        </div>
                        <div className="col-lg-10 book-small-info">
                            <a href="#"><h2>Гарри Поттер и Кубок огня</h2></a>
                            <div className="book-author">Джоан Роулинг</div>
                            <div className="book-description">«Испытаний на протяжении этого учебного года будет три, и они позволят проверить способности чемпионов с разных сторон… колдовское мастерство – доблесть – способность к дедукции – и, разумеется, умение достойно встретить опасность».В «Хогварце» проводится Тремудрый Турнир. К участию допускаются только волшебники, достигшие семнадцатилетия, но это не мешает Гарри мечтать о победе. А потом, во время...</div>
                        </div>
                    </div>
                </div>
                <Pagination totalBooksCount={props.totalBooksCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} />
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav> */}
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    pageSize: state.bookPages.pageSize,

})

export default connect(mapStateToProps, { getAllBooksThunk })(FoundBooks);