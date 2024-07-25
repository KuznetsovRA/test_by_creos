import "./Header.css";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "../../store/reducer.ts";
import { changeLocale, changeTheme } from "../../store/action.ts";
import { TypesActions } from "../../types/type-action.ts";
import { TypesLocale, TypesTheme } from "../../types/types-settings-site.ts";
import { Dispatch, MouseEvent } from "react";
import { getWeekNumber } from "../../utils/utils-date.ts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const mapStateToProps = ({ settingsSiteReducer }: TRootState) => {
  const { theme, locale } = settingsSiteReducer;
  return {
    theme,
    locale,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<TypesActions>) => ({
  handleSwitchTheme(evt: MouseEvent<HTMLDivElement>, currentTheme: TypesTheme) {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    if (currentTheme === newTheme) {
      return;
    } else {
      localStorage.setItem("theme", newTheme);
      dispatch(changeTheme(newTheme));
    }
    const switcher = evt.currentTarget;
    switcher.classList.toggle(`day-mode`);
    const moon = switcher.children[0];
    moon.classList.toggle(`sun`);
    document.querySelector(`body`)?.classList.toggle(`dark-mode`);
  },

  handleSwitchLocale(
    event: React.ChangeEvent<HTMLInputElement>,
    currentLocale: TypesLocale,
  ): void {
    const newLocale = event.currentTarget.value.toLowerCase() as TypesLocale;
    if (currentLocale === newLocale) {
      return;
    } else {
      localStorage.setItem("locale", newLocale);
      console.log(`changeLAng`);

      dispatch(changeLocale(newLocale));
    }
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Header(props: PropsFromRedux) {
  const { handleSwitchTheme, handleSwitchLocale, theme, locale } = props;
  const { t, i18n } = useTranslation();
  return (
    <header>
      <div className="locale-switcher-wrapper">
        <label className="locale-switcher locale-switcher-ru">
          <input
            type="radio"
            name="locale"
            id="locale-ru"
            value="RU"
            checked={locale === `ru`}
            onChange={(evt) => {
              const newLocale =
                evt.currentTarget.value.toLowerCase() as TypesLocale;
              handleSwitchLocale(evt, locale);
              i18n.changeLanguage(newLocale);
            }}
          />
          <span>RU</span>
        </label>
        <label className="locale-switcher locale-switcher-en">
          <input
            type="radio"
            name="locale"
            id="locale-en"
            value="EN"
            checked={locale === `en`}
            onChange={(evt) => {
              const newLocale =
                evt.currentTarget.value.toLowerCase() as TypesLocale;
              handleSwitchLocale(evt, locale);
              i18n.changeLanguage(newLocale);
            }}
          />
          <span>EN</span>
        </label>
      </div>

      <div className="week-number ">
        {t(`week`)}:
        <span id="week-number">{getWeekNumber(new Date()) - 1}</span>
      </div>

      <div className="navigation-bar ">
        <nav className="nav-bar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={``} className={"nav-link"}>
                {t("main")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/tasks`} className={"nav-link"}>
                {t("tasks")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/designer`} className={"nav-link"}>
                {t("designers")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="theme-switcher"
        onClick={(evt) => {
          handleSwitchTheme(evt, theme);
        }}
      >
        <div className="moon" />
      </div>
    </header>
  );
}

export { Header };
export default connector(Header);
