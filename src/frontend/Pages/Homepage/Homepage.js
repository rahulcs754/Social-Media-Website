import { Nav, PostInput, Post, Follow, SidebarMenu } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getUserPost } from "../../../store/postSlice";
import { useEffect } from "react";

export const Homepage = () => {
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
          <PostInput />
          <div className="flex flex-column width-80 margin-auto ">
            {isLoading ? <div className="loader"></div> : null}

            {allposts.map((item) => {
              return <Post {...item} key={item._id} />;
            })}
          </div>
        </div>

        <Follow />
      </div>
    </>
  );
};
