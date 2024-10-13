import axios from "axios";
import queryString from "query-string";

const baseURL = `http://localhost:8080`;

const axiosClient = axios.create({
    baseURL: baseURL,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const accesstoken = localStorage.getItem(config.nameToken) || '';

    config.headers = {
        Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
        Accept: "application/json",
        ...config.headers,
    };

    return { ...config, data: config.data || null };
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            return Promise.reject(res.data);
        }
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject({
                message: "No response received from server",
            });
        } else {
            return Promise.reject({ message: error.message });
        }
    }
);

export default axiosClient;
