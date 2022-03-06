import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const IntroductoryPage = (props) => {

    return (
        <div className="main-page">
            <div className="wrap">
                <div className="wrap_container_quote">
                    <div className="container-quote">
                        <div className="main-quote">
                            <div className="main-quote-h1">
                                <h1>
                                    KOOBNET 
                                    <br />
                                    сайт про книги, 
                                    <br />
                                    книжная социальная сеть
                                </h1>
                            </div>
                            <div className="main-quote-h1-after">
                                <p>Здесь вы можете:</p>
                                <ul>
                                    <li>Искать интересные книги</li>
                                    <li>Оставлять комментарии к изданиям</li>
                                    <li>Знакомится с новыми людьми</li>
                                    <li>Общаться с друзьями</li>
                                    <li>Вести дневник читателя</li>
                                </ul>
                            </div>
                        </div>
                        <ul className='main-quote-ul'>
                            <li className='first-item'>
                                <NavLink to="/profile/">
                                    <p>
                                        Мой
                                        <br />
                                        профиль
                                    </p>
                                </NavLink>
                            </li>
                            <li className='second-item'>
                                <NavLink to="/books/">
                                    <p>
                                        Список
                                        <br />
                                        книг
                                    </p>
                                </NavLink>
                            </li>
                            <li className='third-item'>
                                <NavLink to="/groups/">
                                    <p>
                                        Список
                                        <br />
                                        групп
                                    </p>
                                </NavLink>
                            </li>
                            <li className='fourth-item'>
                                <NavLink to="/quotes/">
                                    <p>
                                        Список
                                        <br />
                                        цитат
                                    </p>
                                </NavLink>
                            </li>
                            <li className='five-item'>
                                <NavLink to="/educational/senior/">
                                    <p>
                                        Учебная
                                        <br />
                                        литература
                                    </p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroductoryPage;
// withAuthRedirect - хок, который возвращает компоненты и добавляет проверку на то что залогинни пользователь или нет