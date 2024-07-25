import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./store/reducer.ts";
import { Provider } from "react-redux";
import { createAPI } from "./services/api.ts";
import { ThunkAppDispatch } from "./types/type-action.ts";
import {
  fetchDataCommentsAction,
  fetchDataDesignersAction,
  fetchDataIssuesAction,
  fetchDataProjectAction,
} from "./store/api-action.ts";
import "./i18n.ts";

export const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
  devTools: true, // Включение DevTools
});

(store.dispatch as ThunkAppDispatch)(fetchDataCommentsAction());
(store.dispatch as ThunkAppDispatch)(fetchDataIssuesAction(``));
(store.dispatch as ThunkAppDispatch)(fetchDataDesignersAction(``));
(store.dispatch as ThunkAppDispatch)(fetchDataProjectAction());

console.log(document.querySelector(`body`));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
