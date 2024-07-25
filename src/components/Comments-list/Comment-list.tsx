import "./Comment-list.css";
import { getRelativeTime } from "../../utils/utils-date.ts";
import { TRootState } from "../../store/reducer.ts";
import { connect, ConnectedProps } from "react-redux";
import { useTranslation } from "react-i18next";

const mapStateToProps = ({ dataReducer, settingsSiteReducer }: TRootState) => {
  const { comments } = dataReducer;
  const { locale } = settingsSiteReducer;
  return {
    comments,
    locale,
  };
};

const connector = connect(mapStateToProps /*, mapDispatchToProps*/);
type PropsFromRedux = ConnectedProps<typeof connector>;

function CommentList({ comments, locale }: PropsFromRedux) {
  const lastTenComments = comments.slice(0, 10);
  const { t } = useTranslation();
  return (
    <div className="comment-list">
      {lastTenComments.map((comment) => {
        return (
          <div className="comment" key={comment.id}>
            <img
              src={comment.designer.avatar}
              alt="Avatar"
              className="avatar"
              height="100"
            />
            <div className="comment-details">
              <div className="comment-header">
                <span className="username">{comment.designer.username}</span>
                <span className="time-ago">
                  {getRelativeTime(comment.date_created, locale)}
                </span>
              </div>
              <div className="task">
                {t(`task`)}: {comment.issue}
              </div>
              <div className="message">
                {t(`message`)}: {comment.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { CommentList };
export default connector(CommentList);
