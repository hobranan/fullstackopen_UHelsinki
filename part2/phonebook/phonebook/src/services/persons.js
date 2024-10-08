import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
// const baseUrl = "https://hobranan-fullstackopen-uhelsinki-part3.onrender.com/api/persons";
const baseUrl = "/api/persons"; // proxy in vite.config.js; used for when frontend ('dist') and backend are in the same server


const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteEntry };
