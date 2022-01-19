import React, { useState, useEffect } from 'react'
import Group from '../Profile/Group/Group'

const GroupsContent = (props) => {
    return (
        <section className="main-content profile-content">
            <div className="block-friends-and-group separate-page-friends-and-group">
                <h2>Мои группы</h2>
                <a className="find-other-elements" href="#">Найти новые группы</a>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                </div>
                <div className="list-elements">
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                    <div className="col-lg-2 list-elements-item">
                        <div className="item-img"><img src="img/img-group.png" /></div>
                        <span className="item-name">Книжный мир</span>
                        <div className="item-work">120 участников</div>
                    </div>
                </div>
                <div className="list-elements">
                    {
                        props.groups.map((group, index) => { return <Group key={index} group={group} /> })
                    }
                </div>
            </div>
        </section>
    )
}

export default GroupsContent;