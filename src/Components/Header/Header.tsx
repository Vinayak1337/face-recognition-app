import { FC } from 'react';
import { connect } from 'react-redux';
import { Avatar, Navigator, ThemeSwitch } from '.';
import './Header.scss';

const Header: FC<HeaderProps> = ({ user }) => {
    return (
        <header className="main-header">
            {
                user ? 
                <Avatar /> :
                <span></span>
            }
            <Navigator />
            <ThemeSwitch />
        </header>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Header);
