import { Nav, Post, Follow, SidebarMenu } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../../store/postSlice";
import { useEffect } from "react";

export const Explore = () => {
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
          <div className="flex flex-column width-80 margin-auto ">
            {isLoading ? <div className="loader"></div> : null}

            {allposts.map((item) => (
              <Post {...item} key={item._id} />
            ))}
          </div>
        </div>

        <Follow />
      </div>
    </>
  );
};
