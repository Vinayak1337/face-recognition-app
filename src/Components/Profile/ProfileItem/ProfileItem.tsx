import { FC } from 'react'
import './ProfileItem.scss'

const ProfileItem: FC<ProfileItemProps> = ({ type, label, value, handleChange, disabled, name, isLast, isValid }) => {
    return (
        <div className={`profile-item ${isLast ? 'profile-item-last' : ''}`}>
            <div className="profile-item-label">
                <label htmlFor={type}>{ label }</label>
            </div>
            <div className="profile-item-input">
                <input className={ isValid === false ? `profile-item-input-weak` : ''} type={type} name={name} value={value} disabled={disabled} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default ProfileItem
