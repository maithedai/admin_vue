import axios from 'axios';
import authHelper from "@/helpers/authorize.js";

const baseAxios = function(baseUrl) {
    const defaultOptions = {
        baseURL: baseUrl,
    }

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(function (config) {
        const token = authHelper.getToken();
        config.headers.common['Authorization'] = token;
        return config;
    });

    return instance;
}

export default {
    create: baseAxios
}