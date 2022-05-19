import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { data } = useSelector((state) => state.auth);

  return data.userToken.length > 0 ? (
    children
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace={true} />
  );
};
