import "./Sort-menu.css";
import { TypeSortMenu } from "../../types/type-settings-sort.ts";
import { TRootState } from "../../store/reducer.ts";
import { connect, ConnectedProps } from "react-redux";

type PropsSortMenu = {
  sortSettings: TypeSortMenu[];
};

const mapStateToProps = ({ settingsSiteReducer }: TRootState) => {
  const { locale } = settingsSiteReducer;
  return {
    locale,
  };
};
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & PropsSortMenu;

function SortMenu({ sortSettings, locale }: PropsFromRedux) {
  return (
    <div className="sort-menu">
      {sortSettings.map((item) => {
        return (
          <div className="sortType-wrapper" key={item.head}>
            <label htmlFor={item.headEng}>
              {locale === `ru` ? item.head : item.headEng}
            </label>
            <select
              id={item.headEng}
              onChange={(evt) => {
                const selectedValue = evt.target.value;
                item.handle(selectedValue);
              }}
              defaultValue={item.currentValue}
            >
              {(locale === `ru` ? item.typeSort : item.typeSortEng).map(
                (type, i) => {
                  return (
                    <option key={i} value={item.typeSortEng[i]}>
                      {type}
                    </option>
                  );
                },
              )}
            </select>
          </div>
        );
      })}
    </div>
  );
}

export { SortMenu };
export default connector(SortMenu);
