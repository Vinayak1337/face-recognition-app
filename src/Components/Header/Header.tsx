import { FC } from 'react';
import Navigator from '../Navigator/Navigator';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './Header.scss';

const Header: FC = () => {
    return (
        <div className="header">
            <span></span>
            <Navigator />
            <ThemeSwitch />
        </div>
    )
}

export default Header;
