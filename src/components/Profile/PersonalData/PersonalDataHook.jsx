import React, { useState, useEffect } from 'react'

const PersonalDataHook = ({ field, currentPersonalData, setPersonalDataUserThunk }) => {
    const [editMode, setEditMode] = useState(false); //хук для проверки в какой мы состоянии
    const [personalData, setPersonalData] = useState(currentPersonalData); //хук для хранения временного статуса

    useEffect(() => {
        setPersonalData(currentPersonalData)
    }, [currentPersonalData])

    return (
        <div>
            {!editMode ?
                <div>
                    <span onDoubleClick={() => { setEditMode(true) }}>{!personalData ? "Нет данных!" : personalData}</span>
                </div>
                :
                <div>
                    {
                        field != "date_births" ?
                            <input autoFocus={true} value={personalData}
                                onBlur={() => { setEditMode(false); setPersonalDataUserThunk(field, personalData) }}
                                onChange={(e) => { setPersonalData(e.currentTarget.value) }} />
                            :
                            <input type="date" autoFocus={true} value={personalData}
                                onBlur={() => { setEditMode(false); setPersonalDataUserThunk(field, personalData) }}
                                onChange={(e) => { setPersonalData(e.currentTarget.value) }} />
                    }
                    {/* onBlur - убираем фокус; autoFocus - автовокус */}
                </div>
            }
        </div>
    )
}

export default PersonalDataHook;