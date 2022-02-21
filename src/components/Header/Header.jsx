import React from 'react';
import { NavLink } from 'react-router-dom';
import iconUser from '../../assets/images/user.jpg';
import {foundBooksThunk} from "../../redux/book-reducer";
import { connect } from 'react-redux';

//добавить logout logoutUserThunk

const Header = (props) => {

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="logotip" to="/main">KOOBNET</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/main">Главная</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/books">Книги</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/groups">Группы</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/educational" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Учебная литература</NavLink>
                                <ul className="dropdown-menu fs1-8r" aria-labelledby="navbarDropdown" onClick={event => document.querySelector(".dropdown-menu").classList.remove("show")}>
                                    <li><NavLink className="dropdown-item" to="/educational/junior">Для младших классов</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/educational/senior">Для старших классов</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/educational/students">Для студентов</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/quotes">Цитаты</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 nav-find" type="text" name="search2" placeholder="Введите название книги" />
                            <NavLink to="/books" className="btn btn-primary fs1-8r" role="button">Найти</NavLink>
                        </form>
                        <div className="menu-quick">
                            {props.isAuth ?
                                <ul className="menu-quick-list">
                                    <li><NavLink to="/profile/groups"><i className="bi bi-globe2"></i></NavLink></li>
                                    <li><NavLink to="/profile/dialog"><i className="bi bi-chat"></i></NavLink></li>
                                    <li><NavLink to="/profile/diary/past"><i className="bi bi-book"></i></NavLink></li>
                                    <li>
                                        <NavLink to="/profile" className="class">
                                            <div className="img-container">
                                                <img src={iconUser} alt="" />
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                                :
                                <NavLink to="/login" className="menu-quick-enter">Войти</NavLink>
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;