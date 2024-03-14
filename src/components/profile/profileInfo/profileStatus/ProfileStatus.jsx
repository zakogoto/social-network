// eslint-disable-next-line
import React, { useEffect, useState } from 'react'

export default function ProfileStatus({status, updateUserStatus}) {
    let [editMode, setEditMode] = useState(false)
    let [currentStatus, setCurrentStatus] = useState(status)

    useEffect(()=> {
        setCurrentStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatus(currentStatus)
    }

    const onStatusChange = (e) => {
        setCurrentStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode
                ? <span onDoubleClick={activateEditMode}>{status ? status : 'no status'}</span>
                : <input onChange={onStatusChange} autoFocus onBlur={deactivateEditMode} defaultValue={currentStatus}/>
                // : <StatusReduxForm onSubmit={onSubmit} defaultValue={status} onBlur={deactivateEditMode}/>
            }
        </div>
    )
}

