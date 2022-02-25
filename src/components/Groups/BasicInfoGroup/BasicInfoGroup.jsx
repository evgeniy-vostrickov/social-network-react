import React from 'react'

const BasicInfoGroup = (props) => {
    return (
        <>
            <div className="group-full-info">
                <h2>{props.groupName}</h2>
                <div className="statistics-numbers">
                    <div className="static-item">
                        <h3>{props.number_participants}</h3>
                        <span>Участников</span>
                    </div>
                    <div className="static-item">
                        <h3>{props.numEvents}</h3>
                        <span>Событий</span>
                    </div>
                </div>
                <div className="group-description">{props.groupDescription}</div>
                <div className="group-dop-data">Владелец: <span>{props.owner_name} {props.owner_surname}</span></div>
                <div className="group-dop-data">Город: <span>{props.city}</span></div>
            </div>
        </>
    )
}

export default BasicInfoGroup;