import { FC } from 'react'
import './ProfileItem.scss'

const ProfileItem: FC<ProfileItemProps> = ({ type, label, value, handleChange, disabled }) => {
    return (
        <div className="profile-item">
            <div className="profile-item-label">
                <label htmlFor={type}>{ label }</label>
            </div>
            <div className="profile-item-input">
                <input value={value} disabled={disabled} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default ProfileItem
