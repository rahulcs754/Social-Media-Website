import axios from "axios";

const getAllUsers = async () => await axios.get("/api/users");

const getUserById = async (username) =>
  await axios.get(`/api/users/${username}`);

export { getAllUsers, getUserById };
