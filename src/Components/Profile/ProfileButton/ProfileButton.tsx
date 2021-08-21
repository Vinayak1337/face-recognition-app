import { FC } from 'react'
import './ProfileButton.scss'

const ProfileButton: FC<ProfileButtonProps> = ({ type, handleClick, disabled, children }) => {
    return (
        <button type="button" className={`profile-btn-${type}`} disabled={disabled} onClick={handleClick}>{ children }</button>
    )
}

export default ProfileButton
