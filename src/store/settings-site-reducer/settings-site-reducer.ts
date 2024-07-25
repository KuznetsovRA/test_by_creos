import { TypeAction, TypesActions } from "../../types/type-action.ts";
import { TypeSettingsSiteState } from "../../types/state/settings-site-state.ts";

const initialState: TypeSettingsSiteState = {
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  locale: localStorage.getItem("locale") === "ru" ? "ru" : "en",
};

const settingsSiteReducer = (
  state: TypeSettingsSiteState = initialState,
  action: TypesActions,
): TypeSettingsSiteState => {
  switch (action.type) {
    case TypeAction.ChangeTheme: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case TypeAction.ChangeLocale: {
      return {
        ...state,
        locale: action.payload,
      };
    }
    default:
      return state;
  }
};

export { settingsSiteReducer };
