import styles from "./FollowCard.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "store/userSlice";
import { updateUser } from "store/authSlice";
export const FollowCard = ({ user }) => {
  const dispatch = useDispatch();
  const {
    data: { user: live, userToken },
    token,
  } = useSelector((store) => store.auth);

  const followerHandler = (user, userToken) => {
    dispatch(
      followUser({
        followUserId: user._id,
        authorization: userToken,
        dispatch,
        updateUser,
      })
    );
    toast.success(`You followed ${user.firstName} `);
  };

  const unfollowerHandler = (user, userToken) => {
    dispatch(
      unFollowUser({
        followUserId: user._id,
        authorization: userToken,
        dispatch,
        updateUser,
      })
    );
    toast.success(`You unfollowed ${user.firstName} `);
  };

  const checkFollowerUser = (live) => {
    return live?.following?.find((item) => item.username === user.username);
  };

  return (
    <div className={`flex flex-row ${styles.follow_header}`}>
      <img
        className="badge-img profile_icon_size"
        src="https://picsum.photos/200"
        alt="badge-1"
      />
      <div className={`flex flex-column ${styles.follow_data_info} `}>
        <span>
          {user.firstName} {user.lastName}
        </span>

        {checkFollowerUser(live) ? (
          <span
            className="flex btn btn-primary justify-content-center pointer"
            onClick={() => unfollowerHandler(user, userToken)}
          >
            unfollow
          </span>
        ) : (
          <span
            className="flex btn btn-primary justify-content-center pointer"
            onClick={() => followerHandler(user, userToken)}
          >
            follow
          </span>
        )}
      </div>
    </div>
  );
};
