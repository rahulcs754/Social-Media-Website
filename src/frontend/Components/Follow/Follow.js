import { useEffect } from "react";
import styles from "./Follow.module.css";
import { FollowCard } from "../FollowCard/FollowCard";

import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "store/userSlice";

export const Follow = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.users);

  const {
    data: {
      user: { _id: liveId },
    },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      dispatch(getAllusers());
    })();
  }, []);

  return (
    <div className="right-part m-s">
      <div className={`flex flex-column ${styles.follow_list}`}>
        <div className={`space-between p-xs ${styles.follow_title}`}>
          <div>Who to Follow?</div>
          <div className={styles.show_more_button}>Show More</div>
        </div>

        <div className={`flex flex-column mt-xs ${styles.follow_user_list} `}>
          {loading ? (
            <>Loading ...</>
          ) : (
            users
              .filter((item) => item._id !== liveId)
              .map((details) => {
                return <FollowCard user={details} key={details._id} />;
              })
          )}
        </div>
      </div>
    </div>
  );
};
