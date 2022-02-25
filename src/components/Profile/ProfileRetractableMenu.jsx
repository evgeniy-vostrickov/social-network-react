import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

const ProfileRetractableMenu = ({logoutUser}) => {
    const retractableMenu = () => {
        document.querySelector('.retractable-menu').classList.toggle('retractable-menu-active');
        document.querySelector('.menu-btn').classList.toggle('menu-btn_active');
    }

    return (
        <section className="retractable-menu" onMouseOver={retractableMenu} onMouseOut={retractableMenu}>
            <div className="menu-btn"><span></span></div>
            <ul>
                <li key="0"><NavLink to="/profile" className="retractable-menu-link"><i className="bi bi-house-door"></i><span>Домашняя страница</span></NavLink></li>
                <li key="1"><NavLink to="/profile/groups" className="retractable-menu-link"><i className="bi bi-globe2"></i><span>Группы</span></NavLink></li>
                <li key="2"><NavLink to="/profile/friends" className="retractable-menu-link"><i className="bi bi-people"></i><span>Друзья</span></NavLink></li>
                <li key="3"><NavLink to="/profile/dialog" className="retractable-menu-link"><i className="bi bi-chat"></i><span>Сообщения</span></NavLink></li>
                <li key="4"><NavLink to="#" className="retractable-menu-link"><i className="bi bi-book"></i><span>Дневник читателя</span><i className="bi bi-caret-right"></i></NavLink>
                    <ul className="inner-list">
                        <li><NavLink to="/profile/diary/past" className="retractable-menu-link inner-link">Прочитанные книги</NavLink></li>
                        <li><NavLink to="/profile/diary/unfinished" className="retractable-menu-link inner-link">Недочитанные книги</NavLink></li>
                        <li><NavLink to="/profile/diary/want" className="retractable-menu-link inner-link">Книги "хочу прочитать"</NavLink></li>
                        <li><NavLink to="/profile/diary/now" className="retractable-menu-link inner-link">Книги "читаю сейчас"</NavLink></li>
                    </ul>
                </li>
                <li key="5"><NavLink to="#" className="retractable-menu-link"><i className="bi bi-chat-square-dots"></i><span>Комментарии</span><i className="bi bi-caret-right"></i></NavLink>
                    <ul className="inner-list">
                        <li><NavLink to="/profile/comments/reviews" className="retractable-menu-link inner-link">Рецензии</NavLink></li>
                        <li><NavLink to="/profile/comments/arguments" className="retractable-menu-link inner-link">Аргументы</NavLink></li>
                        <li><NavLink to="/profile/comments/glossary" className="retractable-menu-link inner-link">Глоссарий</NavLink></li>
                        <li><NavLink to="/profile/comments/quotes" className="retractable-menu-link inner-link">Цитаты</NavLink></li>
                        <li><NavLink to="/profile/comments/quoting" className="retractable-menu-link inner-link">Цитирование</NavLink></li>
                    </ul>
                </li>
                {/* <li key="6"><a href="#" className="retractable-menu-link"><i className="bi bi-cash-coin"></i><span>Книги на продажу</span></a></li> */}
                <li key="7" onClick={logoutUser}><NavLink to="/login/" className="retractable-menu-link"><i className="bi bi-door-open"></i><span>Выйти</span></NavLink></li>
            </ul>
        </section>
    )
}

export default ProfileRetractableMenu;