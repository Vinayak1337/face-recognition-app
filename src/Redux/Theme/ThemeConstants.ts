import { getFromLocal } from "../../Assets/data";

export const SET_THEME = 'SET_THEME';

const getTheme = () => {
    const theme = getFromLocal('theme', '"white"');
    return { theme: JSON.parse(theme) };
}

export const INITIAL__THEME_STATE: InitialThemeState = getTheme();
