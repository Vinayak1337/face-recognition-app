import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import './AvatarPopUp.scss'
import { Dispatch } from 'redux'
import { setTheme } from '../../../Redux/Theme/ThemeActions'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { setUser } from '../../../Redux/User/UserActions'
import { SettingsIconBlack, HomeIconBlack, ThemeSwitchIconBlack, LogoutIconBlack } from '../../../Assets/Icons'

const AvatarPopUp: FC<AvatarPopUpProps & RouteComponentProps> = ({ user, theme, setTheme, history, togglePopup, setUser }) => {
    const [path, setPath] = useState<string>(history.location.pathname);

    useEffect(() => {
        setPath(history.location.pathname)
    }, [history.location.pathname])

    const getOptions = () => {
        if (path.endsWith('/')) {
            return (
            <div className="avatar-popup-user-option" onClick={handleOptions('profile')}>
                <SettingsIconBlack className="avatar-popup-user-option-icon"/>
                <h4>Settings</h4>
            </div>
            )
        }
        else if (path.endsWith('profile')) {
            return (
            <div className="avatar-popup-user-option" onClick={handleOptions('home')}>
                <HomeIconBlack className="avatar-popup-user-option-icon"/>
                <h4>Home</h4>
            </div>
            )
        }

        return (
            <>
                <div className="avatar-popup-user-option" onClick={handleOptions('profile')}>
                    <SettingsIconBlack className="avatar-popup-user-option-icon"/>
                    <h4>Settings</h4>
                </div>
                <div className="avatar-popup-user-option" onClick={handleOptions('home')}>
                    <HomeIconBlack className="avatar-popup-user-option-icon"/>
                    <h4>Home</h4>
                </div>
            </>
        )
    }

    const handleOptions = (location: 'home' | 'profile') => () => {
        history.push(location === 'home' ? '/' : '/profile');
        togglePopup(false);
    }

    return (
        <div className="avatar-popup-container">
            <div className="avatar-popup-userinfo">
                <img src={user?.avatar} alt={user?.username} onClick={() => {
                    togglePopup(false);
                    history.push('/profile');
                }}/>
                <div className="userinfo-container">
                    <h4>{user?.username}</h4>
                    <h4>{user?.email}</h4>
                </div>
            </div>
            <div className="avatar-popup-userinfo-extras">
                <div className="avatar-popup-userinfo-extra">
                    <h5>Created:</h5>
                    <p>{moment(user?.createdOn).format('Do MMM YY')}</p>
                    <span></span>
                </div>
                <div className="avatar-popup-userinfo-extra">
                    <h5>Entries:</h5>
                    <p>{user?.entries}</p>
                    <span></span>
                </div>
            </div>
            <div className="avatar-popup-user-options">
                {
                    getOptions()
                }
                <div className="avatar-popup-user-option" onClick={() => {
                    theme === 'black' ?
                    setTheme('white') :
                    setTheme('black')
                    togglePopup(false);
                }}>
                    <ThemeSwitchIconBlack className="avatar-popup-user-option-icon"/>
                    <h4>Switch Theme</h4>
                </div>
                
            </div>
            <div className="avatar-popup-user-logout" onClick={() => {
                togglePopup(false);
                setUser(null);
            }}>
                <LogoutIconBlack className="avatar-popup-user-logout-icon"/>
                <h4>Signout</h4>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    theme: state.themeReducer.theme,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setTheme: (theme: Theme) => dispatch(setTheme(theme)),
    setUser: (user: User | null) => dispatch(setUser(user)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AvatarPopUp))
