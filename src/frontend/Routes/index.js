import {
  Login,
  NoPageFound,
  SignupForm,
  Homepage,
  Profile,
  Explore,
} from "../Pages";
import MockAPI from "../mock-api";
import { PrivateRoute } from "../Components";
import { Routes, Route } from "react-router-dom";

const Routespaths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignupForm />}></Route>
      <Route
        path="/homepage"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/explore"
        element={
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<NoPageFound />}></Route>
      <Route path="/mock-api" element={<MockAPI />}></Route>
    </Routes>
  );
};

export default Routespaths;
