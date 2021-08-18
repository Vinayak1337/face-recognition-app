import { FC, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReactComponent as SwitchIconBlack } from '../../../Assets/Icons/theme_switch_black.svg';
import { ReactComponent as SwitchIconWhite } from '../../../Assets/Icons/theme_switch_white.svg';
import { setTheme } from '../../../Redux/Theme/ThemeActions';
import './ThemeSwitch.scss';

const ThemeSwitch: FC<ThemeSwitchProps> = ({ theme, setTheme }) => {

    const setInitialTheme = useCallback(() => {
        const root = document.querySelector(':root')! as HTMLHtmlElement;

        switch (theme) {
            case 'black':
                root.style.setProperty('--white', '#000011');
                root.style.setProperty('--black', '#e8e9eb');
                break;
            
            case 'white':
                root.style.setProperty('--white', '#e8e9eb');
                root.style.setProperty('--black', '#000011');
        }
    }, [theme])

    useEffect(() => {
        setInitialTheme();
    }, [setInitialTheme])

    const changeTheme = () => {
        const root = document.querySelector(':root')! as HTMLHtmlElement;

        switch (theme) {
            case 'white':
                setTheme('black');
                root.style.setProperty('--white', '#000011');
                root.style.setProperty('--black', '#e8e9eb');
                break;
            
            case 'black':
                setTheme('white');
                root.style.setProperty('--white', '#e8e9eb');
                root.style.setProperty('--black', '#000011');
        }
    }

    return (
        <div className="theme-icon" onClick={changeTheme}>
            {
                theme === 'black' ?
                <SwitchIconWhite /> :
                <SwitchIconBlack />
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setTheme: (theme: Theme) => dispatch(setTheme(theme))
});

const mapStateToProps = (state: RootState) => ({
    theme: state.themeReducer.theme
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);