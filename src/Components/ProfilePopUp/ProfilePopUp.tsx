import { FC } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { ReactComponent as SettingsBlack } from '../../Assets/Icons/settings_black.svg'
import { ReactComponent as LogoutBlack } from '../../Assets/Icons/logout_black.svg'
import { ReactComponent as ThemeBlack } from '../../Assets/Icons/theme_switch_black.svg'
import './ProfilePopUp.scss'

const ProfilePopUp: FC<ProfilePopUpProps> = ({ user, theme }) => {
    return (
        <div className="profile-popup-container">
            <div className="profile-popup-userinfo">
                <img src={user?.avatar} alt={user?.username} />
                <div className="userinfo-container">
                    <h4>{user?.username}</h4>
                    <h4>{user?.email}</h4>
                </div>
            </div>
            <div className="profile-popup-userinfo-extras">
                <div className="profile-popup-userinfo-extra">
                    <h5>Created:</h5>
                    <p>{moment(user?.createdOn).format('Do MMM YY')}</p>
                    <span></span>
                </div>
                <div className="profile-popup-userinfo-extra">
                    <h5>Entries:</h5>
                    <p>{user?.entries}</p>
                    <span></span>
                </div>
            </div>
            <div className="profile-popup-user-options">
                <div className="profile-popup-user-option">
                    <SettingsBlack className="profile-popup-user-option-icon"/>
                    <h4>Settings</h4>
                </div>
                <div className="profile-popup-user-option">
                    <ThemeBlack className="profile-popup-user-option-icon"/>
                    <h4>Switch Theme</h4>
                </div>
                
            </div>
            <div className="profile-popup-user-logout">
                <LogoutBlack className="profile-popup-user-logout-icon"/>
                <h4>Signout</h4>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    theme: state.themeReducer.theme,
})

export default connect(mapStateToProps)(ProfilePopUp)
