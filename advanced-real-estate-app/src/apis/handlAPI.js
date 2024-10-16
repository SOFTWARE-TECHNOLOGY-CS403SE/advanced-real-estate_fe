import axiosClient from "./axiosClient";

const handleAPI = async (url, data, method = "get", token) => {
    return axiosClient(url, {
        token: token,
        method: method,
        data,
    });
};

export default handleAPI;
