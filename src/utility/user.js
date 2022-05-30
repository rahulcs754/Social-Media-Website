import axios from "axios";

const getAllUsers = async () => await axios.get("/api/users");

const getUserById = async (userId) => await axios.get(`/api/users/${userId}`);

export { getAllUsers, getUserById };
