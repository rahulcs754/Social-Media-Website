import { Login, NoPageFound } from "../Pages";
import MockAPI from "../mock-api";

import { Routes, Route } from "react-router-dom";

const Routespaths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route path="/mock-api" element={<MockAPI />}></Route>
      <Route path="*" element={<NoPageFound />}></Route>
    </Routes>
  );
};

export default Routespaths;
