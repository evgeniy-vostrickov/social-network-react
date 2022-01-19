import React, {useState, useEffect} from 'react'

const ProfileStatusHook = ({currentStatus, setStatusUserThunk}) => {
    const [editMode, setEditMode] = useState(false); //хук для проверки в какой мы состоянии
    const [status, setStatus] = useState(currentStatus); //хук для хранения временного статуса

    useEffect(() => {
        setStatus(currentStatus)
    }, [currentStatus])
    
    return (
        <div>
                {!editMode ?
                    <div>
                        <span onDoubleClick={() => { setEditMode(true) }}>{!status ? "Not Status!" : status}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true} value={status}
                            onBlur={() => { setEditMode(false); setStatusUserThunk(status) }}
                            onChange={(e) => { setStatus(e.currentTarget.value) }} />
                        {/* onBlur - убираем фокус; autoFocus - автовокус */}
                    </div>
                }
            </div>
    )
}

export default ProfileStatusHook;