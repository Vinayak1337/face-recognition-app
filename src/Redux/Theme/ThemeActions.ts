import { SET_THEME } from "./ThemeConstants";

export const setTheme = (theme: Theme) => ({
    type: SET_THEME,
    payload: theme,
})