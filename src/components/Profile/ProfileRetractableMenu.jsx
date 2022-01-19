import React from 'react';

const ProfileRetractableMenu = (props) => {
    const retractableMenu = () => {
        document.querySelector('.retractable-menu').classList.toggle('retractable-menu-active');
        document.querySelector('.menu-btn').classList.toggle('menu-btn_active');
    }

    return (
        <section className="retractable-menu" onMouseOver={retractableMenu} onMouseOut={retractableMenu}>
            <div className="menu-btn"><span></span></div>
            <ul>
                <li key="0"><a href="#" className="retractable-menu-link"><i className="bi bi-house-door"></i><span>Домашняя страница</span></a></li>
                <li key="1"><a href="#" className="retractable-menu-link"><i className="bi bi-globe2"></i><span>Группы</span></a></li>
                <li key="2"><a href="#" className="retractable-menu-link"><i className="bi bi-people"></i><span>Друзья</span></a></li>
                <li key="3"><a href="#" className="retractable-menu-link"><i className="bi bi-chat"></i><span>Сообщения</span></a></li>
                <li key="4"><a href="#" className="retractable-menu-link"><i className="bi bi-book"></i><span>Дневник читателя</span><i className="bi bi-caret-right"></i></a></li>
                <li key="5"><a href="#" className="retractable-menu-link"><i className="bi bi-chat-square-dots"></i><span>Комментарии</span><i className="bi bi-caret-right"></i></a></li>
                <li key="6"><a href="#" className="retractable-menu-link"><i className="bi bi-cash-coin"></i><span>Книги на продажу</span></a></li>
                <li key="7"><a href="#" className="retractable-menu-link"><i className="bi bi-door-open"></i><span>Выйти</span></a></li>
            </ul>
        </section>
    )
}

export default ProfileRetractableMenu;