import styles from "./EditProfileModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editProfileInfo } from "store/authSlice";
export const EditProfileModal = ({ setModal }) => {
  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const [userinfo, setUserInfo] = useState({
    username: user.username,
    bio: user.bio,
    link: user.link,
  });
  const updateHandler = () => {
    dispatch(
      editProfileInfo({
        username: userinfo.username,
        bio: userinfo.bio,
        link: userinfo.link,
      })
    );
    setModal((prev) => !prev);
  };
  const { username, bio, link } = userinfo;
  return (
    <div className="modal">
      <div className="modal-content modal-m">
        <div className="modal-header text-center">
          <h3 className="modal-header-title">Profile</h3>
          <span
            className="modal-close"
            onClick={() => setModal((prev) => !prev)}
          >
            ×
          </span>
        </div>
        <div className="modal-body">
          <form>
            <div className={styles.input_body}>
              <input
                type="text"
                className={styles.input_fields}
                value={`${username}`}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, username: e.target.value }))
                }
              />
              <textarea
                placeholder="Write something here"
                className={styles.textarea_part}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, bio: e.target.value }))
                }
              >
                {bio}
              </textarea>
              <input
                type="url"
                className={`mb-s ${styles.input_fields}`}
                value={link}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, link: e.target.value }))
                }
              />
            </div>

            <div
              className={` ${styles.input_footer} flex flex-row space_between pointer`}
            >
              <div
                className={`flex flex-row pointer ${styles.right_footer}`}
                onClick={updateHandler}
              >
                Update
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
