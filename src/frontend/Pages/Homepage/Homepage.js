import styles from "./Homepage.module.css";
import { Nav, PostInput, Post, Follow, SidebarMenu } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../../store/postSlice";
import { useEffect, useState } from "react";

export const Homepage = () => {
  const dispatch = useDispatch();
  const [postOrder, setPostOrder] = useState(false);
  const [trend, setTrend] = useState(false);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const { allposts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  const allFilterPosts = trend
    ? [...allposts].sort((a, b) => b?.likes?.likeCount - a?.likes?.likeCount)
    : allposts;

  return (
    <>
      <Nav />
      <div className="grid-container ">
        <SidebarMenu />
        <div className="middle-part">
          <PostInput />
          <div className={`${styles.note_input_box}  width-80`}>
            <div className="flex flex-row space-around pointer m-xs">
              <span onClick={() => setTrend((prev) => !prev)}>Trending</span>
              <span onClick={() => setPostOrder((prev) => !prev)}>Latest</span>
            </div>
          </div>
          <div
            className={`flex ${
              postOrder ? "flex-column-reverse" : "flex-column"
            }  width-80 margin-auto`}
          >
            {isLoading ? <div className="loader"></div> : null}

            {allFilterPosts.length > 0 &&
              allFilterPosts.map((item) => {
                return <Post {...item} key={item._id} />;
              })}
          </div>
        </div>

        <Follow />
      </div>
    </>
  );
};
