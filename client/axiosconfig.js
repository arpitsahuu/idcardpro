import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.eagleart.in",
    withCredentials: true,
});

export default instance;

