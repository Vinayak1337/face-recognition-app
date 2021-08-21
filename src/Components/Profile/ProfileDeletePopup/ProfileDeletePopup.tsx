import { FC } from 'react'
import './ProfileDletePopup.scss'

const ProfileDeletePopup: FC<ProfileDeletePopupProps> = ({ handleClick }) => {
    return (
        <div className="profile-delete-popup">
            <div className="profile-delete-text">
                <p>Do you want to delete your account? It is not reversible.</p>
            </div>
            <div className="profile-delete-buttons">
                <button type="button" onClick={handleClick.bind(null, false)}>No</button>
                <button type="button" onClick={handleClick.bind(null, true)}>Yes</button>
            </div>
        </div>
    )
}

export default ProfileDeletePopup
