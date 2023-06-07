import axios from "axios";

// const instance = axios.create({ baseURL: "http://localhost:8000/" });
const instance = axios.create({
  baseURL: "https://funny-todos-server.onrender.com/",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
