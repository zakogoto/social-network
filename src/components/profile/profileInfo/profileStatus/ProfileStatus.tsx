// eslint-disable-next-line
import React, { ChangeEvent, FC, useEffect, useState } from 'react'

type PropsType = {
    status: string,
    isOwner: boolean
    updateUserStatus: (currentStatus: string) => void
}

const ProfileStatus: FC<PropsType> = ({status, updateUserStatus, isOwner}) => {
    let [editMode, setEditMode] = useState(false)
    let [currentStatus, setCurrentStatus] = useState<string>(status)

    useEffect(()=> {
        setCurrentStatus(status)
    }, [status])

    const activateEditMode = () => {
        if (isOwner) {
            setEditMode(true)
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatus(currentStatus)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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

export default ProfileStatus