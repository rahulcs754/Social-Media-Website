import styles from "./PostInput.module.css";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../../store/postSlice";
import { toast } from "react-toastify";
export const PostInput = () => {
  const dispatch = useDispatch();
  const textInput = useRef();

  const {
    data: { user, userToken },
  } = useSelector((state) => state.auth);

  const addHandler = () => {
    if (textInput.current.value.length > 0) {
      const postData = {
        _id: uuid(),
        content: textInput.current.value,
        username: user.username,
        comments: [],
        pic: "",
      };

      dispatch(addPost({ postData, authorization: userToken }));
      textInput.current.value = "";
    } else {
      toast.warning("Please Any Message");
    }
  };

  return (
    <>
      <div className={` ${styles.note_input_box} width-80`}>
        <form>
          <div className={`${styles.input_header}`}>Create Post</div>
          <div className={styles.input_body}>
            <textarea
              placeholder="Write something here"
              className={styles.textarea_part}
              ref={textInput}
            />
          </div>
          <div
            className={` ${styles.input_footer} flex flex-row space_between pointer`}
            onClick={addHandler}
          >
            <div className={`flex flex-row pointer ${styles.right_footer}`}>
              Post
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
