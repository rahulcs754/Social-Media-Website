import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

export const Menu = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="menu">
      <h3>Welcome {data.user.firstName}</h3>
      <ul>
        <li>
          <Link to="/explore">Expore</Link>
        </li>
        <li onClick={logoutHandler}>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};
