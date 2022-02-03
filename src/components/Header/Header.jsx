import React from 'react';
import { NavLink } from 'react-router-dom';
import iconUser from '../../assets/images/user.jpg';

//добавить logout logoutUserThunk

const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/main">KOOBNET</NavLink>
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
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/educational-literature">Учебная литература</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Quotes">Цитаты</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/book-exchange">Книгообмен</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 nav-find" type="text" placeholder="Введите название" />
                                <button className="btn btn-primary" type="button">Найти</button>
                        </form>
                        <div className="menu-quick">
                            <ul className="menu-quick-list">
                                <li><NavLink to="/my-groups"><i className="bi bi-globe2"></i></NavLink></li>
                                <li><NavLink to="/messages"><i className="bi bi-chat"></i></NavLink></li>
                                <li><NavLink to="/my-books"><i className="bi bi-book"></i></NavLink></li>
                                <li>
                                    <NavLink to="/profile" className="class">
                                        <div className="img-container">
                                            <img src={iconUser} alt="" />
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;