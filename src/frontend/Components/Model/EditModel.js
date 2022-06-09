import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPost } from "store/postSlice";
import styles from "./EditModal.module.css";
export const EditModel = ({ post, setEdit }) => {
  const dispatch = useDispatch();
  const updateInput = useRef();

  const {
    data: { userToken },
  } = useSelector((state) => state.auth);

  const updateHandler = (post) => {
    const updatePost = { ...post, content: updateInput.current.value };
    dispatch(editPost({ postData: updatePost, authorization: userToken }));
    setEdit((prev) => !prev);
  };

  return (
    <div className="modal">
      <div className="modal-content modal-m">
        <div className="modal-header text-center">
          <h3 className="modal-header-title">Update Post</h3>
          <span
            className="modal-close"
            onClick={() => setEdit((prev) => !prev)}
          >
            ×
          </span>
        </div>
        <div className="modal-body">
          <form>
            <div className={styles.input_body}>
              <textarea
                placeholder="Write something here"
                className={styles.textarea_part}
                ref={updateInput}
              >
                {post.content}
              </textarea>
            </div>
            <div
              className={` ${styles.input_footer} flex flex-row space_between pointer`}
              onClick={() => updateHandler(post)}
            >
              <div className={`flex flex-row pointer ${styles.right_footer}`}>
                Post
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
