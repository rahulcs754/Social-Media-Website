import styles from "./Profile.module.css";
import { Nav, Post, Follow, SidebarMenu, UserProfile } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getUserPost } from "../../../store/postSlice";
import { useEffect } from "react";

export const Profile = () => {
  const dispatch = useDispatch();
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const { allposts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  return (
    <>
      <Nav />
      <div className="grid-container ">
        <SidebarMenu />
        <div className="middle-part">
          <UserProfile />

          <div className={`${styles.profile_input_box} width-80`}>
            <div className="flex flex-row space-around pointer m-xs ">
              <span>Your Posts</span>
            </div>
          </div>

          <div className="flex flex-column width-80 margin-auto ">
            {isLoading ? (
              <div className="text-center">Loading ...</div>
            ) : (
              allposts.map((item) => {
                return <Post {...item} key={item._id} />;
              })
            )}
          </div>
        </div>

        <Follow />
      </div>
    </>
  );
};
