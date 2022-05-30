import styles from "./EditProfileModal.module.css";
import { useSelector } from "react-redux";
import { useRef } from "react";
export const EditProfileModal = () => {
  const {} = useRef();
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  return (
    <div className="modal">
      <div className="modal-content modal-m">
        <div className="modal-header text-center">
          <h3 className="modal-header-title">Profile</h3>
          <span className="modal-close">×</span>
        </div>
        <div className="modal-body">
          <form>
            <div className={styles.input_body}>
              <input
                type="text"
                className={styles.input_fields}
                value={`${user.firstName} ${user.lastName}`}
              />
              <textarea
                placeholder="Write something here"
                className={styles.textarea_part}
              >
                {user.bio}
              </textarea>
              <input
                type="url"
                className={`mb-s ${styles.input_fields}`}
                value={user.link}
              />
            </div>

            <div
              className={` ${styles.input_footer} flex flex-row space_between pointer`}
            >
              <div className={`flex flex-row pointer ${styles.right_footer}`}>
                Update
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
