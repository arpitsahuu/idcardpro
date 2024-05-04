import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.eagleart.in",
    // baseURL: "http://localhost:4000",
    withCredentials: true,
});

export default instance;

