import { FC } from 'react';
import { connect } from 'react-redux';
import Navigator from '../Navigator/Navigator';
import Profile from '../Profile/Profile';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './Header.scss';

const Header: FC<HeaderProps> = ({ user }) => {
    return (
        <div className="header">
            {
                user ? 
                <Profile /> :
                <span></span>
            }
            <Navigator />
            <ThemeSwitch />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Header);
