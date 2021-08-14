import { setToLocal } from "../../Assets/data";
import { INITIAL__THEME_STATE, SET_THEME } from "./ThemeConstants";

export const themeReducer = (state = INITIAL__THEME_STATE, action: { type: typeof SET_THEME; payload: Theme; }) => {
    switch (action.type) {
        case SET_THEME: {
            try {
                setToLocal('theme', action.payload);
            } catch (error) {}

            return {
                ...state, theme: action.payload
            }
        }

        default: return  state;
    }
}