import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.eagleart.in",
    withCredentials: true,
});

export default instance;

