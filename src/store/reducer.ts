import { settingsSiteReducer } from "./settings-site-reducer/settings-site-reducer.ts";
import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./data-reducer/data-reducer.ts";

const rootReducer = combineReducers({
  settingsSiteReducer: settingsSiteReducer,
  dataReducer: dataReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
