import React, {useState, useEffect} from 'react'
import Friend from '../Profile/Friends/Friend'

const FriendsContent = (props) => {
    return (
        <section className="main-content profile-content">
            <div className="block-friends-and-group separate-page-friends-and-group">
                <h2>Мои друзья</h2>
                <a className="find-other-elements" href="#">Найти новых друзей</a>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-1.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Программист</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-2.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Ученик</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-3.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Системный администратор</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-4.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Учитель</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-5.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Студент</div>
                    </div>
                </div>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-6.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Врач</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-7.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Студент</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-8.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Ученик</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-9.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Ученик</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/friend-10.jpg" /></div>
                        <span className="item-name">Андрей Иванов, 33</span>
                        <div className="item-work">Студент</div>
                    </div>
                </div>
                <div className="list-elements">
                    {
                        props.friends.map((friend, index) => { return <Friend key={index} friend={friend} /> })
                    }
                </div>
            </div>
        </section>
    )
}

export default FriendsContent;