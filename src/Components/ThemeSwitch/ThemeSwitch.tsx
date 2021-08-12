import { SetStateAction } from 'react';
import { Dispatch, FC, useState } from 'react';
import { ReactComponent as SwitchIconBlack } from '../../Assets/Icons/theme_switch_black.svg';
import { ReactComponent as SwitchIconWhite } from '../../Assets/Icons/theme_switch_white.svg';
import './ThemeSwitch.scss';

const changeTheme = (isWhite: boolean, toogleTheme: Dispatch<SetStateAction<boolean>>) => () => {
    const root = document.querySelector(':root')! as HTMLHtmlElement;

    if (isWhite) {
        toogleTheme(!isWhite);
        root.style.setProperty('--white', '#000011');
        root.style.setProperty('--black', '#e8e9eb');
        return;
    }

    toogleTheme(!isWhite);
    root.style.setProperty('--white', '#e8e9eb');
    root.style.setProperty('--black', '#000011');
}

const ThemeSwitch: FC = () => {
    const [isWhite, toggleTheme] = useState<boolean>(true);

    return (
        <div className="theme-icon" onClick={changeTheme(isWhite, toggleTheme)}>
            {
                !isWhite ?
                <SwitchIconWhite /> :
                <SwitchIconBlack />
            }
        </div>
    )
}

export default ThemeSwitch;