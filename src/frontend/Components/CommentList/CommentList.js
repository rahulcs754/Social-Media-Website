import styles from "./CommentList.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";
import {
  MdBookmarkAdd,
  MdDeleteOutline,
  MdEdit,
  MdBookmarkRemove,
} from "react-icons/md";
export const CommentList = () => {
  const [postMenu, setPostMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { comments, loading } = useSelector((state) => state.comments);

  return (
    <div className="flex flex-column width-100 margin-auto ">
      {comments.map((comment) => {
        return (
          <div className={`flex flex-column p-s ${styles.post}`}>
            <div className={`flex flex-row ${styles.post_header}`}>
              <div className={`flex flex-column ${styles.data_info}`}>
                <span>@{comment.username}</span>
                <span className={` ${styles.post_time}`}>{comment.text}</span>
              </div>
              <div className={` ${styles.note_options} pointer`}>
                <IoIosMore
                  size={28}
                  onClick={() => setPostMenu((prev) => !prev)}
                />
                {postMenu ? (
                  <div className={`flex flex-column ${styles.menu}`}>
                    <div>
                      <MdDeleteOutline
                        size={25}
                        className={styles.menu_option}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
