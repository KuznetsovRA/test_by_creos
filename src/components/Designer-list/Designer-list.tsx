import "./Designer-list.css";
import { getMedianTime, sortDesigners } from "../../utils/utils-date.ts";
import { TRootState } from "../../store/reducer.ts";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";

type PropsDesignerList = {
  sortCriteria: string;
  sortOrder: string;
};
const mapStateToProps = ({ dataReducer }: TRootState) => {
  const { designers } = dataReducer;
  return {
    designers,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & PropsDesignerList;

function DesignerList({ designers, sortCriteria, sortOrder }: PropsFromRedux) {
  const topTenDesigners = designers.slice(0, 10);
  const sortDesigner = sortDesigners(topTenDesigners, sortCriteria, sortOrder);
  const { t } = useTranslation();
  return (
    <div className="designer-list">
      {sortDesigner.map((designer) => {
        return (
          <div className="designer" key={designer.email}>
            <img
              src={designer.avatar}
              alt={`Designer` + designer.username + `Avatar`}
              className="avatar"
              height="100"
            />
            <div className="designer-details">
              <span className="username">{designer.username}</span>
              <span className="median-time">
                {t(`medianTime`)}:
                {Math.round(getMedianTime(designer.issues)) + ` ` + t(`hours`)}
              </span>
              <span className="tasks-completed">
                {designer.issues.length + ` ` + t(`done`)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { DesignerList };
export default connector(DesignerList);
